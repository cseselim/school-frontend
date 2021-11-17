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

export const deleteVersion = createAsyncThunk(
   "version/delete",
    async (id) => {
      await TutorialDataService.deleteVersion(id);
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
    [deleteVersion.fulfilled]: (state, action) => {
      let index = state.value.findIndex(({ id }) => id === action.payload.id);
      state.value.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
//export const { retrieveTutorials } = versionSlice.actions;

export default versionSlice.reducer;