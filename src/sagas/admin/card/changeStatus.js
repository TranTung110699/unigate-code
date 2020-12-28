import { call, put, takeEvery } from 'redux-saga/effects';
import { submit } from 'redux-form';
import Requester from 'common/network/http/Request';

function* changeStatus(action) {
  const { url, params, handleSuccess } = action;

  const data = yield call(Requester.post, url, params);
  if (data.success) {
    if (handleSuccess) handleSuccess();
    yield put(submit(params.formid));
  } else {
    console.log('Change status failed');
  }
}

export default function* changeStatusSaga() {
  yield takeEvery('CHANGE_CARD_STATUS_REQUEST', changeStatus);
}
