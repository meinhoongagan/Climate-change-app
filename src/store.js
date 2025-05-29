// store.js
import { configureStore } from '@reduxjs/toolkit';
import simulatorReducer from './redux/simulatorSlice';
import userReducer from './redux/UserSlice';   

const store = configureStore({
  reducer: {
    simulator: simulatorReducer,
    UserStates: userReducer,   
  },
});

export default store;
