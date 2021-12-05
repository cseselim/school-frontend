import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import classesDataService from "../../services/classes/classService";

export const createClasses = createAsyncThunk(
  "classes/create",
  async (value) => {
    const res = await classesDataService.create(value);
    return res.data;
  }
);

export const getAllClasses = createAsyncThunk(
  "classes/get",
  async () => {
    const res = await classesDataService.getAll();
    return res.data;
  }
);

export const classesEditState = createAsyncThunk(
  "classes/edit",
  async (id) => {
    const res = await classesDataService.get(id);
    return res.data;
  }
);

export const updateClasses = createAsyncThunk(
  "classes/update",
  async (values) => {
    let id = values.id;
    let editData = values;
    editData["_method"] = "put";
    delete values.id;
    let datas  = JSON.stringify(editData);
    const res = await classesDataService.update(id, datas);
    return res.data;
  }
);

export const editStateEmpty = createAsyncThunk(
  "classes/empty",
  async (values) => {
    return values;
  }
)

export const deleteVersion = createAsyncThunk(
   "classes/delete",
    async (id) => {
      await classesDataService.deleteVersion(id);
      return { id };
    }
 );


export const classesSlice = createSlice({
  name: 'classes',
  initialState: { value: [],editVersion:[]},
  reducers:{},
  extraReducers: {
    
    [createClasses.fulfilled]: (state, action) => {
      state.value[0].push(action.payload.id);
    },
    
    [getAllClasses.fulfilled]: (state, action) => {
      state.value.push(action.payload.data);
    },

    [classesEditState.fulfilled]: (state, action) => {
      state.editVersion = action.payload.data;
    },

    [updateClasses.fulfilled]: (state, action) => {
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

export default classesSlice.reducer;