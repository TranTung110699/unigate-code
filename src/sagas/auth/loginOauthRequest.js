import { call, put, takeEvery } from 'redux-saga/effects';
import apiUrls from 'api-endpoints';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { LOGIN_OAUTH_SUCCESS_REQUEST } from 'actions/auth/saga-creators';
import { loginSuccess } from 'actions/auth';
import { closeLoginDialog } from 'actions/auth/auth-dialog';
import { dashboardUrl } from 'routes/root-url';
import { t1 } from 'translate';
import { getDashboardUrl } from 'routes/links/common';

function* loginOAuth(action) {
  const { loginType, token, params, history, actionType, nextUrl } = action;

  const data = yield call(
    Requester.post,
    apiUrls.login_oauth_success,
    Object.assign({}, params, {
      login: loginType,
      oauth_token: token,
    }),
  );

  if (data.success) {
    yield put(loginSuccess(data.result));
    if (actionType === 'register') {
      yield put(nodeActions.snackbar(true, t1('register_successfully')));
    }
    if (window.isGoJapan) {
      history.push(nextUrl ? nextUrl : getDashboardUrl('courses'));
    } else {
      history.push(dashboardUrl);
    }
    yield put(closeLoginDialog());
  } else {
    yield put(nodeActions.snackbar(false, data.message));
  }
}

export default function* loginOAuthSaga() {
  yield takeEvery(LOGIN_OAUTH_SUCCESS_REQUEST, loginOAuth);
}
