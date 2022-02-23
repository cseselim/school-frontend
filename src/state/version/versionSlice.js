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

export const versionEditState = createAsyncThunk(
  "version/edit",
  async (id) => {
    const res = await versionDataService.get(id);
    return res.data;
  }
);

export const updateVersion = createAsyncThunk(
  "version/update",
  async (values) => {
    let id = values.id;
    let editData = values;
    editData["_method"] = "put";
    delete values.id;
    let datas  = JSON.stringify(editData);
    const res = await versionDataService.update(id, datas);
    return res.data;
  }
);

export const editStateEmpty = createAsyncThunk(
  "version/empty",
  async (values) => {
    return values;
  }
)

export const deleteVersion = createAsyncThunk(
   "version/delete",
    async (id) => {
      await versionDataService.deleteVersion(id);
      return { id };
    }
 );


export const versionSlice = createSlice({
  name: 'version',
  initialState: { 
    value: [],
  editVersion:[]
},
  reducers:{},
  extraReducers: {
    
    [createVersion.fulfilled]: (state, action) => {
      state.value[0].push(action.payload.id);
    },
    
    [getAllVersion.fulfilled]: (state, action) => {
      state.value.push(action.payload.data);
    },

    [versionEditState.fulfilled]: (state, action) => {
      state.editVersion = action.payload.data;
    },

    [updateVersion.fulfilled]: (state, action) => {
      let index = state.value[0].findIndex(({id}) => id === action.payload.data.id);
      state.value[0][index] = {...state[index],...action.payload.data};
      state.editVersion = {};
    },

    [editStateEmpty.fulfilled]: (state, action) => {
      state.editVersion = {};
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