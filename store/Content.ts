/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {v4 as uuidv4} from 'uuid';

type InitialState = {
  contents: Content[];
};

const initialState: InitialState = {
  contents: []
};

export const postContent = createAsyncThunk('content/postContent', async (content: string, thunkApi: any) => {
  const auth = thunkApi.getState().AuthSlice;

  console.log(auth, content);
  thunkApi.dispatch(
    addContent({
      content: content,
      id: auth.id,
      username: auth.username
    })
  );
});

export const ContentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addContent: (state, action) => {
      state.contents.unshift({
        id: uuidv4(),
        content: action.payload.content,
        createdAt: new Date().toISOString(),
        user: {
          id: action.payload.user.id,
          username: action.payload.user.username
        }
      });
    }
  }
});

export const {addContent} = ContentSlice.actions;
