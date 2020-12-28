import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

function* resetProgress(action) {
  try {
    const { params, id } = action;

    const post = yield call(Requester.post, apiUrls.reset_progress, params);

    yield put(sagaActions.resetProgressFinished(id));
    if (post.success) {
      // TODO: DO SOMETHING
    } else {
      yield put(
        actions.snackbar(true, t1('something_went_wrong_please_try_again')),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* resetProgressSaga() {
  yield takeEvery('RESET_PROGRESS_REQUEST', resetProgress);
}
