import { call, put, select, takeEvery } from 'redux-saga/effects';
import lodashGet from 'lodash.get';
import Requester from 'common/network/http/Request';
import contestApiUrls from 'components/admin/contest/endpoints';
import {
  START_PREVIEW_TAKE,
  START_PREVIEW_PAPER,
} from 'actions/learn/exercise/normal/saga-creators';
import {
  setAnswersLogAndUserAnswers,
  displayQuestionsCheckedResult,
  saveItemInfo,
  setCurrentLearningElement,
  setUserAnswers,
} from 'actions/learn';
import { getNodeSelector } from 'components/admin/node/utils';
import {
  buildExerciseStructureFromExercisesSelector,
  modes,
} from 'common/learn/exercise';

/**
 * Could be used for previewing a Take, or a Paper
 * if paperId not empty, we are previewing a paper
 * @param action
 * @returns {IterableIterator<*>}
 */
function* previewTakeAndPaperFlow(action) {
  const { takeId } = action;

  yield call(loadTakeForPreviewing, contestApiUrls.get_take_info_for_preview, {
    id: takeId,
  });
}

/**
 * Could be used for previewing a Take, or a Paper
 * if paperId not empty, we are previewing a paper
 * @param action
 * @returns {IterableIterator<*>}
 */
function* previewPaperFlow(action) {
  const { examIid, paperId } = action;

  yield call(
    loadTakeForPreviewing,
    contestApiUrls.get_fake_take_for_paper_preview,
    { paperId, examIid },
  );
}

function* loadTakeForPreviewing(url, apiParams) {
  try {
    const data = yield call(Requester.get, url, apiParams);

    if (data.success) {
      if (data.result) {
        const take = data.result;
        let examInfo = take.exam;
        const iid = examInfo.iid;

        yield put(
          setCurrentLearningElement({
            itemIid: iid,
          }),
        );

        const getNode = yield select(getNodeSelector);
        let node = yield call(getNode, iid, null, -1);
        node = node || {};
        const exercises = examInfo.exam_type === 'sco' ? node.children : [node];
        const buildExerciseStructureFromExercises = yield select(
          buildExerciseStructureFromExercisesSelector,
        );
        const getQuestionUniqueId = (question) => question && question.iid;
        const builtStructure = yield call(
          buildExerciseStructureFromExercises,
          exercises,
          getQuestionUniqueId,
          examInfo,
        );
        let structure = null;
        if (builtStructure) {
          structure = builtStructure.structure;
        }

        const questionUniqueIds =
          structure &&
          Array.isArray(structure) &&
          structure.reduce(
            (res, exercise) =>
              res.concat(
                (exercise &&
                  Array.isArray(exercise.questions) &&
                  exercise.questions.map((question) => question.uniqueId)) ||
                  [],
              ),
            [],
          );

        yield put(setUserAnswers(iid, take.answers));
        if (!take.dont_show_detailed_score) {
          yield put(displayQuestionsCheckedResult(iid, questionUniqueIds));
        }
        const answersLog = lodashGet(take, 'answers_log') || {};
        yield put(
          setAnswersLogAndUserAnswers(iid, {
            answersLog,
            markedTakeAnswers: take.answers,
          }),
        );

        examInfo = {
          ...examInfo,
          spentTime: take.spent_time,
          timeLeft: examInfo.duration || '00:00',
          mode: modes.PREVIEW_TEST,
          ...(builtStructure || {}),
          userIid: take.u.iid,
        };
        // console.log({examInfo});
        yield put(saveItemInfo(iid, examInfo));
      }
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* previewTakeFlowSaga() {
  yield takeEvery(START_PREVIEW_TAKE, previewTakeAndPaperFlow);
}

export function* previewPaperFlowSaga() {
  yield takeEvery(START_PREVIEW_PAPER, previewPaperFlow);
}
