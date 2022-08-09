import { configureStore } from '@reduxjs/toolkit';
import versionReducer from '../state/version/versionSlice';
import classesReducer from '../state/classes/classesSlice';
import subjectReducer from '../state/subjects/subjectSlice';
import questionReducer from '../state/question/questionSlice';

export default configureStore({
  reducer: {
    version: versionReducer,
    classes: classesReducer,
    subject: subjectReducer,
    question: questionReducer,
  },
});