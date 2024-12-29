// This is the main component for the app.
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import ActionBox from '../components/ActionBox'
import AttributeHUD from '../components/AttributeHUD'
import MainScreen from '../components/MainScreen'
import TimeHUD from '../components/TimeHUD'
import UniHUD from '../components/UniHUD'
import './App.css'
import SleepDisplay from '../components/SleepDisplay'

function PassionismApp() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0)
  const currentTime = useSelector((state: RootState) => state.game.currentTime);



  return (
    <>
      <h1>Passionism</h1>
      <div className="huds"> {/* Container for HUDs */}
            <TimeHUD />
            <AttributeHUD />
      </div>
      <div className="passionism-app">
        <ActionBox />
        <MainScreen />
        <SleepDisplay />
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
