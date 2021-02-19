import React from 'react';

import './SpellInfo.css'

const SpellInfo = (props) => {
    console.log(props.data)
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
                {props.data.concentration ? <div className='game-item'><h2>Concentration Required</h2></div> : null}
                {props.data.ritual ? <div className='game-item'><h2>Ritual Required</h2></div> : null}
                {props.data.damage ? <div className='game-item'><div><h2>Damage Type: {props.data.damage.damage_type.name}</h2></div> <div><h2>Damage At Slot Level:</h2>{Object.keys(props.data.damage.damage_at_slot_level).map((key, index)=> {return <p key={index}>Level {Object.keys(props.data.damage.damage_at_slot_level)[index]} :{props.data.damage.damage_at_slot_level[key]}</p>})}</div></div>: null}
                {props.data.dc ? <div className='game-item'><h2>DC Type: {props.data.dc.dc_type.name}</h2> <h4>On success: {props.data.dc.dc_success === 'none' ? '0' : 'Half'} Damage</h4></div> : null}
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
            <h3>School: {props.data.school.name}</h3>
            <h4>Description:</h4>
            {props.data.desc.map(text => {
                return <p key={text}>{text}</p>
            })}
            {props.data.higher_level ? <div><h4>Higher Level:</h4> <p>{props.data.higher_level}</p></div> : null}

        </div>
    )
}

export default SpellInfo;