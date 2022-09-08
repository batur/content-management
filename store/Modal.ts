import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: false,
  title: '',
  content: '',
  type: ''
};

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
    closeModal: (state) => {
      state.open = false;
      state.title = '';
      state.content = '';
      state.type = '';
    }
  }
});

export const {openModal, closeModal} = ModalSlice.actions;
