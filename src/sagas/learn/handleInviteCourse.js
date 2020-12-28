import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';
import { HANDLE_INVITE_COURSE } from 'actions/learn/saga-creators';

function* handleInviteCourse(action) {
  const { params, message } = action;
  if (!params) return;

  try {
    const data = yield call(
      Requester.post,
      apiUrls.handle_invite_course,
      params,
    );

    if (data.success) {
      yield put(
        nodeActions.snackbar(
          true,
          (message && message.success) || t1('handle_invite_course_successful'),
        ),
      );

      if (action.handleInviteCourseSuccessful) {
        yield action.handleInviteCourseSuccessful(data.result);
      }
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(
      nodeActions.snackbar(
        true,
        (message && message.error) || t1('handle_invite_course_failed'),
      ),
    );
  }
}

export default function* handleInviteCourseSaga() {
  yield takeEvery(HANDLE_INVITE_COURSE, handleInviteCourse);
}
