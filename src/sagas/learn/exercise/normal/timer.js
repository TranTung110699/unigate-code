import { call, put } from 'redux-saga/effects';
import { saveItemCountDownTimeToStore } from 'actions/learn';
import { getTimeInSeconds } from 'common/utils/Date';
import countDown from 'sagas/common/common/countDown';

export default function* countDownTimer(duration, itemIid) {
  yield call(
    countDown,
    getTimeInSeconds(duration),
    function* setCountDownToStore(timeLeftInSeconds) {
      yield put(saveItemCountDownTimeToStore(itemIid, timeLeftInSeconds));
    },
  );
}
