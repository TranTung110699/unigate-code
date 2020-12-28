import { call, takeEvery } from 'redux-saga/effects';

import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';

function* downloadImportTemplate({ param = {} }) {
  const urlNew = apiUrls.import_students_download_template_request;

  const params = {
    type: 'student',
    ...param,
  };

  const data = yield call(Requester.get, urlNew, params);

  if (data.success) {
    window.location.assign(data.objects.url);
  }
}

export default function* downloadImportTemplateSaga() {
  yield takeEvery('DOWNLOAD_IMPORT_TEMPLATE_REQUEST', downloadImportTemplate);
}
