import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* setRubricProgress(action) {
  const payload = action.payload || {};
  const { url, params, executeOnSuccess } = payload;

  try {
    const data = yield call(Requester.post, url, params);

    if (data.success) {
      yield put(
        nodeActions.snackbar(true, t1('set_rubric_progress_successful')),
      );

      if (executeOnSuccess && typeof executeOnSuccess === 'function') {
        executeOnSuccess();
      }
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, t1('set_rubric_progress_failed')));
  }
}

export default function* setRubricProgressSaga() {
  yield takeEvery('SET_RUBRIC_PROGRESS', setRubricProgress);
}
