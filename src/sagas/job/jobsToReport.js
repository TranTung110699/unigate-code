import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* jobsToReport(action) {
  const { url, params, name } = action;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success) {
      yield put(
        nodeActions.snackbar(
          true,
          t1('cronjob_%s_has_been_appended_to_queue_successfully', [name]),
        ),
      );
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, t1('cron_jobs_failed')));
  }
}

export default function* jobsToReportSaga() {
  yield takeEvery('CRON_JOBS_TO_REPORT', jobsToReport);
}
