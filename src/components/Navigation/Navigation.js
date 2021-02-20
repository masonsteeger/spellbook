import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toggleShow: {
        display: 'block'
    },
    toggleHide: {
        display: 'none'
    }
  }));

const Navigation = (props) => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(classes.toggleHide)
    const [classFilter, setClassFilter] = useState('Filter By Class')
    const [anchorEl, setAnchorEl] = useState(null)
    const [levelFilter, setLevelFilter] = useState('Filter By Level')


    const menuToggle = () => {
        toggle === classes.toggleHide ? setToggle(classes.toggleShow) : setToggle(classes.toggleHide)
    }

    const handleOpenFilter = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleCloseFilter = () => {
        setAnchorEl(null)
    }

     const handleClassFilter = (event) => {
        props.setApiCall(`https://www.dnd5eapi.co/api/classes/${event.target.id}/spells`)
        setClassFilter(event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1))
        setAnchorEl(null)
     }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={menuToggle}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={() => props.setApiCall('https://www.dnd5eapi.co/api/spells')+setClassFilter('Filter By Class')}>
                DND 5E SpellBook
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
            <Toolbar className={toggle}>
            <Button aria-controls="class-menu" aria-haspopup="true" onClick={handleOpenFilter}>{classFilter}</Button>
            <Menu
                id="class-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseFilter}
            >
                <MenuItem id='bard' onClick={handleClassFilter}>Bard</MenuItem>
                <MenuItem id='cleric' onClick={handleClassFilter}>Cleric</MenuItem>
                <MenuItem id='druid' onClick={handleClassFilter}>Druid</MenuItem>
                <MenuItem id='paladin' onClick={handleClassFilter}>Paladin</MenuItem>
                <MenuItem id='ranger' onClick={handleClassFilter}>Ranger</MenuItem>
                <MenuItem id='sorcerer' onClick={handleClassFilter}>Sorcerer</MenuItem>
                <MenuItem id='warlock' onClick={handleClassFilter}>Warlock</MenuItem>
                <MenuItem id='wizard' onClick={handleClassFilter}>Wizard</MenuItem>
            </Menu>
            <Button aria-controls="level-menu" aria-haspopup="true" onClick={handleOpenFilter}>{levelFilter}</Button>
            <Menu
                id="level-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseFilter}
            >
                <MenuItem id='bard' onClick={handleClassFilter}>Level 0</MenuItem>
                <MenuItem id='cleric' onClick={handleClassFilter}>Level 1</MenuItem>
                <MenuItem id='druid' onClick={handleClassFilter}>Level 2</MenuItem>
                <MenuItem id='paladin' onClick={handleClassFilter}>Level 3</MenuItem>
                <MenuItem id='ranger' onClick={handleClassFilter}>Level 4</MenuItem>
                <MenuItem id='sorcerer' onClick={handleClassFilter}>Level 5</MenuItem>
                <MenuItem id='warlock' onClick={handleClassFilter}>Level 6</MenuItem>
                <MenuItem id='wizard' onClick={handleClassFilter}>Level 7</MenuItem>
            </Menu>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Navigation