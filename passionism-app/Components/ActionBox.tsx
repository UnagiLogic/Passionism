import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTime,
} from '../src/gameSlice';
import { RootState } from '../store';


function ActionBox() {
  const dispatch = useDispatch();
  const currentTime = useSelector((state: RootState) => state.game.currentTime);

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
    console.log('Sleep action clicked');
  }
};

  return (
    <div className="action-box">
      <h2>Action Box</h2>
      <button onClick={() => handleClick('Work')}>Work</button>
      <button onClick={() => handleClick('Leisure')}>Leisure</button>
      <button onClick={() => handleClick('Skill Development')}>Skill Development</button>
      <button onClick={() => handleClick('Social Interaction')}>Social Interaction</button>
      <button onClick={() => handleClick('Bed')}>Bed</button>
    </div>
  );
}

export default ActionBox;