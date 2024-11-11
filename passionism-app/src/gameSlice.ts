import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  current_time: number;
  current_day: number;
  basic_uni: number;
  luxury_uni: number;
  mood: number;
  focus: number;
  creativity: number;
  memory_level: number;
  sleep_duration: number;
  sleep_deprivation_days: number;
}

const initialState: GameState = {
  current_time: 8,
  current_day: 1,
  basic_uni: 100,
  luxury_uni: 50,
  mood: 50,
  focus: 50,
  creativity: 50,
  memory_level: 0,
  sleep_duration: 0,
  sleep_deprivation_days: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<number>) => {
      state.current_time = action.payload;
    },
    updateDay: (state, action: PayloadAction<number>) => {
      state.current_day = action.payload;
    },
    incrementDay: (state) => {
      state.current_day += 1;
    },
    updateBasicUni: (state, action: PayloadAction<number>) => {
      state.basic_uni = action.payload;
    },
    updateLuxuryUni: (state, action: PayloadAction<number>) => {
      state.luxury_uni = action.payload;
    },
    updateMood: (state, action: PayloadAction<number>) => {
      state.mood = action.payload;
    },
    updateFocus: (state, action: PayloadAction<number>) => {
      state.focus = action.payload;
    },
    updateCreativity: (state, action: PayloadAction<number>) => {
      state.creativity = action.payload;
    },
    updateMemoryLevel: (state, action: PayloadAction<number>) => {
      state.memory_level = action.payload;
    },
    updateSleepDuration: (state, action: PayloadAction<number>) => {
      state.sleep_duraction = action.payload;
    },
    updateSleepDeprivationDays: (state, action: PayloadAction<number>) => {
      state.sleep_deprivation_days = action.payload;
    },
    // ... other reducers for skills, inventory, etc.
  },
});

export const { 
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
} = gameSlice.actions;

export default gameSlice.reducer;