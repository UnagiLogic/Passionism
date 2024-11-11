// This is the main component for the app.
import React from 'react'
import { useState } from 'react'
import ActionBox from '../components/ActionBox'
import AttributeHUD from '../components/AttributeHUD'
import MainScreen from '../components/MainScreen'
import TimeHUD from '../components/TimeHUD'
import UniHUD from '../components/UniHUD'
import './App.css'

function PassionismApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Passionism</h1>
      <div className="passionism-app">
        <MainScreen />
        <div className="huds"> {/* Container for HUDs */}
            <TimeHUD />
            <AttributeHUD />
            <UniHUD />
        </div>
        <ActionBox />
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
