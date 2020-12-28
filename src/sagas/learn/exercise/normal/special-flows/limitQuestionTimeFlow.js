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
import { saveItemQuestionInfo } from 'actions/learn';
import setCurrentQuestionAndWaitTillFinished from 'sagas/learn/exercise/normal/common/setCurrentQuestionAndWaitTillFinish';
import waitForSetCurrentQuestionInExerciseFinished from 'sagas/learn/exercise/normal/common/waitForSetCurrentQuestionInExerciseFinished';
import countDown from 'sagas/common/common/countDown';
import lodashGet from 'lodash.get';

function* countDownForQuestion(itemIid, questionUniqueId) {
  const getQuestionsWithFullInfoFromUniqueIdsInExercises = yield select(
    getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  );
  const [question] = getQuestionsWithFullInfoFromUniqueIdsInExercises(itemIid, [
    questionUniqueId,
  ]);
  const questionDuration = getQuestionDuration(question);

  if (questionDuration) {
    yield call(countDown, questionDuration, function* setCountDownToStore(
      questionTimeLeftInSeconds,
    ) {
      yield put(
        saveItemQuestionInfo(itemIid, questionUniqueId, {
          questionTimeLeftInSeconds,
        }),
      );
    });
  }

  // true mean successful
  return true;
}

function* disableQuestion(itemIid, questionUniqueId) {
  yield put(
    saveItemQuestionInfo(itemIid, questionUniqueId, {
      disabled: true,
    }),
  );
}

function* checkIfUserChangeToOtherActiveQuestion(
  itemIid,
  currentQuestionUniqueId,
) {
  const getQuestionsWithFullInfoFromUniqueIdsInExercises = yield select(
    getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  );

  return yield call(waitForSetCurrentQuestionInExerciseFinished, itemIid, {
    questionUniqueIdCondition: (questionUniqueId) => {
      if (questionUniqueId === currentQuestionUniqueId) {
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

function* autoNavigateQuestion(itemIid, { onQuestionTimeOver } = {}) {
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

    const { currentQuestionUniqueId } = navigateInfoOfQuestion;

    const {
      checkIfUserChangeToOtherActiveQuestion: didUserChangeToOtherActiveQuestion,
    } = yield race({
      countDownForCurrentQuestion: call(
        countDownForQuestion,
        itemIid,
        currentQuestionUniqueId,
      ),
      checkIfUserChangeToOtherActiveQuestion: call(
        checkIfUserChangeToOtherActiveQuestion,
        itemIid,
        currentQuestionUniqueId,
      ),
    });

    yield call(disableQuestion, itemIid, currentQuestionUniqueId);
    if (typeof onQuestionTimeOver === 'function') {
      yield call(onQuestionTimeOver, currentQuestionUniqueId);
    }

    if (!didUserChangeToOtherActiveQuestion) {
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

export default function* limitQuestionTimeFlow(
  itemIid,
  { onQuestionTimeOver } = {},
) {
  yield call(autoNavigateQuestion, itemIid, { onQuestionTimeOver });
}
