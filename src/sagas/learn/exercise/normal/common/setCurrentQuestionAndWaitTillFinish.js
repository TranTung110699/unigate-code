import { call, put } from 'redux-saga/effects';
import { setCurrentQuestionInExercise } from 'actions/learn/exercise/normal/saga-creators';
import waitForSetCurrentQuestionInExerciseFinished from './waitForSetCurrentQuestionInExerciseFinished';

function* setCurrentQuestionAndWaitTillFinish(
  itemIid,
  questionUniqueId,
  shouldDisplayCurrentQuestionAtTop,
) {
  yield put(
    setCurrentQuestionInExercise(
      itemIid,
      questionUniqueId,
      shouldDisplayCurrentQuestionAtTop,
    ),
  );
  yield call(waitForSetCurrentQuestionInExerciseFinished, itemIid);
}

export default setCurrentQuestionAndWaitTillFinish;
