import { call, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { SAVE_VIOLATION_REQUEST } from 'actions/learn/saga-creators';

function* saveViolation(action) {
  const { params, options } = action;
  if (!params) return;

  try {
    const data = yield call(Requester.post, apiUrls.save_violation, params);

    if (data.success && options && options.onRequestSuccessful) {
      options.onRequestSuccessful(data.result);
    }
  } catch (ex) {
    console.log('save violation request failed', ex);
  }
}

export default function* saveViolationSaga() {
  yield takeEvery(SAVE_VIOLATION_REQUEST, saveViolation);
}
