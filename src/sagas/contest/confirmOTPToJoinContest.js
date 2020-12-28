import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* confirmOTPToJoinContest(action) {
  const { url, params, executeOnSuccess, executeOnFailure } = action;

  try {
    const data = yield call(Requester.post, url, params);

    if (data.success) {
      if (typeof executeOnSuccess === 'function') {
        executeOnSuccess(data);
      }
      yield put(nodeActions.snackbar('success', data.message));
    } else {
      yield put(nodeActions.snackbar('error', data.message));
      if (typeof executeOnFailure === 'function') {
        executeOnFailure(data);
      }
    }
  } catch (ex) {
    yield put(nodeActions.snackbar('error', t1('confirm_otp_failed')));
  }
}

export default function* confirmOTPToJoinContestSaga() {
  yield takeEvery('CONFIRM_OTP_TO_JOIN_CONTEST', confirmOTPToJoinContest);
}
