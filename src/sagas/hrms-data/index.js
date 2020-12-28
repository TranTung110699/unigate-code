import { fork } from 'redux-saga/effects';
import resyncDataFromShareDB from './resyncDataFromShareDB';

const hrmsDataSagas = [fork(resyncDataFromShareDB)];

export default hrmsDataSagas;
