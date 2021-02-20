import React, { useEffect } from 'react';
import Spell from '../../components/Spell/Spell'
import "./SpellList.css"


const SpellList = (props) => {

    useEffect(() => {

    }, [])
    let sorted = props.spellDisplay.map(spell => {
        return {index: spell.index,  spellName: spell.name}
    })

    sorted.sort((a, b) => {
        if(a.spellName > b.spellName){
            return 1
        }
        if(a.spellName < b.spellName){
            return -1
        }
        return 0
    })
    return(
        <div className="spell-list">
            {
                sorted.map(spell => {
                    return <div key={spell.index} style={{margin: '10px 0'}}><Spell index={spell.index} spellName = {spell.spellName}/></div>
            })}
        </div>
    )
}

export default SpellList