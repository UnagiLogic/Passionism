import React from 'react'
import { useSelector } from 'react-redux'

function TimeHUD() {
  const currentTime = useSelector((state: RootState) => state.game.currentTime); // Access currentTime from Redux store
  const formattedTime = currentTime.toLocaleTimeString(); // Format the time
  
  return (
    <div className="time-hud">
      <h2>Time HUD</h2>
      <p>Time: {formattedTime}</p>
    </div>
  )
}

export default TimeHUD;