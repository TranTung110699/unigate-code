import { put, select, takeEvery } from 'redux-saga/effects';
import {
  SET_CURRENT_QUESTION_IN_EXERCISE,
  setCurrentQuestionInExerciseFinished,
} from 'actions/learn/exercise/normal/saga-creators';
import { saveItemInfo, saveItemQuestionInfo } from 'actions/learn';
import { replace } from 'react-router-redux';
import { parse, stringify } from 'query-string';
import { getSearch } from 'common/selectors/router';
import lodashSet from 'lodash.set';

export default function* setCurrentQuestionSaga() {
  yield takeEvery(
    SET_CURRENT_QUESTION_IN_EXERCISE,
    function* setCurrentQuestion(action) {
      const {
        itemIid,
        questionUniqueId,
        shouldDisplayCurrentQuestionAtTop,
      } = action;

      const searchQuery = yield select(getSearch);
      const searchQueryObj = parse(searchQuery);
      lodashSet(searchQueryObj, 'question_id', questionUniqueId);

      yield put(replace({ search: stringify(searchQueryObj) }));

      yield put(
        saveItemInfo(itemIid, {
          shouldDisplayCurrentQuestionAtTop,
        }),
      );

      if (questionUniqueId) {
        yield put(
          saveItemQuestionInfo(itemIid, questionUniqueId, { isTouched: true }),
        );
      }

      yield put(
        setCurrentQuestionInExerciseFinished(itemIid, questionUniqueId),
      );
    },
  );
}
