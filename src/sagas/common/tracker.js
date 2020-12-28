/**
 * Created by vohung on 22/05/2017.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import actions from 'actions/creators';
import Perm from 'common/utils/Perm';

function* trackerProgressSave(data) {
  try {
    if (Perm.isGuest()) {
      return;
    }
    const { params, updateToStoreAfterSuccess, executeOnSuccess } = data;

    const url = apiUrls.tracker_progress_save(params._sand_real_time);

    yield call(xxx, url, params, updateToStoreAfterSuccess, executeOnSuccess);
  } catch (e) {
    console.log(e);
  }
}

function* xxx(url, params, updateToStoreAfterSuccess, executeOnSuccess) {
  const post = yield call(Requester.post, url, params, null, false);

  if (post && post.success && post.result) {
    if (typeof executeOnSuccess === 'function') {
      executeOnSuccess(post.result);
    }
    if (updateToStoreAfterSuccess) {
      yield put(actions.saveProgressMulti(post.result));
    }
  } else if (!post || !post.success) {
    console.log('Tracker failed');
  }
}

function* trackerProgressGet(data) {
  try {
    if (Perm.isGuest()) {
      return;
    }
    const { params, updateToStoreAfterSuccess, executeOnSuccess } = data;
    const url = apiUrls.tracker_progress_get();
    yield call(xxx, url, params, updateToStoreAfterSuccess, executeOnSuccess);
  } catch (e) {
    console.log(e);
  }
}

export default function* trackerProgressSaga() {
  yield takeEvery('TRACKER_PROGRESS_SAVE', trackerProgressSave);
  yield takeEvery('TRACKER_PROGRESS_GET', trackerProgressGet);
}
