import React, { useEffect } from 'react';
import Spell from '../../components/Spell/Spell'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import "./SpellList.css"


const SpellList = (props) => {

    useEffect(() => {

    }, [])

    return(
        <div className="spell-list">
            {
                props.spellDisplay.results.map(spell => {
                    return spell.name === 'Eye bite' || spell.name === 'Ray of Sickness' ? null : <div key={spell.slug} style={{margin: '10px 0'}}><Spell index={spell.slug === 'antipathysympathy' ? 'antipathy-sympathy' : spell.slug === 'blindnessdeafness' ? 'blindness-deafness' : spell.slug === 'enlargereduce' ? 'enlarge-reduce' : spell.slug} spellName = {spell.name}/></div>
            })}
            <div className='bottom-nav'>
            {props.spellDisplay.previous ? <div><NavigateBeforeRoundedIcon onClick={() => props.setApiCall(props.spellDisplay.previous)} style={{fontSize: 100, cursor: 'pointer'}}/></div> : null}
            {props.spellDisplay.next ? <div><NavigateNextRoundedIcon onClick={() => props.setApiCall(props.spellDisplay.next)} style={{fontSize: 100, cursor: 'pointer'}}/></div> : null}
            </div>
        </div>
    )
}

export default SpellList