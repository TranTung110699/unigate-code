import { fork } from 'redux-saga/effects';
import examFlow from './examFlow';
import exerciseFlow from './exerciseFlow';
import {
  previewTakeFlowSaga,
  previewPaperFlowSaga,
} from './previewTakeAndPaperFlow';
import surveyFlow from './surveyFlow';
import setCurrentQuestionInExercise from './setCurrentQuestion';

const exerciseSagas = [
  fork(examFlow),
  fork(exerciseFlow),
  fork(previewTakeFlowSaga),
  fork(previewPaperFlowSaga),
  fork(surveyFlow),
  fork(setCurrentQuestionInExercise),
];

export default exerciseSagas;
