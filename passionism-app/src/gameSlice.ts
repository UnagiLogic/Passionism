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
      state.isSleeping = !state.isSleeping; // Toggle sleep state
  
      if (state.isSleeping) {
        // If going to sleep, record start time
        state.sleepStartTime = new Date().getTime();
      } else {
        // If waking up, update time spent sleeping and current time
        const wakeUpTime = new Date();
        const sleepStartTimeMs =
          typeof state.sleepStartTime === "number"
            ? state.sleepStartTime
            : 0;
        const sleepDurationMs = wakeUpTime.getTime() - sleepStartTimeMs;
        state.timeSpentSleeping += Math.floor(sleepDurationMs / 1000);
        state.currentTime = wakeUpTime.getTime();
        state.sleepStartTime = undefined;

        applyStatBenefits(state); // Apply stat benefits from sleeping
      }
    },
  },
});
    
export const { updateTime, sleep } = gameSlice.actions;

export default gameSlice.reducer;