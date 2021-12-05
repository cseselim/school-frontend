import { configureStore } from '@reduxjs/toolkit';
import versionReducer from '../state/version/versionSlice';
import classesReducer from '../state/classes/classesSlice';

export default configureStore({
  reducer: {
    version: versionReducer,
    classes: classesReducer,
  },
});