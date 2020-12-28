import { call, put, takeEvery } from 'redux-saga/effects';
import lodashGet from 'lodash.get';
import Requester from 'common/network/http/Request';
import contestApiUrls from 'components/admin/contest/endpoints';
import { SAVE_TAKE_REQUEST } from 'actions/learn/saga-creators';
import {
  finishExercise,
  SUBMIT_EXAM_SUCCESSFUL,
} from 'actions/learn/exercise/normal/saga-creators';
import {
  saveItemInfo,
  saveTakeRequestSuccess,
  saveTakeRequestFail,
} from 'actions/learn';
import { statuses, submitExamErrors } from 'common/learn/exercise';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

const getAffectedQuestionsWhenSaveTake = (saveTakeParams) => {
  return Object.keys(
    Object.assign(
      {},
      lodashGet(saveTakeParams, 'answers'),
      lodashGet(saveTakeParams, 'questionsInfo'),
    ),
  );
};

function* saveTakeToServer(action) {
  // itemIid: exam iid or exercise iid
  const { itemIid, params, displayMessageAfterSave } = action;
  if (!params) return;

  const affectedQuestions = getAffectedQuestionsWhenSaveTake(params);

  try {
    const data = yield call(Requester.post, contestApiUrls.save_take, params);
    if (data && data.success) {
      const result = data.result;
      let dataToSave = {};

      if (result.finished) {
        dataToSave = { ...dataToSave, status: statuses.FINISHED };
      } else if (result.is_over_time) {
        yield put(finishExercise(itemIid));
        dataToSave = {
          ...dataToSave,
          status: statuses.FINISHED,
          is_over_time: true,
        };
      } else if (result.already_submitted_exam) {
        dataToSave = {
          ...dataToSave,
          already_submitted_exam: true,
        };
      }

      yield put(saveItemInfo(itemIid, dataToSave));

      yield put(
        saveTakeRequestSuccess(itemIid, {
          nrofAnswers: Object.keys(lodashGet(action, 'params.answers')).length,
          status: dataToSave.status,
          is_over_time: dataToSave.is_over_time,
          already_submitted_exam: dataToSave.already_submitted_exam,
          affectedQuestions,
        }),
      );

      yield put({ type: SUBMIT_EXAM_SUCCESSFUL });

      if (displayMessageAfterSave) {
        // notify that the action is finished
        yield put(nodeActions.snackbar('success', t1('save_successfully')));
      }
    } else {
      // throw so all failed cases will be catchable
      throw 'save take failed';
    }
  } catch (ex) {
    if (displayMessageAfterSave) {
      // notify that the action is finished
      yield put(nodeActions.snackbar('success', t1('save_failed')));
    }

    if (params.exam_finished) {
      // show dialog for user to download answers offline
      const submitError = !navigator.onLine
        ? submitExamErrors.OFFLINE
        : submitExamErrors.FAILED;

      yield put(saveItemInfo(itemIid, { submitError }));
    }

    yield put(saveTakeRequestFail(itemIid, { affectedQuestions }));
  }
}

export default function* saveTakeSaga() {
  yield takeEvery(SAVE_TAKE_REQUEST, saveTakeToServer);
}
