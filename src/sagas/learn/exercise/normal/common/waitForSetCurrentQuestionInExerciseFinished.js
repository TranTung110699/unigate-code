import { take } from 'redux-saga/effects';
import { SET_CURRENT_QUESTION_IN_EXERCISE_FINISHED } from 'actions/learn/exercise/normal/saga-creators';

function* waitForSetCurrentQuestionInExerciseFinished(
  itemIid,
  { questionUniqueId, questionUniqueIdCondition } = {},
) {
  const action = yield take((action) => {
    if (action.type !== SET_CURRENT_QUESTION_IN_EXERCISE_FINISHED) {
      return false;
    }

    if (action.itemIid != itemIid) {
      return false;
    }

    const questionUniqueIdFromAction = action.questionUniqueId;

    if (questionUniqueId && questionUniqueIdFromAction !== questionUniqueId) {
      return false;
    }

    if (
      typeof questionUniqueIdCondition === 'function' &&
      !questionUniqueIdCondition(questionUniqueIdFromAction)
    ) {
      return false;
    }

    return true;
  });

  return {
    questionUniqueId: action.questionUniqueId,
  };
}
export default waitForSetCurrentQuestionInExerciseFinished;
