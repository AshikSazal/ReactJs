import { createSlice, configureStore } from "@reduxjs/toolkit";

const initailState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter", // can be any name
  initialState: initailState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});


const store = configureStore({
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;
