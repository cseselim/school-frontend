import { createSlice } from '@reduxjs/toolkit';

export const versionSlice = createSlice({
  name: 'version',
  initialState: {
    value: 0,
    abc:{
        a:'15',
        b:'16',
        c:'17',
        d:'18',
        e:'19',
    }
  },
  reducers: {
    increment: (state) => {
        state.value = 50;
      },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = versionSlice.actions;

export default versionSlice.reducer;