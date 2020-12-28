import { call, put, race, select } from 'redux-saga/effects';
import {
  findOneQuestionUniqueIdInTrackingLineSelector,
  getNavigateInfoOfExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
} from 'common/learn/exercise';
import {
  getQuestionDuration,
  isQuestionDisabled,
} from 'common/learn/exercise/question';
import { saveItemInfo, saveItemQuestionInfo } from 'actions/learn';
import setCurrentQuestionAndWaitTillFinished from 'sagas/learn/exercise/normal/common/setCurrentQuestionAndWaitTillFinish';
import waitForSetCurrentQuestionInExerciseFinished from 'sagas/learn/exercise/normal/common/waitForSetCurrentQuestionInExerciseFinished';
import countDown from 'sagas/common/common/countDown';
import lodashGet from 'lodash.get';
import { sum } from 'common/utils/Array';

function* countDownForQuestionGroup(itemIid, uniqueIdsInQuestionGroup) {
  const getQuestionsWithFullInfoFromUniqueIdsInExercises = yield select(
    getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  );
  const questions = getQuestionsWithFullInfoFromUniqueIdsInExercises(
    itemIid,
    uniqueIdsInQuestionGroup,
  );
  const time = sum(questions, (q) => getQuestionDuration(q) || 0);

  if (time) {
    yield call(countDown, time, function* setCountDownToStore(
      questionGroupTimeLeftInSeconds,
    ) {
      yield put(
        saveItemInfo(itemIid, {
          questionGroupTimeLeftInSeconds,
        }),
      );
    });
  }

  // true mean successful
  return true;
}

function* disableQuestions(itemIid, questionUniqueIds) {
  yield (questionUniqueIds || []).map((qUniqueId) =>
    put(
      saveItemQuestionInfo(itemIid, qUniqueId, {
        disabled: true,
      }),
    ),
  );
}

function* checkIfUserChangeToOtherActiveQuestionGroup(
  itemIid,
  uniqueIdsInQuestionGroup,
) {
  const getQuestionsWithFullInfoFromUniqueIdsInExercises = yield select(
    getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  );

  return yield call(waitForSetCurrentQuestionInExerciseFinished, itemIid, {
    questionUniqueIdCondition: (questionUniqueId) => {
      if ((uniqueIdsInQuestionGroup || []).includes(questionUniqueId)) {
        return false;
      }

      const [question] = getQuestionsWithFullInfoFromUniqueIdsInExercises(
        itemIid,
        [questionUniqueId],
      );

      return !isQuestionDisabled(question);
    },
  });
}

function* findNotDisabledQuestionInTrackingLine(itemIid) {
  const findOneQuestionUniqueIdInTrackingLine = yield select(
    findOneQuestionUniqueIdInTrackingLineSelector,
  );

  // we ignore the questions that have been disabled
  return yield call(
    findOneQuestionUniqueIdInTrackingLine,
    itemIid,
    (question) => !lodashGet(question, 'disabled'),
  );
}

function* autoNavigateQuestion(itemIid, { onQuestionGroupTimerOver } = {}) {
  // we ignore the questions that have been disabled
  const firstQuestionUniqueId = yield call(
    findNotDisabledQuestionInTrackingLine,
    itemIid,
  );

  yield call(
    setCurrentQuestionAndWaitTillFinished,
    itemIid,
    firstQuestionUniqueId,
    true,
  );

  while (true) {
    const getNavigateInfoOfExercise = yield select(
      getNavigateInfoOfExerciseSelector,
    );

    const navigateInfoOfQuestion = yield call(
      getNavigateInfoOfExercise,
      itemIid,
    );

    const { uniqueIdsInQuestionGroup } = navigateInfoOfQuestion;

    const {
      checkIfUserChangeToOtherActiveQuestionGroup: didUserChangeToOtherActiveQuestionGroup,
    } = yield race({
      countDownForCurrentQuestionGroup: call(
        countDownForQuestionGroup,
        itemIid,
        uniqueIdsInQuestionGroup,
      ),
      checkIfUserChangeToOtherActiveQuestionGroup: call(
        checkIfUserChangeToOtherActiveQuestionGroup,
        itemIid,
        uniqueIdsInQuestionGroup,
      ),
    });

    yield call(disableQuestions, itemIid, uniqueIdsInQuestionGroup);
    if (typeof onQuestionGroupTimerOver === 'function') {
      yield call(onQuestionGroupTimerOver, uniqueIdsInQuestionGroup);
    }

    if (!didUserChangeToOtherActiveQuestionGroup) {
      // move to the next question that is not disabled
      const questionUniqueIdToMoveTo = yield call(
        findNotDisabledQuestionInTrackingLine,
        itemIid,
      );

      if (!questionUniqueIdToMoveTo) {
        break;
      }

      yield call(
        setCurrentQuestionAndWaitTillFinished,
        itemIid,
        questionUniqueIdToMoveTo,
        true,
      );
    }
  }
}

export default function* limitQuestionGroupTimeFlow(
  itemIid,
  { onQuestionGroupTimerOver } = {},
) {
  yield call(autoNavigateQuestion, itemIid, { onQuestionGroupTimerOver });
}
