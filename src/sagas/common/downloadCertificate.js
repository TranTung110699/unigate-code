import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* downloadCertificate(action) {
  const { url, params } = action;

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success && data.url) {
      window.open(data.url);
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, t1('download_certificate_failed')));
  }
}

export default function* downloadCertificateSaga() {
  yield takeEvery('DOWNLOAD_CERTIFICATE_REQUEST', downloadCertificate);
}
