import { call, put, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/creators';

// import errorCodes from 'common/errorCodes';

//= =======================================
function* fetchNodes(action) {
  const formid = action.formid;
  const values = action.values;
  const options = action.options || {};
  const alternativeApi = action.alternativeApi;

  const url = alternativeApi || apiUrls[formid] || '';

  // put a flag indicating that we're submitting...
  if (formid) {
    yield put(startSubmit(formid));
  }
  const data = yield call(
    options.method === 'post' ? Requester.post : Requester.get,
    url,
    values,
  );

  const searchResultKey = action.searchResultKey;
  yield put(actions.updateSearchResults(data, searchResultKey, values));

  if (data && data.success) {
    // update the store.tree
    if (data.result && data.result.length > 0) {
      yield put(actions.treeUpsertNodes(data.result, 'search'));
    } else if (!data.result) {
      data.result = [];
    }
    if (options && options.onSuccess) {
      options.onSuccess(data.result);
    }
    // yield call(resolve);
  } else if (data && typeof data.success !== 'undefined') {
    // yield call(reject, {location: 'No data for that location'});
    console.log('error: Nothing found');
    if (options && options.onFail) {
      options.onFail(data.result);
    }
  } else {
    console.log('network request error ');
    if (options && options.onFail) {
      options.onFail(data.result);
    }
  }

  if (formid) {
    yield put(stopSubmit(formid));
  }
}

export default function* fetchNodesSaga() {
  yield takeEvery('FETCH_NODES_REQUEST', fetchNodes);
}

// export default fetchNodesSaga;
