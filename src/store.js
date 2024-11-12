// store.js

import { configureStore } from '@reduxjs/toolkit';
import simulatorReducer from './redux/simulatorSlice';

const store = configureStore({
  reducer: {
    simulator: simulatorReducer,  // Add the simulator reducer here
  },
});

export default store;
