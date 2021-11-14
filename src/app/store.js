import { configureStore } from '@reduxjs/toolkit';
import versionReducer from '../state/version/versionSlice';

export default configureStore({
  reducer: {
    version: versionReducer,
  },
});