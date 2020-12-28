import { put, call, select, takeEvery } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import Requester from 'common/network/http/Request';
import actions from 'actions/node/creators';

function* exportData(action) {
  let { url, params, formid, onRequestSuccessful } = action;
  if (!params && formid) {
    params = yield select(getFormValues(formid));
  }

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success && data.objects && data.objects.url) {
      if (onRequestSuccessful) {
        onRequestSuccessful(data);
      }
      window.location.assign(data.objects.url);
    } else {
      yield put(actions.snackbar('error', data.message));
      console.log('Export failed');
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* exportDataSaga() {
  yield takeEvery('EXPORT_DATA_REQUEST', exportData);
}
