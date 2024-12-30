import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
currentTime: number;
timeSpentSleeping: number;
sleepStartTime?: number;
isSleeping: boolean;
health: number;
mana: number;
focus: number;
}

const initialState: GameState = {
currentTime: new Date().getTime(),
timeSpentSleeping: 0,
sleepStartTime: undefined,
isSleeping: false,
health: 100,
mana: 50,
focus: 80,
};

const applyStatBenefits = (state: GameState) => {
  // Apply stat benefits from sleeping
  state.health += 5;
  state.mana += 10;
  state.focus += 15;
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
        state.sleepStartTime = new Date().getTime(); // Store as timestamp
      } else {
        // If waking up, calculate time spent sleeping and update state
        const wakeUpTime = new Date();
      
        // Ensure state.sleepStartTime is a number before using it
        const sleepStartTimeMs =
          typeof state.sleepStartTime === "number"
            ? state.sleepStartTime
            : 0; // Or handle the invalid type appropriately
      
        const sleepDurationMs =
          wakeUpTime.getTime() - sleepStartTimeMs; // Difference in milliseconds
      
        // Convert sleep duration to seconds and add to total
        state.timeSpentSleeping += Math.floor(sleepDurationMs / 1000);
        state.currentTime = wakeUpTime.getTime(); // Store as timestamp
        state.sleepStartTime = undefined; // Reset sleepStartTime
      
        applyStatBenefits(state); // Apply stat benefits from sleeping
      }
      
      // Toggle the isSleeping state AFTER handling sleep/wake-up logic
      state.isSleeping = !state.isSleeping; // Toggle sleep state
    },
  },
});
    
export const { updateTime, sleep } = gameSlice.actions;

export default gameSlice.reducer;