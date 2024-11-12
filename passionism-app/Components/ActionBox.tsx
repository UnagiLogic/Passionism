// This is the Action Box

//placeholder code for ActionBox
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTime,
  updateDay,
  incrementDay,
  updateBasicUni,
  updateLuxuryUni,
  updateMood,
  updateFocus,
  updateCreativity,
  updateMemoryLevel,
  updateSleepDeprivationDays,
} from '../src/gameSlice';
import { RootState } from '../store';


function ActionBox() {
  const dispatch = useDispatch();
  const current_time = useSelector((state: RootState) => state.game.current_time);
  const current_day = useSelector((state: RootState) => state.game.current_day);
  const basic_uni = useSelector((state: RootState) => state.game.basic_uni);
  const luxury_uni = useSelector((state: RootState) => state.game.luxury_uni);
  const mood = useSelector((state: RootState) => state.game.mood);
  const focus = useSelector((state: RootState) => state.game.focus);
  const creativity = useSelector((state: RootState) => state.game.creativity);
  const memory_level = useSelector((state: RootState) => state.game.memory_level);
  const sleep_duration = useSelector((state: RootState) => state.game.sleep_duration);
  const sleep_deprivation_days = useSelector((state: RootState) => state.game.sleep_deprivation_days);

const handleClick = (action: string) => {
  if (action === 'Work') {
    dispatch(updateBasicUni(basic_uni + 50));
    dispatch(updateTime(current_time + 8));
  
  } else if (action === 'Leisure') {
    dispatch(updateTime(current_time + 4));
  
  } else if (action === 'Skill Development') {
    dispatch(updateTime(current_time + 4));
  
  } else if (action === 'Social Interaction') {
    dispatch(updateTime(current_time + 4));
  
    // Sleep action checks if player has used sleep today
    // it checks how much time is left in the day and a pop up message will appear if the player still has enough time to do an action.
    // The player can choose not to sleep, but it will increase sleep deprivation days by 1 and memory level will decrease by .01.
    // If the player chooses to sleep, the time will be increased by 8 hours (480 minutes) and the day will be incremented if the new time is past midnight.
    // Sleep deprivation days will be reduced by 1 and memory level will be increased by .01 (if not already at max).
    // If the player has 0 sleep deprivation days, the sleep action will instead give a buff during sleep.
    // The buff will increase the player's mood by 1, focus by 1, and creativity by 1 and memory but .01.
  } else if (action === 'Sleep') {
    let newDay = current_day;
    if (current_time + 8 >= 24) {
      newDay++;
    }

    const newTime = ((current_time) + 8) % 24; // 1440 minutes in a day
    dispatch(updateTime(newTime));

    // Increment the day if the new time is past midnight (0)
    if (newDay > current_day) {
      console.log('Incrementing day');
      dispatch(incrementDay());
    }

    if (current_time === 0) { // Start of a new day
      if (sleep_duration < 8) {
        // Apply sleep deprivation debuffs
      } else {
        // Apply sleep benefits
    }
    dispatch(updateSleepDuration(0)); // Reset sleep duration
  }

    // reduce sleep deprivation days by 1 (if not already at 0)
    if (sleep_deprivation_days > 0) {
      dispatch(updateSleepDeprivationDays(Math.max(0, sleep_deprivation_days - 1)));
    }
  
    
    // Increase memory level (if not already at max)
    if (memory_level < 3) {
      dispatch(updateMemoryLevel(memory_level + 1));
    }
  }
};

  return (
    <div className="action-box">
      <h2>Action Box</h2>
      <button onClick={() => handleClick('Work')}>Work</button>
      <button onClick={() => handleClick('Leisure')}>Leisure</button>
      <button onClick={() => handleClick('Skill Development')}>Skill Development</button>
      <button onClick={() => handleClick('Social Interaction')}>Social Interaction</button>
      <button onClick={() => handleClick('Sleep')}>Sleep</button>
    </div>
  );
}

export default ActionBox;