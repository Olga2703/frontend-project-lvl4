import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
  composeWithDevTools,
});

export default store;
