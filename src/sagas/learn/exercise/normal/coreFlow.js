import { call, race, select, take } from 'redux-saga/effects';
import { FINISH_EXERCISE } from 'actions/learn/exercise/normal/saga-creators';
import { getLearnItemInfoSelector } from 'common/learn';
import { getTimeInSeconds } from 'common/utils/Date';
import countDownTimer from './timer';

function* waitForFinishAction(itemIid) {
  yield take(
    (action) =>
      action.type === FINISH_EXERCISE &&
      action.itemIid &&
      String(action.itemIid) === String(itemIid),
  );
}

function* countDownAndFinish(itemIid, duration) {
  yield call(countDownTimer, duration, itemIid);
}

export default function* coreFlow(itemIid) {
  const getInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(getInfo, itemIid);

  let racingFlows = {
    waitForFinishAction: call(waitForFinishAction, itemIid),
  };
  const duration = getTimeInSeconds(info.timeRemaining || info.duration);
  if (duration) {
    racingFlows = {
      ...racingFlows,
      countDownAndFinish: call(countDownAndFinish, itemIid, duration),
    };
  }
  yield race(racingFlows);
}
