import { fork } from 'redux-saga/effects';

import synchronizeDataToRedis from './synchronizeDataFromDatabaseToRedis';

const redisSagas = [fork(synchronizeDataToRedis)];

export default redisSagas;
