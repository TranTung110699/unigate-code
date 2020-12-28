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
  getSaveTakeParamsSelector,
  modes,
  statuses,
} from 'common/learn/exercise';
import { doExamUseLimitQuestionGroupTimeFlow } from 'common/learn/exercise/exam';
import { saveTakeRequest } from 'actions/learn/saga-creators';
import {
  INIT_EXAM,
  RETRY_SUBMIT_EXAM,
  SUBMIT_EXAM_SUCCESSFUL,
} from 'actions/learn/exercise/normal/saga-creators';
import {
  SAVE_ANSWER,
  SAVE_ITEM_INFO,
  SAVE_ITEM_QUESTION_AUDIO_STATUS,
  saveItemInfo,
  saveItemQuestionInfo,
  setUserAnswers,
} from 'actions/learn';
import { errorStatuses, getLearnItemInfoSelector } from 'common/learn';
import { audioStatuses } from 'common/learn/Question';
import coreFlow from './coreFlow';
import Requester from 'common/network/http/Request';
import contestApiUrls from 'components/admin/contest/endpoints';
import lodashGet from 'lodash.get';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import limitQuestionGroupTimeFlow from './special-flows/limitQuestionGroupTimeFlow';

function* mainFlow(itemIid, info) {
  yield race({
    coreFlow: call(coreFlow, itemIid),
    ...(doExamUseLimitQuestionGroupTimeFlow(info)
      ? {
          limitQuestionGroupTimeFlow: call(
            limitQuestionGroupTimeFlow,
            itemIid,
            {
              onQuestionGroupTimerOver: function* onQuestionGroupTimerOver(
                uniqueIdsInQuestionGroup,
              ) {
                yield call(
                  saveTake,
                  itemIid,
                  false,
                  0,
                  false,
                  uniqueIdsInQuestionGroup,
                );
              },
            },
          ),
        }
      : {}),
  });
}

/**
 *
 * @param itemIid
 * @param isFinished
 * @param submitExam == 1 => first time we submit
 *      == 2 => retry again
 * @param questionUniqueIdsToSave
 * @returns {IterableIterator<*>}
 */
function* saveTake(
  itemIid,
  isFinished = false,
  submitExamNth = 0,
  displayMessageAfterSave = false,
  questionUniqueIdsToSave = [],
) {
  const getSaveTakeParams = yield select(getSaveTakeParamsSelector);

  const params = yield call(
    getSaveTakeParams,
    itemIid,
    isFinished,
    submitExamNth,
    questionUniqueIdsToSave,
  );

  // save this information for later 'retry submit' button in case of network errors
  // this action occurs only ONCE
  // TODO: make 1 & 2 become constants
  if (submitExamNth == 1) {
    const getInfo = yield select(getLearnItemInfoSelector);
    const info = yield call(getInfo, itemIid);

    yield put(
      saveItemInfo(itemIid, {
        timeLeftAtSubmitTime: info.timeLeft,
        timeLeftInSecondsAtSubmitTime: info.timeLeftInSeconds,
      }),
    );
  }

  yield put(saveTakeRequest(itemIid, params, displayMessageAfterSave));
}

/**
 * This only happens when user clicks "Start exam" or "Retake exam" explicitly
 * When user, in the middle of the exam, and refresh, he will be taken directly into the full-screen mode,
 * without having to press the "Continue" button.
 * So for now, this only happens when user really starts the exam. In other words, when user has NEVER EVER seen the fullscreen
 * before for this exam.
 *
 * @param itemIid
 * @returns {IterableIterator<*>}
 */
function* saveTakeOnFirstTime(itemIid) {
  const getSaveTakeParams = yield select(getSaveTakeParamsSelector);
  const params = yield call(getSaveTakeParams, itemIid, false);
  return yield call(Requester.post, contestApiUrls.save_take, params);
}

function* saveTakeWhenAnswersChange(itemIid) {
  yield throttle(
    1000,
    (action) =>
      action.type === SAVE_ANSWER && String(action.itemIid) === String(itemIid),
    function*(action) {
      const { questionIndex } = action;
      yield call(
        saveTake,
        itemIid,
        false,
        0,
        lodashGet(action, 'answer.type') == questionTypes.TYPE_OPEN_ENDED,
        [questionIndex],
      );
    },
  );
}

function* saveTakeWhenQuestionAudioPlay(itemIid) {
  yield throttle(
    1000,
    (action) =>
      action.type === SAVE_ITEM_QUESTION_AUDIO_STATUS &&
      String(action.itemIid) === String(itemIid) &&
      action.status === audioStatuses.PLAYED,
    function*() {
      yield call(saveTake, itemIid);
    },
  );
}

function* afterFinish(itemIid, onFinish) {
  const getInfo = yield select(getLearnItemInfoSelector);
  const infoAfterFinish = yield call(getInfo, itemIid);
  yield put(
    saveItemInfo(itemIid, {
      exam_order: parseInt(infoAfterFinish.exam_order) + 1,
      questions: null,
    }),
  );
  // redirect to ex
  onFinish();
}

function* waitForLoadingFinished(itemIid) {
  const getInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(getInfo, itemIid);
  if (info.status !== statuses.DOING) {
    yield take(
      (startAction) =>
        startAction.type === SAVE_ITEM_INFO &&
        String(startAction.itemIid) === String(itemIid) &&
        startAction.info &&
        startAction.info.status === statuses.DOING,
    );
  }
}

function* examFlow(action) {
  const { itemIid, info, isFirstTime, onFinish } = action;

  // Kiểm tra nếu là lần đầu tiên click vào button "Vào thi", nghiệp vụ chống click "Vào thi" từ hai máy
  if (isFirstTime) {
    yield put(
      saveItemInfo(itemIid, Object.assign({}, info, { status: statuses.INIT })),
    );
    const checkSaveTakeOnFirstTime = yield call(saveTakeOnFirstTime, itemIid);

    const result = checkSaveTakeOnFirstTime.result;
    if (!checkSaveTakeOnFirstTime.success && result.already_taken_exam) {
      yield put(
        saveItemInfo(itemIid, {
          error_status: errorStatuses.DO_TAKE_EXAM_PER_TWO_DEVICE,
          already_taken_exam: true,
        }),
      );
      return;
    }
  }

  // Everything is ok => enter exam full screen exam mode
  yield put(
    saveItemInfo(
      itemIid,
      Object.assign({}, info, { status: statuses.STARTED }),
    ),
  );

  // Load paper and prev user answers
  yield call(waitForLoadingFinished, itemIid);

  if (info.mode === modes.NORMAL) {
    // do exam normally
    // PREVIEW | TRIAL
    if (info.answers) {
      yield put(setUserAnswers(itemIid, info.answers));
    }

    if (info.questionsInfo) {
      yield Object.keys(info.questionsInfo).map((questionUniqueId) =>
        put(
          saveItemQuestionInfo(
            itemIid,
            questionUniqueId,
            info.questionsInfo[questionUniqueId],
          ),
        ),
      );
    }

    const racingFlows = {
      saveTakeWhenAnswersChange: call(saveTakeWhenAnswersChange, itemIid),
      saveTakeWhenQuestionAudioPlay: call(
        saveTakeWhenQuestionAudioPlay,
        itemIid,
      ),
      mainFlow: call(mainFlow, itemIid, info),
    };
    yield race(racingFlows);

    // save take the last time (when user has either hit 'Submit' or timed out
    yield call(saveTake, itemIid, true, 1 /*submit exam*/);
  } else if (info.mode === modes.PREVIEW || info.mode === modes.TRIAL) {
    yield call(mainFlow, itemIid, info);
    yield put(saveItemInfo(itemIid, { status: statuses.FINISHED }));
  }

  // wait for requestTake to finish first. Sometimes network is down or for some reason
  // the server couldn't save successfully
  yield take(SUBMIT_EXAM_SUCCESSFUL);
  yield call(afterFinish, itemIid, onFinish);
}

function* retrySubmitExamFlow(action) {
  const { itemIid, info } = action;
  // save take the last time (when user has either hit 'Submit' or timed out
  yield call(saveTake, itemIid, true, 2 /*resubmit exam*/);
}

export default function* examFlowSaga() {
  yield takeEvery(INIT_EXAM, examFlow);
  yield takeEvery(RETRY_SUBMIT_EXAM, retrySubmitExamFlow);
}
