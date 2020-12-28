import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { submit } from 'redux-form';
import actions from 'actions/node/creators';

function* reloadDefaultConfValue(value) {
  try {
    const params = { name: value.value };

    const json = yield call(Requester.get, apiUrls.conf_reload_default, params);

    if (json.success) {
      yield put(actions.snackbar(true, json.message));
      yield put(submit('conf_search'));
    }
  } catch (e) {
    console.log('Get config failed', e);
  }
}

export default function* reloadDefaultConfValueSaga() {
  yield takeEvery('RELOAD_DEFAULT_CONF_VALUE_REQUEST', reloadDefaultConfValue);
}
