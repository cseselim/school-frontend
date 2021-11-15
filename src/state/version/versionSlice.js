import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import TutorialDataService from "../../services/version/versionService";


export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }) => {
    const res = await TutorialDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    const res = await TutorialDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async ({ id, data }) => {
    const res = await TutorialDataService.update(id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/delete",
  async ({ id }) => {
    await TutorialDataService.remove(id);
    return { id };
  }
);

export const versionSlice = createSlice({
  name: 'version',
  initialState: {},
  
  reducers: {
    
  },
});

// Action creators are generated for each case reducer function
export const { increment } = versionSlice.actions;

export default versionSlice.reducer;