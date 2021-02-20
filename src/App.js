import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpellList from './containers/SpellList/SpellList'
import Navigation from './components/Navigation/Navigation'
import './App.css';

const App = () => {

  const [spellDisplay, setSpellDisplay] = useState({})
  const [apiCall, setApiCall] = useState('https://www.dnd5eapi.co/api/spells')
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    axios.get(apiCall)
    .then((response) => {
      setSpellDisplay(response.data.results)
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }, [apiCall])



  if(!loading){
    return(
      <div className="App">
        <Navigation setApiCall={setApiCall}/>
        <div className='parchment'>
          <br /><br />
          <SpellList spellDisplay={spellDisplay}/>
        </div>
      </div>
    );
  }else{
    return <div className="App"><h1>Loading...</h1></div>
  }
}

export default App;
