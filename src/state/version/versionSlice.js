import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import versionDataService from "../../services/version/versionService";

export const createVersion = createAsyncThunk(
  "version/create",
  async (value) => {
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
  initialState: { value: []},
  reducers:{},
  extraReducers: {
    [createVersion.fulfilled]: (state, action) => {
      state.value[0].push(action.payload.id);
    },
    [getAllVersion.fulfilled]: (state, action) => {
      state.value.push(action.payload.data);
    },
    [deleteVersion.fulfilled]: (state, action) => {
      let index = state.value[0].findIndex(({id}) => id === action.payload.id);
      state.value[0].splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
//export const { retrieveTutorials } = versionSlice.actions;

export default versionSlice.reducer;