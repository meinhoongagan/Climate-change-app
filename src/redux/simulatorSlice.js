import { createSlice } from '@reduxjs/toolkit'

export const simulatorSlice = createSlice({
  name: 'simulator',
  initialState: {
    Ecosystem: '',
    temperature : null,
    aqi : null,
    wind_speed : null,
    uv_radiation : null,
    humidity : null,
  },
  reducers: {
    setEcosystem: (state, action) => {
      state.Ecosystem = action.payload;
    },
    setTemperature: (state, action) => {
        state.temperature = action.payload;
      },
      setAqi: (state, action) => {
        state.aqi = action.payload;
      },
      setWindSpeed: (state, action) => {
        state.wind_speed = action.payload;
      },
      setUvRadiation: (state, action) => {
        state.uv_radiation = action.payload;
      },
      setHumidity: (state, action) => {
        state.humidity = action.payload;
      },
  },
})

// Action creators are generated for each case reducer function
export const { setTemperature, setAqi, setHumidity, setWindSpeed, setUvRadiation , setEcosystem} = simulatorSlice.actions

export default simulatorSlice.reducer