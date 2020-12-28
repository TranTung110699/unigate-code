import { call, put, throttle } from 'redux-saga/effects';
import { SUGGEST_AUTO_COMPLETE } from 'actions/suggest/saga-creators';
import { saveSuggestAutoComplete } from 'actions/suggest/creators';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';

function* suggestAutoComplete(action) {
  const { params } = action;
  if (!params) {
    return;
  }

  try {
    const data = yield call(
      Requester.get,
      apiUrls.suggest_autocomplete,
      params,
    );

    const { ntypes, ntype } = params;
    if (ntypes && data) {
      yield put(saveSuggestAutoComplete(data));
    } else if (ntype && data) {
      yield put(saveSuggestAutoComplete({ [ntype]: data }));
    }
  } catch (ex) {
    console.log(ex);
  }
}

export default function* suggestAutoCompleteSaga() {
  yield throttle(500, SUGGEST_AUTO_COMPLETE, suggestAutoComplete);
}
