// This is the Main Screen

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function MainScreen() {
  const { current_time, current_day } = useSelector((state: RootState) => state.game);

  return (
    <div className="main-screen">
      {/* Core Game Information */}
      <div className="game-info">
        <p>Time: {current_time}</p>
        <p>Day: {current_day}</p>
        {/* ... other game info */}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button>Explore</button>
        <button>Work</button>
        <button>Leisure</button>
        <button>Skill Development</button>
        <button>Social Interaction</button>
        <button>Sleep</button>
        {/* ... other action buttons */}
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