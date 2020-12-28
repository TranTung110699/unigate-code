import { call, put, takeEvery } from 'redux-saga/effects';
import { submit } from 'redux-form';
import Requester from 'common/network/http/Request';

function* changeStatus(action) {
  const { url, params } = action;

  const data = yield call(Requester.get, url, params);

  if (data.success) {
    yield put(submit(params.formid));
  } else {
    console.log('Change status failed');
  }
}

export default function* changeStatusSaga() {
  yield takeEvery('CHANGE_STATUS_REQUEST', changeStatus);
}
