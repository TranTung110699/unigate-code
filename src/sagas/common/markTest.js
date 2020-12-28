import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import contestApiUrls from 'components/admin/contest/endpoints';

import { t1 } from 'translate';

function* markTest(action) {
  const { params } = action;
  if (!params) return;

  try {
    const data = yield call(Requester.post, contestApiUrls.mark_test, params);

    if (data.success) {
      yield put(nodeActions.snackbar(true, `${t1('mark_test_successful')}!`));
    } else {
      yield put(nodeActions.snackbar(true, `${t1('mark_test_failed')}!`));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, `${t1('mark_test_failed')}!`));
  }
}

export default function* markTestSaga() {
  yield takeEvery('MARK_TEST', markTest);
}
