import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';
import { submit } from 'redux-form';

function* calculateAttendantUsers(action) {
  const payload = action.payload || {};
  const { url, params, searchFormId } = payload;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success) {
      yield put(
        nodeActions.snackbar(true, t1('calculate_attendant_users_successful')),
      );

      yield put(submit(searchFormId));
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(
      nodeActions.snackbar(true, t1('calculate_attendant_users_failed')),
    );
  }
}

export default function* calculateAttendanceUsersSaga() {
  yield takeEvery('CALCULATE_ATTENDANT_USERS', calculateAttendantUsers);
}
