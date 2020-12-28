import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import actions from 'actions/creators';

function* getTranslations(data) {
  try {
    const { language, version, isTranslating } = data;
    const url = apiUrls.get_translations;
    const resp = yield call(Requester.get, url, { lang: language });
    if (resp.success && resp.result) {
      window.messages = resp.result;
      const dataState = {
        messages: resp.result,
        language,
        version,
        isTranslating,
        update: true,
      };
      yield put(actions.saveTranslations(dataState));
    } else if (!resp.success || !resp.result) {
      yield put(actions.saveTranslations({ language }));
    } else {
      yield put(actions.saveTranslations({ update: false }));
      console.log('Failed');
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* translationsSaga() {
  yield takeEvery('GET_TRANSLATIONS', getTranslations);
}
