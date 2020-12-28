import { fork } from 'redux-saga/effects';

import forgotPassword from './forgotPassword';

const forgotPasswordSagas = [fork(forgotPassword)];

export default forgotPasswordSagas;
