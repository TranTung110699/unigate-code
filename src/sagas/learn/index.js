import { fork } from 'redux-saga/effects';

import getTcosPrice from './getTcosPrice';
import payForLearningPaths from './payForLearningPath';
import getPhoneticDiff from './getPhoneticDiff';
import saveTake from './saveTake';
import saveSurveyTake from './saveSurveyTake';
import handleInviteCourse from './handleInviteCourse';
import saveViolation from './contest/saveViolation';

const learnSagas = [
  fork(getTcosPrice),
  fork(payForLearningPaths),
  fork(getPhoneticDiff),
  fork(saveTake),
  fork(saveSurveyTake),
  fork(handleInviteCourse),
  fork(saveViolation),
];

export default learnSagas;
