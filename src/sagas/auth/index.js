import { call, fork, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import {
  LOGIN_ACTION,
  loginSuccess,
  LOGOUT_ACTION,
  maskTeacher,
  unmaskTeacher,
  sessionExpired,
} from 'actions/auth';
import { closeLoginDialog } from 'actions/auth/auth-dialog';
import { t1 } from 'translate';
import loginOAuthRequest from './loginOauthRequest';
import getUser from 'common/auth';
import { RE_LOGIN } from 'actions/auth/saga-creators';
import { logout as logoutAction } from 'actions/auth';

const isLoggedInAs = (user, teacher) => {
  return !!(
    teacher &&
    teacher.info &&
    user &&
    user.info &&
    teacher.info.iid !== user.info.iid
  );
};

function* logout(action) {
  const { logoutUrl, params, showMessage } = action;

  // if maskedTeacher then put maskedTeacher into user
  const user = getUser();
  const teacher = getUser('maskedTeacher');

  if (isLoggedInAs(user, teacher)) {
    const text = t1('logged_in_as_%s', teacher.info && teacher.info.name);
    yield put(nodeActions.snackbar(true, text));
    yield put(unmaskTeacher(teacher)); // it could be {}
    yield put(maskTeacher({}));
    return null;
  }

  // TODO: get user info, and properly add to request param
  yield call(Requester.get, logoutUrl, params);

  if (teacher) {
    // This state shouldn't be here. But clear it anyway
    yield put(maskTeacher({})); // it could be {}
  }
  if (showMessage) {
    yield put(nodeActions.snackbar(true, t1('logout_success')));
  }
  yield put(loginSuccess({})); // it could be {}
  setTimeout(() => {
    window.location.assign('/');
  }, 300);
}

function* login(action) {
  const { loginUrl, params, history } = action;
  const response = yield call(Requester.post, loginUrl, params);

  if (response.success) {
    yield put(loginSuccess(response.result));
    yield put(closeLoginDialog());

    history.push('/dashboard');
  } else {
    yield put(nodeActions.snackbar(true, response.message));
  }
}

function* reLoginAfterSessionExpired(action) {
  yield put(logoutAction('/', false));
  yield put(sessionExpired(false));
}

export const LogoutAction = function* logoutSaga() {
  yield takeEvery(LOGOUT_ACTION, logout);
};
export const LoginAction = function* logoutSaga() {
  yield takeEvery(LOGIN_ACTION, login);
};
export const SessionExpiredAction = function* sessionExpiredSaga() {
  yield takeEvery(RE_LOGIN, reLoginAfterSessionExpired);
};

export default [
  fork(LogoutAction),
  fork(LoginAction),
  fork(loginOAuthRequest),
  fork(SessionExpiredAction),
];
