import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux';

import channelsReducer from './channelsSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
  composeWithDevTools,
});

export default store;
