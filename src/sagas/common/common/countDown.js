import { call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import lodashGet from 'lodash.get';
import Requester from 'common/network/http/Request';

const SYNC_APPROXIMATELY_EVERY_X_SECONDS = 60;
const MIN_SECONDS_BETWEEN_SYNC = 60;

export default function* countDown(duration, onTimeLeftChange) {
  let syncWithServerData = {};

  let initialTimeLeftInSeconds = duration;
  let timeLeftInSeconds = initialTimeLeftInSeconds;
  let startTime = performance.now();

  let shouldSyncWithServer = true;

  let lastTimeSync = null;

  while (timeLeftInSeconds > 0) {
    timeLeftInSeconds =
      initialTimeLeftInSeconds - (performance.now() - startTime) / 1000;

    if (shouldSyncWithServer) {
      try {
        let serverTime = null;
        const res = yield call(Requester.get, '/server-time');
        if (lodashGet(res, 'success')) {
          serverTime = lodashGet(res, 'result');
        }

        if (serverTime) {
          if (
            syncWithServerData.timeLeftInSeconds &&
            syncWithServerData.serverTime
          ) {
            timeLeftInSeconds =
              syncWithServerData.timeLeftInSeconds -
              (serverTime - syncWithServerData.serverTime);

            startTime = performance.now();
            initialTimeLeftInSeconds = timeLeftInSeconds;
          }

          syncWithServerData = {
            ...syncWithServerData,
            serverTime,
            timeLeftInSeconds,
          };

          lastTimeSync = performance.now();
        }
      } catch (e) {
        // sync with server failed
        console.log(e);
      }
    }

    yield call(onTimeLeftChange, timeLeftInSeconds);

    if (timeLeftInSeconds > 0) {
      yield call(delay, 1000);
    }

    // randomize to see if next loop we should sync with server (the chance is 1/300 ~ sync every 5 minutes)
    shouldSyncWithServer = false;
    if (performance.now() - lastTimeSync > MIN_SECONDS_BETWEEN_SYNC * 1000) {
      shouldSyncWithServer =
        Math.floor(Math.random() * SYNC_APPROXIMATELY_EVERY_X_SECONDS) === 0;
    }
  }

  yield call(onTimeLeftChange, 0);
}
