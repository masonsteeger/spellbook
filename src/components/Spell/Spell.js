import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import SpellInfo from '../SpellInfo/SpellInfo'

import './Spell.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
    },
  }));

const Spell = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [spellInfo, setSpellInfo] = useState(null)

    useEffect(()=> {
        setIsLoading(false)
    }, [spellInfo])

    const handlePopoverOpen = (event) => {
        setIsLoading(true)
        setAnchorEl(event.currentTarget);
        axios.get(`https://www.dnd5eapi.co/api/spells/${event.target.id}/`)
        .then(response => {
            setSpellInfo(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'popover' : undefined

    return(
        <div className='spell' key={props.index} id={props.index}>
            <Typography
                id={props.index}
                aria-describedby={id}
                onClick={handlePopoverOpen}
            >{props.spellName}
            </Typography>
            <Popover
                id={id}
                classes={{
                    paper: classes.paper
                }}
                open={open}
                anchorEl={anchorEl}
                marginThreshold= {8}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 0, left: 0 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {open ? isLoading ? <Typography>Loading...</Typography> : <div onClick={handlePopoverClose}><SpellInfo data={spellInfo} /></div>: null}
            </Popover>
        </div>

    )
}

export default Spell;