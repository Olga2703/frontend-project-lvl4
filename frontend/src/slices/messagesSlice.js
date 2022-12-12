import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const removeMessages = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      messageAdapter.setAll(state, removeMessages);
    });
  },
});

export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const getCurrentMessages = (state) => {
  const messages = selectors.selectAll(state);
  const getCurrentChannelId = state.channels.currentChannelId;
  return messages.filter((message) => message.channelId === getCurrentChannelId);
};
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
