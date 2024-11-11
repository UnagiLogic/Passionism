import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  current_time: number;
  current_day: number;
  basic_uni: number;
  luxury_uni: number;
  // ... other game state variables
}

const initialState: GameState = {
  current_time: 0,
  current_day: 1,
  basic_uni: 100,
  luxury_uni: 50,
  // ... other initial values
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
    // ... other reducers to update game state variables
  },
});

export const { updateTime, updateDay } = gameSlice.actions;

export default gameSlice.reducer;