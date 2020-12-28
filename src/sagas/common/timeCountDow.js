import { call, put, takeEvery } from 'redux-saga/effects';
import commonActions from 'actions/creators';
import { getTimeInSeconds, secondsToTimeString } from 'common/utils/Date';
import countDown from 'sagas/common/common/countDown';

function* timeCountDown(action) {
  const { duration, stateKey } = action;
  if (!duration) {
    return;
  }

  yield put(commonActions.saveTimeCountDown(stateKey, {}));

  yield call(
    countDown,
    getTimeInSeconds(duration),
    function* setCountDownToStore(timeLeftInSeconds) {
      const data =
        timeLeftInSeconds <= 0
          ? {
              timeLeft: null,
              countDown: null,
            }
          : {
              timeLeft: secondsToTimeString(timeLeftInSeconds),
              countDown: timeLeftInSeconds,
            };
      yield put(commonActions.saveTimeCountDown(stateKey, data));
    },
  );
}

export default function* timeCountDownSaga() {
  yield takeEvery('SAGA_TIME_COUNT_DOWN', timeCountDown);
}
