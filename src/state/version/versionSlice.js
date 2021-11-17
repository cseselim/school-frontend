import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import versionDataService from "../../services/version/versionService";

const initialState={
  value: [],
};
export const createVersion = createAsyncThunk(
  "version/create",
  async (value) => {
    alert(value);
    const res = await versionDataService.create(value);
    return res.data;
  }
);

export const getAllVersion = createAsyncThunk(
  "version/get",
  async () => {
    const res = await versionDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async ({ id, data }) => {
    const res = await versionDataService.update(id, data);
    return res.data;
  }
);

export const deleteVersion = createAsyncThunk(
   "version/delete",
    async (id) => {
      await versionDataService.deleteVersion(id);
      return { id };
    }
 );


export const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers:{},
  extraReducers: {
    [createVersion.fulfilled]: (state, action) => {
      state.push(action.payload.data);
    },
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