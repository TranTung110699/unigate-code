import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import { notificationActions } from 'actions/notification';

function* changeNotificationsStatus(action) {
  const { url, params, options } = action;

  const data = yield call(Requester.get, url, params);

  if (data.success) {
    yield put(notificationActions.setUnreadNotificationsNumber());
  }
}

export default function* changeNotificationsStatusSaga() {
  yield takeEvery('CHANGE_NOTIFICATIONS_STATUS', changeNotificationsStatus);
}
