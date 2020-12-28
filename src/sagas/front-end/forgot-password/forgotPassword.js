import { call, put, takeEvery } from 'redux-saga/effects';
import nodeActions from 'actions/node/creators';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
// import { FORGOT_PASSWORD_REQUEST } from 'actions/auth/saga-creators';
import { FORGOT_PASSWORD_REQUEST } from 'components/user/forgot-password/actions/saga-creators.js';

// actions/auth/saga-creators';

function* forgotPassword(action) {
  const { params } = action;
  const data = yield call(Requester.post, apiUrls.forgot_password, params);

  yield put(
    nodeActions.snackbar(data && data.success ? true : 'error', data.message),
  );
}

export default function* addMoneyByCardSaga() {
  yield takeEvery(FORGOT_PASSWORD_REQUEST, forgotPassword);
}
