import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    navbar: {
        backgroundColor: '#941B0C',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: 'ComicRunes',
        fontSize: '20px',
        color: 'white',
        textShadow: '0 0 20px white'
    },
    pageTitle: {
        fontFamily: 'ComicRunes',
        fontSize: '80px',
        color: 'white',
        textShadow: '0 0 20px white'
    },
    filter: {
        flexGrow: 1,
        color: 'white', 
        fontSize: '20px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      }
  }));

const Navigation = (props) => {
    const classes = useStyles();
    const [classAnchor, setClassAnchor] = useState(null)
    const [levelAnchor, setLevelAnchor] = useState(null)
    const [schoolAnchor, setSchoolAnchor] = useState(null)
    const [classFilter, setClassFilter] = useState('Filter By Class')
    const [levelFilter, setLevelFilter] = useState('Filter By Level')
    const [schoolFilter, setSchoolFilter] = useState('Filter By School')
    const [charClass, setCharClass] = useState('')
    const [level, setLevel] = useState('')
    const [school, setSchool] = useState('')
    const [checked, setChecked] = useState(false);
    const [searchValue, setSearchValue] = useState('')

    const handleChange = () => {
      setChecked((prev) => !prev);
    };


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
                break; 
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
            case type === 'school':
                setSchoolAnchor(null)
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        props.setApiCall(`https://api.open5e.com/spells/?dnd_class__icontains=${charClass}&level__iexact=${level}&school__iexact=${school}`)
    }, [charClass, level, school])

    const handleClassFilter = (event) => {
        setClassFilter(event.target.id)
        setCharClass(event.target.id)
        setClassAnchor(null)
    }

    const handleLevelFilter = (event) => {
        setLevelFilter(event.target.id)
        setLevel(event.target.id)
        setLevelAnchor(null)
    }

    const handleSchoolFilter = (event) => {
        setSchoolFilter(event.target.id)
        setSchool(event.target.id)
        setSchoolAnchor(null)
    }

    const resetFilters = () => {
        setCharClass('')
        setLevel('')
        setSchool('')
        setClassFilter('Filter By Class')
        setLevelFilter('Filter By Level')
        setSchoolFilter('Filter By School')
    }

    const resetFilter = (event) => {
        if(event.target.id === 'level'){
            setLevel('')
            setLevelFilter('Filter By Level')
            setLevelAnchor(null)
        }
        if(event.target.id === 'class'){
            setCharClass('')
            setClassFilter('Filter By Class')
            setClassAnchor(null)
        }
        if(event.target.id === 'school'){
            setSchool('')
            setSchoolFilter('Filter By School')
            setSchoolAnchor(null)
        }
    }

    const handleSearch = (event) => {
        resetFilters();
        props.setApiCall(`https://api.open5e.com/spells/?search=${event.target.value}`)
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13){
            event.target.blur()
            event.target.value = ''
        }
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar className={classes.navbar}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleChange}>
                <MenuIcon style={{fontSize: '40px'}}/>
            </IconButton>
            <Button className={classes.title} onClick={resetFilters}>
                DND 5E SpellBook
            </Button>
            <Button color="inherit">Login</Button>
            </Toolbar>
            <Collapse in={checked}>
                <Toolbar className={classes.navbar}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase inputProps={{ 'aria-label': 'search' }} classes={{root: classes.inputRoot,input: classes.inputInput}} onKeyDown={(event) => handleEnter(event)} onChange={handleSearch} placeholder='Search All Spells...'/>
                </div>
                <Button className={classes.filter} aria-controls="class-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'class')}>{classFilter}</Button>
                <Menu
                    id="class-menu"
                    anchorEl={classAnchor}
                    open={Boolean(classAnchor)}
                    onClose={() => handleCloseFilter('class')}
                >
                    <MenuItem id='class' onClick={resetFilter}>Reset Filter</MenuItem>
                    <MenuItem id='bard' onClick={handleClassFilter}>Bard</MenuItem>
                    <MenuItem id='cleric' onClick={handleClassFilter}>Cleric</MenuItem>
                    <MenuItem id='druid' onClick={handleClassFilter}>Druid</MenuItem>
                    <MenuItem id='paladin' onClick={handleClassFilter}>Paladin</MenuItem>
                    <MenuItem id='ranger' onClick={handleClassFilter}>Ranger</MenuItem>
                    <MenuItem id='sorcerer' onClick={handleClassFilter}>Sorcerer</MenuItem>
                    <MenuItem id='warlock' onClick={handleClassFilter}>Warlock</MenuItem>
                    <MenuItem id='wizard' onClick={handleClassFilter}>Wizard</MenuItem>
                </Menu>
                <Button className={classes.filter} aria-controls="level-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'level')}>{levelFilter}</Button>
                <Menu
                    id="level-menu"
                    anchorEl={levelAnchor}
                    open={Boolean(levelAnchor)}
                    onClose={() => handleCloseFilter('level')}
                >
                    <MenuItem id='level' onClick={resetFilter}>Reset Filter</MenuItem>
                    <MenuItem id='Cantrip' onClick={handleLevelFilter}>Cantrips</MenuItem>
                    <MenuItem id='1st-level' onClick={handleLevelFilter}>1st Level</MenuItem>
                    <MenuItem id='2nd-level' onClick={handleLevelFilter}>2nd Level</MenuItem>
                    <MenuItem id='3rd-level' onClick={handleLevelFilter}>3rd Level</MenuItem>
                    <MenuItem id='4th-level' onClick={handleLevelFilter}>4th Level</MenuItem>
                    <MenuItem id='5th-level' onClick={handleLevelFilter}>5th Level</MenuItem>
                    <MenuItem id='6th-level' onClick={handleLevelFilter}>6th Level</MenuItem>
                    <MenuItem id='7th-level' onClick={handleLevelFilter}>7th Level</MenuItem>
                    <MenuItem id='8th-level' onClick={handleLevelFilter}>8th Level</MenuItem>
                    <MenuItem id='9th-level' onClick={handleLevelFilter}>9th Level</MenuItem>
                </Menu>
                <Button className={classes.filter} aria-controls="school-menu" aria-haspopup="true" onClick={(event) => handleOpenFilter(event,'school')}>{schoolFilter}</Button>
                <Menu
                    id="school-menu"
                    anchorEl={schoolAnchor}
                    open={Boolean(schoolAnchor)}
                    onClose={() => handleCloseFilter('school')}
                >
                    <MenuItem id='school' onClick={resetFilter}>Reset Filter</MenuItem>
                    <MenuItem id='Abjuration' onClick={handleSchoolFilter}>Abjuration</MenuItem>
                    <MenuItem id='Conjuration' onClick={handleSchoolFilter}>Conjuration</MenuItem>
                    <MenuItem id='Divination' onClick={handleSchoolFilter}>Divination</MenuItem>
                    <MenuItem id='Enchantment' onClick={handleSchoolFilter}>Enchantment</MenuItem>
                    <MenuItem id='Evocation' onClick={handleSchoolFilter}>Evocation</MenuItem>
                    <MenuItem id='Illusion' onClick={handleSchoolFilter}>Illusion</MenuItem>
                    <MenuItem id='Necromancy' onClick={handleSchoolFilter}>Necromancy</MenuItem>
                    <MenuItem id='Transmutation' onClick={handleSchoolFilter}>Transmutation</MenuItem>
                </Menu>
                <Button onClick={resetFilters} className={classes.filter}>Reset All Filters</Button>
                </Toolbar>
            </Collapse>
        </AppBar>
        <br />
        <Typography variant='h1' className={classes.pageTitle}>{level === 'Cantrip' ?`${charClass} ${school} Cantrips`:`${level} ${charClass} ${school} Spells`}</Typography>
        <br />
        </div>
    );
}

export default Navigation