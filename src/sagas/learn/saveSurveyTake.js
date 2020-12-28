import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { SAVE_SURVEY_TAKE_REQUEST } from 'actions/learn/saga-creators';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* saveTake(action) {
  const { itemIid, params } = action;
  if (!params) return;

  try {
    yield call(Requester.post, sApiUrls.save_survey_take, params);
    yield put(nodeActions.snackbar('success', t1('save_survey_successfully')));
  } catch (ex) {
    yield put(nodeActions.snackbar('error', t1('cannot_save_survey')));
    console.log('save take request failed', ex);
  }
}

export default function* saveTakeSaga() {
  yield takeEvery(SAVE_SURVEY_TAKE_REQUEST, saveTake);
}
