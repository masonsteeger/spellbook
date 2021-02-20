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
    const [classAnchor, setClassAnchor] = useState(null)
    const [levelAnchor, setLevelAnchor] = useState(null)
    const [schoolAnchor, setSchoolAnchor] = useState(null)
    const [classFilter, setClassFilter] = useState('Filter By Class')
    const [levelFilter, setLevelFilter] = useState('Filter By Level')
    const [schoolFilter, setSchoolFilter] = useState('Filter By School')


    const menuToggle = () => {
        toggle === classes.toggleHide ? setToggle(classes.toggleShow) : setToggle(classes.toggleHide)
    }

    const handleOpenFilter = (event, type) => {
        switch (true){
            case type === 'class':
                setClassAnchor(event.currentTarget)
                break;
            case type === 'level':
                setLevelAnchor(event.currentTarget)
                break;
            case type === 'school':
                setSchoolAnchor(event.currentTarget)
            default:
                return;
        }
    }
    
    const handleCloseFilter = (type) => {
        switch (true){
            case type === 'class':
                setClassAnchor(null)
                break;
            case type === 'level':
                setLevelAnchor(null)
                break;
            default:
                return;
        }
    }

     const handleClassFilter = (event) => {
        props.setApiCall(`https://www.dnd5eapi.co/api/classes/${event.target.id}/spells`)
        setClassFilter(event.target.id)
        setLevelFilter('Filter By Level')
        setClassAnchor(null)
     }

     const handleLevelFilter = (event) => {
        props.setApiCall(`https://www.dnd5eapi.co/api/spells?level=${event.target.id}`)
        setLevelFilter(event.target.id)
        setClassFilter('Filter By Class')
        setLevelAnchor(null)
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
            <Button aria-controls="class-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'class')}>{classFilter}</Button>
            <Menu
                id="class-menu"
                anchorEl={classAnchor}
                open={Boolean(classAnchor)}
                onClose={() => handleCloseFilter('class')}
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
            <Button aria-controls="level-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'level')}>{levelFilter === 'Filter By Level' ? levelFilter : levelFilter > 0 ? `Level ${levelFilter}` : 'Cantrips'}</Button>
            <Menu
                id="level-menu"
                anchorEl={levelAnchor}
                open={Boolean(levelAnchor)}
                onClose={() => handleCloseFilter('level')}
            >
                <MenuItem id='0' onClick={handleLevelFilter}>Cantrips</MenuItem>
                <MenuItem id='1' onClick={handleLevelFilter}>Level 1</MenuItem>
                <MenuItem id='2' onClick={handleLevelFilter}>Level 2</MenuItem>
                <MenuItem id='3' onClick={handleLevelFilter}>Level 3</MenuItem>
                <MenuItem id='4' onClick={handleLevelFilter}>Level 4</MenuItem>
                <MenuItem id='5' onClick={handleLevelFilter}>Level 5</MenuItem>
                <MenuItem id='6' onClick={handleLevelFilter}>Level 6</MenuItem>
                <MenuItem id='7' onClick={handleLevelFilter}>Level 7</MenuItem>
                <MenuItem id='8' onClick={handleLevelFilter}>Level 8</MenuItem>
                <MenuItem id='9' onClick={handleLevelFilter}>Level 9</MenuItem>
            </Menu>
            <Button aria-controls="school-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'school')}>{schoolFilter}</Button>
            <Menu
                id="school-menu"
                anchorEl={schoolAnchor}
                open={Boolean(schoolAnchor)}
                onClose={() => handleCloseFilter('level')}
            >
                <MenuItem id='Abjuration' onClick={handleLevelFilter}>Abjuration</MenuItem>
                <MenuItem id='Conjuration' onClick={handleLevelFilter}>Conjuration</MenuItem>
                <MenuItem id='Divination' onClick={handleLevelFilter}>Divination</MenuItem>
                <MenuItem id='Enchantment' onClick={handleLevelFilter}>Enchantment</MenuItem>
                <MenuItem id='Evocation' onClick={handleLevelFilter}>Evocation</MenuItem>
                <MenuItem id='Illusion' onClick={handleLevelFilter}>Illusion</MenuItem>
                <MenuItem id='Necromany' onClick={handleLevelFilter}>Necromany</MenuItem>
                <MenuItem id='Transmutation' onClick={handleLevelFilter}>Transmutation</MenuItem>
            </Menu>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Navigation