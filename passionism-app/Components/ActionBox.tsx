import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sleep } from '../src/gameSlice';
import SleepScreen from '../components/SleepScreen';

function ActionBox() {
  const dispatch = useDispatch();
  const isSleeping = useSelector((state: RootState) => state.game.isSleeping);
  const [showSleepConfirmation, setShowSleepConfirmation] = useState(false);
  const [showSleepScreen, setShowSleepScreen] = useState(false); // State to control SleepScreen visibility

const handleClick = (action: string) => {
  if (action === 'Work') {
    console.log('Work action clicked');
  } else if (action === 'Leisure') {
    console.log('Leisure action clicked');
  } else if (action === 'Skill Development') {
    console.log('Skill Development action clicked');
  } else if (action === 'Social Interaction') {
    console.log('Social Interaction action clicked');
  } else if (action === 'Bed') {
    setShowSleepConfirmation(true); // Show Sleep Confirmation prompt
  }
};

const handleSleepConfirm = () => {
  dispatch(sleep()); // Dispatch sleep action
  setShowSleepConfirmation(false); // Hide Sleep Confirmation prompt
  setShowSleepScreen(true); // Show SleepScreen component
};

const handleSleepCancel = () => {
  setShowSleepConfirmation(false); // Hide Sleep Confirmation prompt
};

const handleWakeUp = () => {
  dispatch(sleep()); // Dispatch sleep action to toggle isSleeping
  setShowSleepScreen(false); // Hide SleepScreen component
};

  return (
    <div className="action-box">
      <h2>Action Box</h2>
      <button onClick={() => handleClick('Work')}>Work</button>
      <button onClick={() => handleClick('Leisure')}>Leisure</button>
      <button onClick={() => handleClick('Skill Development')}>Skill Development</button>
      <button onClick={() => handleClick('Social Interaction')}>Social Interaction</button>
      <button onClick={() => handleClick('Bed')}>Bed</button>

      {/* Sleep Confirmation prompt */}
      {showSleepConfirmation && (
        <div className="sleep-confirmation">
          <p>Are you sure you want to go to bed?</p>
          <button onClick={handleSleepConfirm}>Yes</button>
          <button onClick={handleSleepCancel}>No</button>
        </div>
      )}

      {/* SleepScreen component */}
      {showSleepScreen && <SleepScreen handleWakeUp={handleWakeUp} />} {/* Render SleepScreen when showSleepScreen is true */}
    </div>
  );
}

export default ActionBox;