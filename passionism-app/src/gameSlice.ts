import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
currentTime: Date;
timeSpentSleeping: number;
sleepStartTime?: Date;
health: number;
mana: number;
focus: number;
}

const initialState: GameState = {
currentTime: new Date(),
timeSpentSleeping: 0,
sleepStartTime: undefined,
health: 100,
mana: 50,
focus: 80,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
      },
      sleep: (state) => {
        if (state.sleepStartTime === undefined) {
          // If not already sleeping, record the sleep start time
          state.sleepStartTime = new Date();
        } else {
          // If waking up, calculate time spent sleeping and update state
          const wakeUpTime = new Date();
          const timeDiff = wakeUpTime.getTime() - state.sleepStartTime.getTime(); // Difference in milliseconds
          state.timeSpentSleeping += Math.floor(timeDiff / 1000); // Convert to seconds and add to total
          state.currentTime = wakeUpTime;
          state.sleepStartTime = undefined; // Reset sleepStartTime
  
          // Apply stat benefits
          state.health += 20;
          state.mana += 10;
          state.focus += 15;

          // ... other reducers for skills, inventory, etc.
        }
      },
    },
  });
    

export const { 
updateTime,
} = gameSlice.actions;

export default gameSlice.reducer;