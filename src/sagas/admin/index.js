import { fork } from 'redux-saga/effects';
import changeStatus from './card/changeStatus';
import loginAsSaga from 'sagas/auth/login-as';

const adminSagas = [fork(changeStatus), fork(loginAsSaga)];

export default adminSagas;
