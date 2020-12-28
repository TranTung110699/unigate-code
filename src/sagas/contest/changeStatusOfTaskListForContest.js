import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* changeStatusOfTaskListForContest(action) {
  const { url, params, onRequestSuccessful } = action;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success) {
      if (onRequestSuccessful) {
        onRequestSuccessful();
      }
      // yield put(
      //   nodeActions.snackbar(true, t1('change_status_of_task_list_successful')),
      // );
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(
      nodeActions.snackbar(true, t1('change_status_of_task_list_failed')),
    );
  }
}

export default function* changeStatusOfTaskListForContestSaga() {
  yield takeEvery(
    'CHANGE_STATUS_OF_TASK_LIST_FOR_CONTEST',
    changeStatusOfTaskListForContest,
  );
}
