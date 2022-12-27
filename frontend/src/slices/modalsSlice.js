/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    extraData: null,
    show: false,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, channel } = action.payload;
      state.type = type;
      state.extraData = channel;
      state.show = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.extraData = null;
      state.show = false;
    },
  },
});

export const getModalType = (state) => state.modals.type;
export const getModalShow = (state) => state.modals.show;
export const getModal = (state) => state.modals;
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
