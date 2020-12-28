import {
  call,
  put,
  race,
  select,
  take,
  takeEvery,
  throttle,
} from 'redux-saga/effects';
import {
  calculateExerciseResultSelector,
  convertQuestionTakeBetweenClientAndServerVersion,
  getAllQuestionUniqueIdsInExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  getSaveExerciseProgressParamsSelector,
  getSaveTakeParamsSelector,
  modes,
  statuses,
  steps,
} from 'common/learn/exercise';
import { saveTakeRequest } from 'actions/learn/saga-creators';
import { getLearnItemInfoSelector } from 'common/learn';
import { getUserAnswersSelector } from 'common/learn/Question';
import { isQuestionDone } from 'common/question';
import {
  INIT_EXERCISE,
  REDO_EXERCISE,
  RESUME_EXERCISE,
  REVIEW_EXERCISE,
  START_EXERCISE,
} from 'actions/learn/exercise/normal/saga-creators';
import {
  displayQuestionsCheckedResult,
  SAVE_ANSWER,
  saveAnswer,
  saveItemInfo,
} from 'actions/learn';
import sagaActions from 'actions/saga-creators';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { mapObject } from 'common/utils/object';
import { userInfoSelector } from 'common/selectors';
import setCurrentQuestionAndWaitTillFinished from './common/setCurrentQuestionAndWaitTillFinish';
import coreFlow from './coreFlow';
import lodashGet from 'lodash.get';

const shouldSaveProgressModes = [modes.NORMAL];
const shouldFetchProgressModes = [modes.NORMAL, modes.REVIEW];

/**
 * If we redo an exercise, we wanna set the progress in the nav to zeros
 * But by default, since the tracker.php doesn't return the object for itemIid
 * if item's progress is null, we have to hack by adding "returnZerosForExercisesWithProgressEqualNull"
 * param so server can return this extra keys
 *
 * @param itemIid exercise Iid
 * @param returnZerosForExercisesWithProgressEqualNull
 * @returns {IterableIterator<*|PutEffect<Action>|PutEffect<any>>}
 */
function* fetchProgress(itemIid, returnZerosForExercisesWithProgressEqualNull) {
  const data = {
    tcos: itemIid,
    children: 1,
    depth: 1,
  };

  if (returnZerosForExercisesWithProgressEqualNull)
    data.returnZerosForExercisesWithProgressEqualNull = 1;

  yield put(sagaActions.trackerProgressGet(data));
}

function* saveProgressAndTake(
  itemIid,
  updateToStoreAfterSuccess,
  displayMessageAfterSave,
  questionUniqueIdsToSave = [],
) {
  const getSaveExerciseProgressParams = yield select(
    getSaveExerciseProgressParamsSelector,
  );
  const saveProgressParams = yield call(getSaveExerciseProgressParams, itemIid);
  yield put(
    sagaActions.trackerProgressSave(
      saveProgressParams,
      updateToStoreAfterSuccess,
    ),
  );
  yield put(saveItemInfo(itemIid, { lastLearnTime: Date.now() }));
  const getSaveTakeParams = yield select(getSaveTakeParamsSelector);
  const saveTakeParams = yield call(
    getSaveTakeParams,
    itemIid,
    undefined,
    undefined,
    questionUniqueIdsToSave,
  );
  yield put(saveTakeRequest(itemIid, saveTakeParams, displayMessageAfterSave));
}

function* saveFinalProgress(itemIid, result) {
  const courseIid = yield call(getCourseIid, itemIid);
  yield put(
    sagaActions.trackerProgressSave(
      {
        progress: [
          {
            tco_iid: itemIid,
            p: result,
            cp: 100,
          },
        ],
        ciid: courseIid,
      },
      true,
    ),
  );
}

function* waitForStartAction(itemIid) {
  yield take(
    (action) =>
      action.type === START_EXERCISE &&
      action.itemIid &&
      String(action.itemIid) === String(itemIid),
  );
}

function* waitForResumeAction(itemIid) {
  yield take(
    (action) =>
      action.type === RESUME_EXERCISE &&
      action.itemIid &&
      String(action.itemIid) === String(itemIid),
  );
}

function* waitForRedoAction(itemIid) {
  return yield take(
    (action) =>
      action.type === REDO_EXERCISE &&
      action.itemIid &&
      String(action.itemIid) === String(itemIid),
  );
}

function* waitForReviewAction(itemIid) {
  yield take(
    (action) =>
      action.type === REVIEW_EXERCISE &&
      action.itemIid &&
      String(action.itemIid) === String(itemIid),
  );
}

function* cleanUp(itemIid) {
  yield put(saveItemInfo(itemIid, { questions: null }));
}

function* showResult(itemIid, result, shouldShowResultDetail = true) {
  if (typeof result !== 'undefined') {
    yield put(saveItemInfo(itemIid, { result }));
  }
  yield put(
    saveItemInfo(itemIid, { step: steps.RESULT, shouldShowResultDetail }),
  );
}

function* getCourseIid(itemIid) {
  return yield select((state) => state.learn.courseIid);
}

function* clearProgress(itemIid) {
  const courseIid = yield call(getCourseIid, itemIid);
  const userInfo = yield select(userInfoSelector);
  const userIid = userInfo && userInfo.iid;
  if (userIid && courseIid) {
    const resetProgressId = `${userIid}-${courseIid}-${itemIid}`;
    yield put(
      sagaActions.resetProgressRequest(
        {
          node: { ntype: 'course', iid: courseIid },
          item: { ntype: 'exercise', iid: itemIid },
          target: { iid: userIid, type: 'user' },
        },
        resetProgressId,
      ),
    );
    yield take(
      (action) =>
        action.type === 'RESET_PROGRESS_FINISHED' &&
        action.id === resetProgressId,
    );

    yield call(fetchProgress, itemIid, true);
  }
}

function* redo(itemIid, redoAction, shouldReloadPage) {
  const selectInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(selectInfo, itemIid);

  if (redoAction && redoAction.wrongQuestionOnly) {
    const getUserAnswers = yield select(getUserAnswersSelector);
    const userAnswers = yield call(getUserAnswers, itemIid);
    const questionUniqueIdsThatCorrect =
      userAnswers &&
      Object.keys(userAnswers).filter((key) => {
        const answer = userAnswers[key];
        return answer && answer.isCorrect;
      });
    yield put(
      displayQuestionsCheckedResult(itemIid, questionUniqueIdsThatCorrect),
    );
  } else {
    yield call(cleanUp, itemIid);
    if (shouldSaveProgressModes.includes(info.mode)) {
      yield call(clearProgress, itemIid);
    }
  }

  if (shouldReloadPage) {
    // this is a hack, so that we can force reload the exercise (10 / 30 for taphuan)
    window.location.reload();
  }

  let questionUniqueId = null;
  if (redoAction) {
    ({ questionUniqueId } = redoAction);
  }
  yield call(
    setCurrentQuestionAndWaitTillFinished,
    itemIid,
    questionUniqueId,
    true,
  );
  yield put(saveItemInfo(itemIid, { step: steps.MAIN }));
  yield call(exerciseFlow, itemIid, true);
}

/**
 *
 * @param itemIid
 * @param shouldReloadWebPage: If we should reload the whole page. This is a hack when we do a 10/30 exercise
 * @returns {IterableIterator<CallEffect | *>}
 */
function* waitForAndExecuteRedo(itemIid, shouldReloadWebPage) {
  const redoAction = yield call(waitForRedoAction, itemIid);
  yield call(redo, itemIid, redoAction, shouldReloadWebPage);
}

function* waitForAndExecuteResume(itemIid) {
  yield call(waitForResumeAction, itemIid);
  yield call(exerciseFlow, itemIid, false, true);
}

function* review(itemIid) {
  yield call(setCurrentQuestionAndWaitTillFinished, itemIid, null, true);
  const getQuestionUniqueIds = yield select(
    getAllQuestionUniqueIdsInExerciseSelector,
  );
  const questionUniqueIds = yield call(getQuestionUniqueIds, itemIid);
  yield put(displayQuestionsCheckedResult(itemIid, questionUniqueIds));
  yield put(saveItemInfo(itemIid, { step: steps.REVIEW }));
}

function* saveProgressAndTakeWhenAnswersChange(itemIid) {
  yield throttle(
    1000,
    (action) =>
      action.type === SAVE_ANSWER && String(action.itemIid) === String(itemIid),
    function*(action) {
      const { questionIndex } = action;
      yield call(
        saveProgressAndTake,
        itemIid,
        false,
        lodashGet(action, 'answer.type') == questionTypes.TYPE_OPEN_ENDED,
        [questionIndex],
      );
    },
  );
}

function* getPreviousTakes(itemIid) {
  const courseIid = yield call(getCourseIid, itemIid);
  try {
    const res = yield call(Requester.get, apiUrls.getTakeDetail, {
      course: courseIid,
      item_iid: itemIid,
      item_ntype: 'exercise',
    });
    const takes = res.success && res.result && res.result.answers;
    if (!takes) {
      return takes;
    }

    return mapObject(takes, (exerciseTake) =>
      convertQuestionTakeBetweenClientAndServerVersion(exerciseTake, true),
    );
  } catch (ex) {
    console.log(ex);
  }
  return null;
}

function* checkCanResume(itemIid, previousTakes) {
  const selectInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(selectInfo, itemIid);
  const options = lodashGet(info, 'options');

  if (lodashGet(options, 'can_resume')) {
    return true;
  }

  // check if has api question
  // this is pixelz logic
  const getQuestionUniqueIds = yield select(
    getAllQuestionUniqueIdsInExerciseSelector,
  );
  const questionUniqueIds = yield call(getQuestionUniqueIds, itemIid);
  const getQuestionsWithFullInfoFromUniqueIdsInExercises = yield select(
    getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  );
  const questionsWithFullInfoFromUniqueIdsInExercises = yield call(
    getQuestionsWithFullInfoFromUniqueIdsInExercises,
    itemIid,
    questionUniqueIds,
  );
  if (
    !Array.isArray(questionsWithFullInfoFromUniqueIdsInExercises) ||
    questionsWithFullInfoFromUniqueIdsInExercises.length === 0
  ) {
    return false;
  }
  try {
    return questionsWithFullInfoFromUniqueIdsInExercises.some((question) => {
      if (question.type === questionTypes.TYPE_API) {
        const exerciseTake = previousTakes && previousTakes[question.iid];
        const answer = exerciseTake && exerciseTake.answer;
        return !isQuestionDone(question.type, answer);
      }
      return false;
    });
  } catch (ex) {
    console.log(ex);
  }
  return false;
}

function* savePreviousTakeAnswersToStore(itemIid, previousTakes) {
  if (!previousTakes) {
    return;
  }
  yield Object.keys(previousTakes).map((questionIid) =>
    put(saveAnswer(itemIid, questionIid, previousTakes[questionIid])),
  );
}

function* getResult(itemIid) {
  const calculateExerciseResult = yield select(calculateExerciseResultSelector);
  return calculateExerciseResult(itemIid);
}

function* exerciseFlow(itemIid, isRedo = false, isResume = false) {
  yield put(saveItemInfo(itemIid, { status: statuses.STARTED }));
  const selectInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(selectInfo, itemIid);

  if (info.mode === modes.REVIEW) {
    const previousTakes = yield call(getPreviousTakes, itemIid);
    yield call(savePreviousTakeAnswersToStore, itemIid, previousTakes);
    yield call(review, itemIid);
    return;
  }

  if (shouldFetchProgressModes.includes(info.mode)) {
    yield call(fetchProgress, itemIid);
  }

  const previousTakes = yield call(getPreviousTakes, itemIid);
  const canResume = yield call(checkCanResume, itemIid, previousTakes);

  if (!isRedo && !isResume) {
    yield call(savePreviousTakeAnswersToStore, itemIid, previousTakes);
    if (previousTakes) {
      if (canResume) {
        // yield put(saveItemInfo(itemIid, { step: steps.NOT_CONTINUED }));
        // yield race({
        //   waitForAndExecuteResume: call(waitForAndExecuteResume, itemIid),
        //   waitForAndExecuteRedo: call(waitForAndExecuteRedo, itemIid),
        // });
        yield call(exerciseFlow, itemIid, false, true);

        return;
      } else {
        yield call(showResult, itemIid, undefined, true);
        yield call(waitForAndExecuteRedo, itemIid);

        return;
      }
    } else {
      yield put(saveItemInfo(itemIid, { step: steps.NOT_STARTED }));
      yield call(waitForStartAction, itemIid);
    }
  }

  yield put(saveItemInfo(itemIid, { step: steps.MAIN }));

  if (shouldSaveProgressModes.includes(info.mode)) {
    yield race({
      saveProgressAndTakeWhenAnswersChange: call(
        saveProgressAndTakeWhenAnswersChange,
        itemIid,
      ),
      coreFlow: call(coreFlow, itemIid),
    });
    yield call(saveProgressAndTake, itemIid);
  } else {
    yield call(coreFlow, itemIid);
  }

  yield put(saveItemInfo(itemIid, { done: true }));
  const result = yield call(getResult, itemIid);
  yield call(saveFinalProgress, itemIid, result);
  yield call(showResult, itemIid, result);

  // TODO: for now we cannot handle the saga properly if we redo a 10/30 exercise
  // so we simply reload the website
  const shouldReloadWebPage = info.max_number_of_questions_per_try;

  let raceFlow = {
    waitForAndExecuteRedo: call(
      waitForAndExecuteRedo,
      itemIid,
      shouldReloadWebPage,
    ),
    waitForAndExecuteReview: call(function*() {
      yield call(waitForReviewAction, itemIid);
      yield call(review, itemIid);
      yield call(waitForAndExecuteRedo, itemIid);
    }),
  };

  if (canResume) {
    raceFlow = {
      ...raceFlow,
      waitForAndExecuteResume: call(waitForAndExecuteResume, itemIid),
    };
  }

  yield race(raceFlow);
}

export default function* exerciseFlowSaga() {
  yield takeEvery(INIT_EXERCISE, function*(action) {
    const { itemIid, info } = action;
    yield put(saveItemInfo(itemIid, info));
    yield call(exerciseFlow, itemIid);
  });
}
