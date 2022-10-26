import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalsSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  composeWithDevTools,
});

export default store;
