/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    extraData: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, channel } = action.payload;
      state.type = type;
      state.extraData = channel;
    },
    closeModal: (state) => {
      state.type = null;
      state.extraData = null;
    },
  },
});

export const getModalType = (state) => state.modals.type;
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
