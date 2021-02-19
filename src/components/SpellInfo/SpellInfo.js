import React from 'react';

import './SpellInfo.css'

const SpellInfo = (props) => {
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
                <div className='game-item'>
                    <h2>Range: {props.data.range}</h2>
                </div>
                <div className='game-item'>
                    <h2>School: {props.data.school.name}</h2>
                </div>
                <div className='game-item'>
                    <h2>Components: {props.data.components.join(', ')}</h2>
                </div>
                {props.data.material ? <div className='game-item'><h2>Materials Needed: {props.data.material}</h2></div> : null}
                <div className='game-item'>
                    <h2>Casting Time: {props.data.casting_time}</h2>
                </div>
            </div>
            <h4>Description:</h4>
            {props.data.desc.map(text => {
                return <p key={text}>{text}</p>
            })}
            {props.data.higher_level ? <div><h4>Higher Level:</h4> <p>{props.data.higher_level}</p></div> : null}

        </div>
    )
}

export default SpellInfo;