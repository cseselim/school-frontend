import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import TutorialDataService from "../../services/version/versionService";

const initialState={
  value: [],
};
export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }) => {
    const res = await TutorialDataService.create({ title, description });
    return res.data;
  }
);

export const getAllVersion = createAsyncThunk(
  "version/get",
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
  initialState,
  reducers:{},
  extraReducers: {
    [getAllVersion.fulfilled]: (state, action) => {
      state.value.push(action.payload.data);
    },
  },
});

// Action creators are generated for each case reducer function
//export const { retrieveTutorials } = versionSlice.actions;

export default versionSlice.reducer;