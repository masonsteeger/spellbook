import React, { useEffect } from 'react';
import Spell from '../../components/Spell/Spell'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import "./SpellList.css"


const SpellList = (props) => {

    useEffect(() => {

    }, [])
    let sorted = props.spellDisplay.results.map(spell => {
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
                    return <div key={spell.slug} style={{margin: '10px 0'}}><Spell index={spell.slug} spellName = {spell.spellName}/></div>
            })}
            <div className='bottom-nav'>
            {props.spellDisplay.previous ? <div><NavigateBeforeRoundedIcon onClick={() => props.setApiCall(props.spellDisplay.previous)} style={{fontSize: 100, cursor: 'pointer'}}/></div> : null}
            {props.spellDisplay.next ? <div><NavigateNextRoundedIcon onClick={() => props.setApiCall(props.spellDisplay.next)} style={{fontSize: 100, cursor: 'pointer'}}/></div> : null}
            </div>
        </div>
    )
}

export default SpellList