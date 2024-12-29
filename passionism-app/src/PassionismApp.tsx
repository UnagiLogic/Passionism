// This is the main component for the app.
import React from 'react'
import { useState} from 'react'
import ActionBox from '../components/ActionBox'
import AttributeHUD from '../components/AttributeHUD'
import MainScreen from '../components/MainScreen'
import TimeHUD from '../components/TimeHUD'
import './App.css'

function PassionismApp() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>Passionism</header>
      <div className="huds"> {/* Container for HUDs */}
            <TimeHUD />
            <AttributeHUD />
      </div>
      <div className="passionism-app">
        <ActionBox />
        <MainScreen />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default PassionismApp
