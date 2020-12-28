import { fork } from 'redux-saga/effects';
import changeStatusOfTaskListForContest from './changeStatusOfTaskListForContest';
import confirmOTPToJoinContest from './confirmOTPToJoinContest';
import generateOTPForContestants from './generateOTPForContestants';
import acceptContestantToRetake from './acceptContestantToRetake';

const contestSagas = [
  fork(changeStatusOfTaskListForContest),
  fork(confirmOTPToJoinContest),
  fork(generateOTPForContestants),
  fork(acceptContestantToRetake),
];

export default contestSagas;
