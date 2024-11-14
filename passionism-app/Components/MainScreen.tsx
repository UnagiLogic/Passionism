// This is the Main Screen

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function MainScreen() {
  const { current_time, current_day, basic_uni, luxury_uni, mood, focus, creativity, memory_level, sleep_duration, sleep_deprivation_days, sleep_deprivation_level, sleep_buff_duration } = useSelector((state: RootState) => state.game);

  return (
    <div className="main-screen">
      {/* Core Game Information */}
      <div className="game-info">
        <p>Time: {current_time}</p>
        <p>Day: {current_day}</p>
        <p>Uni: {basic_uni}</p>
        <p>Luxury Uni: {luxury_uni}</p>
        <p>Mood: {mood}</p>
        <p>Focus: {focus}</p>
        <p>Creativity: {creativity}</p>
        <p>Memory Level: {memory_level}</p>
        <p>Sleep Duration: {sleep_duration}</p>
        <p>Sleep Deprivation Days: {sleep_deprivation_days}</p>
        <p>Sleep Deprivation Level: {sleep_deprivation_level}</p>
        <p>Sleep Buff Duration: {sleep_buff_duration}</p>

        {/* ... other game info */}
      </div>

      {/* Visual Elements */}
      <div className="background">
        {/* Background image or scene */}
      </div>
      <div className="character-portrait">
        {/* Character portrait */}
      </div>
    </div>
  );
}

export default MainScreen;