import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    channel: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, channel } = action.payload;
      state.type = type;
      state.channel = channel;
    },
    closeModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
