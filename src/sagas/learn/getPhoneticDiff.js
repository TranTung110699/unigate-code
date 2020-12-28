import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { GET_PHONETIC_DIFF_REQUEST } from 'actions/learn/saga-creators';
import { addPhoneticDiff } from 'actions/learn/index';

//= ======================fetchNodeSaga=================================
function* getPhoneticDiff(action) {
  const { vid, position, word, wrongWord } = action;
  const data = yield call(Requester.get, apiUrls.get_phonetic_diff, {
    word,
    wordWrong: wrongWord,
  });
  if (data && data.success) {
    yield put(addPhoneticDiff(vid, position, data.result));
  } else {
    console.log(data);
  }
}

export default function* getPhoneticDiffSaga() {
  yield takeEvery(GET_PHONETIC_DIFF_REQUEST, getPhoneticDiff);
}
