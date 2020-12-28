import { fork } from 'redux-saga/effects';
import calculateAttendantUsers from './calculateAttendantUsers';
import calculateAttendanceScore from './calculateAttendanceScore';

const attendanceSagas = [
  fork(calculateAttendantUsers),
  fork(calculateAttendanceScore),
];

export default attendanceSagas;
