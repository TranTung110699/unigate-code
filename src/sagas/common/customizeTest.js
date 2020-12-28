import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';
import Links from 'routes/links';

function* customizeTest(action) {
  const { url, params } = action;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success && data.course && data.paper) {
      window.open(Links.startExam(data.course, data.paper.id));
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, t1('customize_test_failed')));
  }
}

export default function* customizeTestSaga() {
  yield takeEvery('CUSTOMIZE_TEST_REQUEST', customizeTest);
}
