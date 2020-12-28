import commonSagas from 'sagas/common';
import { fork } from 'redux-saga/effects';
// import nodeSagas from 'components/admin/node/sagas';
import nodeSagas from 'sagas/node';
import userSagas from './admin/user';
import rcNodeDataSaga from './rc-node-data';
import redisSagas from './admin/redis';
import auth from './auth';
import confSagas from './admin/conf/';
import forgotPasswordSagas from './front-end/forgot-password';
import adminSagas from './admin';
import learnSagas from './learn';
import normalExerciseSagas from './learn/exercise/normal';
import paymentSagas from './learn/payment';
import timetable from './timetable';
import timetableV2 from './timetable/TimetableV2';
import suggest from './suggest';
import attendance from './attendance';
import job from './job';
import contest from './contest';
import hrmsData from './hrms-data';
import formSchemaConfigsSaga from './schema-form/configs';

export default function* root() {
  try {
    yield timetable;
    yield timetableV2;
    yield rcNodeDataSaga;
    yield commonSagas;
    yield nodeSagas;
    yield fork(formSchemaConfigsSaga);
    yield userSagas;
    yield redisSagas;
    yield auth;
    yield confSagas;
    yield learnSagas;
    yield paymentSagas;
    yield forgotPasswordSagas;
    yield normalExerciseSagas;
    yield adminSagas;
    yield suggest;
    yield attendance;
    yield job;
    yield contest;
    yield hrmsData;
  } catch (e) {
    console.log(e);
  }
}
