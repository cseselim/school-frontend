import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import subjectDataService from "../../services/subject/subjectService";

export const createSubject = createAsyncThunk(
  "subject/create",
  async (value) => {
    const res = await subjectDataService.create(value);
    return res.data;
  }
);

export const getAllSubject = createAsyncThunk(
  "subject/get",
  async () => {
    const res = await subjectDataService.getAll();
    return res.data;
  }
);

export const subjectEditState = createAsyncThunk(
  "subject/edit",
  async (id) => {
    const res = await subjectDataService.get(id);
    return res.data;
  }
);

export const updateSubject = createAsyncThunk(
  "subject/update",
  async (values) => {
    let id = values.id;
    let editData = values;
    editData["_method"] = "put";
    delete values.id;
    let datas  = JSON.stringify(editData);
    const res = await subjectDataService.update(id, datas);
    return res.data;
  }
);

export const editStateEmpty = createAsyncThunk(
  "subject/empty",
  async (values) => {
    return values;
  }
)

export const deleteSubject = createAsyncThunk(
   "subject/delete",
    async (id) => {
      await subjectDataService.deleteSubject(id);
      return { id };
    }
 );

 export const subjectFileUpload = createAsyncThunk(
  "subject/fileUpload",
   async (file) => {
    const fileUrl = await subjectDataService.fileUpdate(file);
     return fileUrl;
   }
);


export const subjectSlice = createSlice({
  name: 'subject',
  initialState: { value: [], editSubject:[], imgUrl:[]},
  reducers:{},
  extraReducers: {
    
    [createSubject.fulfilled]: (state, action) => {
      state.value[0].push(action.payload.id);
      state.imgUrl = {};
    },
    
    [getAllSubject.fulfilled]: (state, action) => {
      state.value.push(action.payload.data);
    },

    [subjectEditState.fulfilled]: (state, action) => {
      state.editSubject = action.payload.data;
    },

    [updateSubject.fulfilled]: (state, action) => {
      let index = state.value[0].findIndex(({id}) => id === action.payload.data.id);
      state.value[0][index] = {...state[index],...action.payload.data};
      state.editSubject = {};
    },

    [editStateEmpty.fulfilled]: (state, action) => {
      state.editVersion = {};
    },

    [deleteSubject.fulfilled]: (state, action) => {
      let index = state.value[0].findIndex(({id}) => id === action.payload.id);
      state.value[0].splice(index, 1);
    },

    [subjectFileUpload.fulfilled]: (state, action) => {
      state.imgUrl = action.payload.data.url;
    },
    
  },
});

// Action creators are generated for each case reducer function
//export const { retrieveTutorials } = versionSlice.actions;

export default subjectSlice.reducer;