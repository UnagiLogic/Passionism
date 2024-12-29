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
import { updateSleepDuration, updateSleepBuffDuration } from '../src/gameSlice'
import SleepDisplay from '../components/SleepDisplay'
import { decreaseSleep } from '../src/gameSlice'

function PassionismApp() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0)
  const current_time = useSelector((state: RootState) => state.game.current_time);
  const sleep_duration = useSelector((state: RootState) => state.game.sleep_duration);
  const sleep_buff_duration = useSelector((state: RootState) => state.game.sleep_buff_duration);
  const sleep_deprivation_days = useSelector((state: RootState) => state.game.sleep_deprivation_days);



  useEffect(() => {
    if (current_time === 0) { // Start of a new day
      if (sleep_duration < 480) {
        // Apply sleep deprivation debuffs
        console.log("Applying sleep deprivation debuffs...");
      } else {
        // Apply sleep benefits
        console.log("Applying sleep benefits...");
      }
      dispatch(updateSleepDuration(0)); // Reset sleep duration
    }

    // Track actions other than sleep
    const handleAction = () => {
    dispatch(updateSleepBuffDuration(Math.max(0, sleep_buff_duration - 1))); // Decrease buff duration
    };

    // Add event listeners for actions (we'll refine this further later)
    const actionButtons = document.querySelectorAll('.action-box button'); // Select all action buttons
    actionButtons.forEach(button => {
      button.addEventListener('click', handleAction); // Attach the event listener
    });

    // Clean up event listeners when the component unmounts
    return () => {
      actionButtons.forEach(button => {
        button.removeEventListener('click', handleAction);
      });
    };

  }, [current_time, sleep_duration, sleep_deprivation_days, sleep_buff_duration, dispatch]); // Dependencies

  useEffect(() => {
    // This is the new useEffect hook for decreasing sleep over time
    const sleepInterval = setInterval(() => {
      dispatch(decreaseSleep(1)); // Decrease sleep by 1 every second (adjust as needed)
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(sleepInterval); 
  }, [dispatch]); // Include dispatch as a dependency

  useEffect(() => {
    // This effect will decrement the sleep buff duration every minute
    const buffInterval = setInterval(() => {
      dispatch(updateSleepBuffDuration(Math.max(0, sleep_buff_duration - 1))); 
    }, 60000); // 60000 milliseconds = 1 minute
  
    return () => clearInterval(buffInterval);
  }, [dispatch, sleep_buff_duration]); // Include sleep_buff_duration as a dependency

  return (
    <>
      <h1>Passionism</h1>
      <div className="passionism-app">
        <ActionBox />
        <MainScreen />
        <SleepDisplay />
        <div className="huds"> {/* Container for HUDs */}
            <TimeHUD />
            <AttributeHUD />
            <UniHUD />
        </div>
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
