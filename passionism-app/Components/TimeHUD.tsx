import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function TimeHUD() {
  const currentTime = useSelector((state: RootState) => state.game.currentTime); // Access currentTime from Redux store
  const [formattedTime, setFormattedTime] = useState(new Date(currentTime).toLocaleTimeString()); // State to store formatted time
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime(new Date().toLocaleTimeString()); // Update with current time
    }, 1000); // Update every 1000ms (1 second)

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="time-hud">
      <h2>Time HUD</h2>
      <p>Time: {formattedTime}</p>
    </div>
  )
}

export default TimeHUD;