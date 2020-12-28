import { call, put, takeEvery } from 'redux-saga/effects';
import commonActions from 'actions/creators';
import { getTimeInSeconds, secondsToTimeString } from 'common/utils/Date';
import countDown from 'sagas/common/common/countDown';

function* timeCountUp(action) {
  let { timeStart, duration, stateKey } = action;
  if (!duration || !stateKey) {
    return;
  }
  yield put(commonActions.saveTimeCountUp(stateKey, {}));

  duration = duration - (timeStart || 0);
  duration = getTimeInSeconds(duration);

  yield call(countDown, duration, function* setCountUpToStore(
    timeLeftInSeconds,
  ) {
    const data =
      timeLeftInSeconds <= 0
        ? {
            timeLeft: null,
            countUp: null,
          }
        : {
            timeLeft: secondsToTimeString(
              (timeStart || 0) + duration - timeLeftInSeconds,
            ),
            countUp: (timeStart || 0) + duration - timeLeftInSeconds,
          };
    yield put(commonActions.saveTimeCountUp(stateKey, data));
  });
}

export default function* timeCountDownSaga() {
  yield takeEvery('SAGA_TIME_COUNT_UP', timeCountUp);
}
