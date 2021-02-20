import React from 'react';

import './SpellInfo.css'

const SpellInfo = (props) => {

    const classes = Object.keys(props.data.classes).map((key, index) => { return props.data.classes[index].name})
    const subclasses = Object.keys(props.data.subclasses).map((key, index) => { return props.data.subclasses[index].name})
    
    return(
        <div className='spell-info'>
            <div className='name-level'>
                <div id='spell-name'>
                    <h1>{props.data.name}</h1>
                </div>
                <div id='spell-level'>
                    <h1>Level {props.data.level} Spell</h1>
                </div>
            </div>
            <div className='game-info'>
                {props.data.damage ? <div className='game-item'><h2>Damage Type: {props.data.damage.damage_type.name}</h2></div>: null}
                {props.data.dc ? <div className='game-item'><h2>DC Type: {props.data.dc.dc_type.name}</h2></div> : null}
                {props.data.dc ? <div className='game-item'><h2>DC success: {props.data.dc.dc_success === 'none' ? '0' : props.data.dc.dc_success.charAt(0).toUpperCase()+props.data.dc.dc_success.slice(1)} Damage</h2></div> : null}
                {props.data.concentration ? <div className='game-item'><h2>Concentration Required</h2></div> : null}
                {props.data.ritual ? <div className='game-item'><h2>Ritual Required</h2></div> : null}
                <div className='game-item'>
                    <h2>Range: {props.data.range}</h2>
                </div>
                {props.data.area_of_effect ? <div className='game-item'><h2>AOE: {props.data.area_of_effect.size} ft. {props.data.area_of_effect.type}</h2></div> : null}
                <div className='game-item'>
                    <h2>Casting Time: {props.data.casting_time}</h2>
                </div>
                <div className='game-item'>
                    <h2>Duration: {props.data.duration}</h2>
                </div>
                <div className='game-item'>
                    <h2>Components: {props.data.components.join(', ')}</h2>
                </div>
                {props.data.material ? <div className='game-item'><h2>Materials Needed: {props.data.material}</h2></div> : null}
            </div>
            {props.data.damage ? props.data.damage.damage_at_slot_level ? <div className='game-item'><h2>Damage At Slot Level:</h2>{Object.keys(props.data.damage.damage_at_slot_level).map((key, index)=> {return <h2 key={index}>Level {Object.keys(props.data.damage.damage_at_slot_level)[index]} :{props.data.damage.damage_at_slot_level[key]}</h2>})}</div> :null : null}
            <h3>School: {props.data.school.name}</h3>
            <h3>Classes: {classes.join(', ')}</h3>
            {subclasses > 0 ? <h3>Subclasses: {subclasses.join(', ')}</h3> : <h3>Subclasses: N/A</h3>}  
            <h4>Description:</h4>
            {props.data.desc.map(text => {
                return <p key={text}>{text}</p>
            })}
            {props.data.higher_level ? <div><h4>Higher Level:</h4> <p>{props.data.higher_level}</p></div> : null}

        </div>
    )
}

export default SpellInfo;