import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import questionService from '../../services/quesions/questionService';

export const createQuestion = createAsyncThunk(
  "question/create",
  async (value) => {
    const res = await questionService.create(value);
    return res.data;
  }
);

export const questionFileUpload = createAsyncThunk(
  "question/fileUpload",
   async (file) => {
    const fileUrl = await questionService.fileUpdate(file);
     return fileUrl;
   }
);


export const questionSlice = createSlice({
  name: 'question',
  initialState: { imgUrl:[] },
  reducers:{},
  extraReducers: {
    
    [createQuestion.fulfilled]: (state, action) => {
      state.value[0].push(action.payload.id);
    },

    [questionFileUpload.fulfilled]: (state, action) => {
      state.imgUrl = action.payload.data.url;
    },
    
  },
});

// Action creators are generated for each case reducer function
//export const { retrieveTutorials } = versionSlice.actions;

export default questionSlice.reducer;