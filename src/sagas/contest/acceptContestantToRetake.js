import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';
import { submit } from 'redux-form';

function* acceptContestantToRetake(action) {
  const { url, params, formid } = action;

  try {
    const data = yield call(Requester.post, url, params);

    if (data.success) {
      yield put(submit(formid));
      yield put(nodeActions.snackbar('success', data.message));
    } else {
      yield put(nodeActions.snackbar('error', data.message));
    }
  } catch (ex) {
    yield put(
      nodeActions.snackbar('error', t1('accept_contestant_to_retake_failed')),
    );
  }
}

export default function* acceptContestantToRetakeSaga() {
  yield takeEvery('ACCEPT_CONTESTANT_TO_RETAKE', acceptContestantToRetake);
}
