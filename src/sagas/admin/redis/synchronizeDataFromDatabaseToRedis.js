import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* synchronizeData(action) {
  const { url, params } = action;

  const data = yield call(Requester.post, url, params);

  if (data.success) {
    yield put(
      nodeActions.snackbar(
        true,
        data.message || t1('synchronize_data_successful'),
      ),
    );
  } else {
    yield put(
      nodeActions.snackbar(true, data.message || t1('synchronize_data_failed')),
    );
  }
}

export default function* synchronizeDataFromDatabaseToRedisSaga() {
  yield takeEvery('SYNCHRONIZE_DATA_FROM_DATABASE_TO_REDIS', synchronizeData);
}
