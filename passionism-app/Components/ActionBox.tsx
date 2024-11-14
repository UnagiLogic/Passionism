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
  updateSleepDuration,
  updateSleepDeprivationDays,
  updateSleepDeprivationLevel,
  updateSleepBuffDuration,
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
  const sleep_deprivation_level = useSelector((state: RootState) => state.game.sleep_deprivation_level);
  const sleep_buff_duration = useSelector((state: RootState) => state.game.sleep_buff_duration);

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
  
  } else if (action === 'Sleep') {
    // Get desired sleep duration from the player (in hours)
    const sleepHoursInput = prompt("How many hours do you want to sleep? (Enter a number)");
    const sleepHours = parseFloat(sleepHoursInput || "0"); // Parse input as a number

    if (!isNaN(sleepHours) && sleepHours > 0) { // Validate input
      const sleepMinutes = sleepHours * 60;

      // Calculate new time in minutes
      const newTimeMinutes = (current_time * 60 + sleep_duration + sleepMinutes) % 1440; // 1440 minutes in a day

      // Update time in the store (convert back to hours for display)
      dispatch(updateTime(Math.floor(newTimeMinutes / 60)));

      // Check if the day has changed BEFORE updating sleep_duration
      const newDay = current_day + (newTimeMinutes < current_time * 60 ? 1 : 0); 

      // Update sleep duration
      dispatch(updateSleepDuration(sleep_duration + sleepMinutes));

      // Calculate sleep deprivation level
      const newSleepDeprivationLevel = Math.max(0, 1 - ((sleep_duration + sleepMinutes) / 480));
      dispatch(updateSleepDeprivationLevel(newSleepDeprivationLevel));

      // Apply sleep benefits or debuffs based on sleep_duration
      // ... adjust benefits based on sleep duration or sleep quality
      if (sleep_duration + sleepMinutes >= 480) { // Check for at least 8 hours of sleep
        // Apply sleep benefits
        if (sleep_deprivation_days > 0) {
          dispatch(updateSleepDeprivationDays(Math.max(0, sleep_deprivation_days - 1)));
        }
        if (memory_level < 3) {
          dispatch(updateMemoryLevel(memory_level + .1));
        }
        // ... other benefits (mood, focus, creativity)
      } else {
        // Apply sleep deprivation debuffs
        dispatch(updateSleepDeprivationDays(sleep_deprivation_days + 1));
        // ... other debuffs

        // Reset sleep buff duration (or adjust based on nap duration)
        dispatch(updateSleepBuffDuration(1440)); 

        // Update day if necessary
        dispatch(updateDay(newDay));

        // Console log everything for debugging
        console.log("New time:", newTimeMinutes);
        console.log("What day is it?:", "Day" + " " + current_day);
      }
    } else {
      alert("Invalid sleep duration. Please enter a valid number.");
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