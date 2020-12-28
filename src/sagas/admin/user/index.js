import { fork } from 'redux-saga/effects';

import changeStatusSaga from './changeStatus';
import changeUserExamRoundSaga from './changeUsersExamRound';
import downloadImportTemplateSaga from './downloadImportTemplate';

const userSagas = [
  fork(changeStatusSaga),
  fork(changeUserExamRoundSaga),
  fork(downloadImportTemplateSaga),
];

export default userSagas;
