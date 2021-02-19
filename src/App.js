import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpellList from './containers/SpellList/SpellList'
import './App.css';

const App = () => {

  const [spellDisplay, setSpellDisplay] = useState({})

  const [loading, setLoading] = useState(true)

  useEffect( () => {
    axios.get('https://www.dnd5eapi.co/api/spells')
    .then((response) => {
      console.log('Fetching..')
      setSpellDisplay(response.data)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }, [])



  if(!loading){
    return(
      <div className="App">
        <h1>5E SpellBook</h1>
        <SpellList spellDisplay={spellDisplay}/>
      </div>
    );
  }else{
    return <div className="App"><h1>Loading...</h1></div>
  }
}

export default App;
