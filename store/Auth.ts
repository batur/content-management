/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import axios from 'axios';
import {toast} from 'react-toastify';

type InitialState = {
  token: string;
  id: string;
  username: string;
};

const initialState: InitialState = {
  token: '',
  id: '',
  username: ''
};

export const login = createAsyncThunk('user/login', async (data: {username: string; password: string}, thunkApi) => {
  try {
    const response = await axios.post('/api/login', data);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.id = '';
      state.username = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const {token, id, username} = action.payload.data;
      console.log(action.payload.data);
      state.token = token;
      state.id = id;
      state.username = username;
    });
  }
});

export const {logout} = AuthSlice.actions;
