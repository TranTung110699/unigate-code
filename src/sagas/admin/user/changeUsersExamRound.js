import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import contestApiUrls from 'components/admin/contest/endpoints';
import { submit } from 'redux-form';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* changeUserExamRound({ userIds, examRound, contestCode }) {
  const url = contestApiUrls.change_users_exam_round;
  const params = {
    user_ids: userIds,
    exam_round: examRound,
    contest_code: contestCode,
  };

  const data = yield call(Requester.get, url, params);

  if (data.success) {
    yield put(nodeActions.handleOpenDialog({ openDialog: false }));
    yield put(submit('exam_result_search'));
    yield put(
      nodeActions.snackbar(
        true,
        t1('change_exam_round_for_users_successfully'),
      ),
    );
  } else {
    if (data.message) {
      yield put(nodeActions.snackbar(true, data.message));
    } else {
      yield put(
        nodeActions.snackbar(true, t1('change_exam_round_for_users_failed')),
      );
    }
  }
}

export default function* changeUserExamRoundSaga() {
  yield takeEvery('CHANGE_USERS_EXAM_ROUND_REQUEST', changeUserExamRound);
}
