import React, { useEffect } from 'react';
import Spell from '../../components/Spell/Spell'
import "./SpellList.css"


const SpellList = (props) => {

    useEffect(() => {

    }, [])

    return(
        <div className="spell-list">
            {console.log(props.spellDisplay)}
            {props.spellDisplay.results.map(spell => {
                return (
                    <Spell key={spell.index} index={spell.index} spellName={spell.name}/>
                )})}
        </div>
    )
}

export default SpellList