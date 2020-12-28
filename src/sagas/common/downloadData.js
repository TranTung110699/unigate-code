import { call, takeEvery } from 'redux-saga/effects';

import Requester from 'common/network/http/Request';

function* downloadData(action) {
  const { url, params } = action;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success && data.objects && data.objects.url) {
      window.location.assign(data.objects.url);
    }
  } catch (ex) {
    console.log(ex);
  }
}

export default function* downloadImportTemplateSaga() {
  yield takeEvery('DOWNLOAD_DATA_REQUEST', downloadData);
}
