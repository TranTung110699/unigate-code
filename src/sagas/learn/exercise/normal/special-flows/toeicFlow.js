import { call, put, select, take } from 'redux-saga/effects';
import {
  getListeningNavigateInfoOfQuestionInExerciseSelector,
  getNavigateInfoOfQuestionInExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
} from 'common/learn/exercise';
import { SAVE_ITEM_QUESTION_AUDIO_STATUS, saveItemInfo } from 'actions/learn';
import { setCurrentQuestionInExercise } from 'actions/learn/exercise/normal/saga-creators';
import { audioStatuses } from 'common/learn/Question';
import { count } from 'common/utils/Array';

function* waitForAudioToFinishPlaying(itemIid, questionUniqueId, audioIndex) {
  yield take(
    (action) =>
      action.type === SAVE_ITEM_QUESTION_AUDIO_STATUS &&
      String(action.itemIid) === String(itemIid) &&
      action.questionUniqueId === questionUniqueId &&
      action.audioIndex === audioIndex &&
      action.status === audioStatuses.FINISHED,
  );
}

function* autoNavigateListening(itemIid) {
  let currentQuestionUniqueId = null;
  while (true) {
    const getListeningNavigateInfoOfQuestion = yield select(
      getListeningNavigateInfoOfQuestionInExerciseSelector,
    );
    const listeningNavigateInfoOfQuestion = yield call(
      getListeningNavigateInfoOfQuestion,
      itemIid,
      currentQuestionUniqueId,
      true,
    );
    const { nextQuestionUniqueId, audios } = listeningNavigateInfoOfQuestion;
    ({ currentQuestionUniqueId } = listeningNavigateInfoOfQuestion);

    if (!currentQuestionUniqueId) {
      break;
    }

    const getQuestionInfo = yield select(
      getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
    );
    const [question] = yield call(getQuestionInfo, itemIid, [
      currentQuestionUniqueId,
    ]);

    if (!question) {
      break;
    }

    if (
      !question.audiosInfo ||
      count(
        Object.values(question.audiosInfo),
        (audioInfo) => audioInfo && audioInfo.status === audioStatuses.FINISHED,
      ) < audios.length
    ) {
      yield put(
        saveItemInfo(itemIid, {
          currentListeningQuestionUniqueId: currentQuestionUniqueId,
        }),
      );

      yield put(
        setCurrentQuestionInExercise(itemIid, currentQuestionUniqueId, true),
      );

      for (let i = 0; i < audios.length; i += 1) {
        yield call(
          waitForAudioToFinishPlaying,
          itemIid,
          currentQuestionUniqueId,
          i,
        );
      }
    }

    if (!nextQuestionUniqueId) {
      yield put(
        saveItemInfo(itemIid, { currentListeningQuestionUniqueId: null }),
      );
      const getNavigateInfoOfQuestion = yield select(
        getNavigateInfoOfQuestionInExerciseSelector,
      );
      const navigateInfoOfQuestion = yield call(
        getNavigateInfoOfQuestion,
        itemIid,
        currentQuestionUniqueId,
        true,
      );
      yield put(
        setCurrentQuestionInExercise(
          itemIid,
          navigateInfoOfQuestion.nextQuestionUniqueId,
          true,
        ),
      );
      break;
    }

    currentQuestionUniqueId = nextQuestionUniqueId;
  }
}

export default function* toeicFlow(itemIid) {
  yield call(autoNavigateListening, itemIid);
  yield put(saveItemInfo(itemIid, { isToeicListeningFinish: true }));
  yield take('we_use_this_effect_to_delay_this_saga_forever');
}
