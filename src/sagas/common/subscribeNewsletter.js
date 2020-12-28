import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* subscribeNewsletter(action) {
  const { url, params } = action;

  const data = yield call(Requester.get, url, params);

  if (data.success && data.objects.url) {
    yield put(
      nodeActions.snackbar(true, `${t1('subscribe_newsletter_successful')}!`),
    );
  } else {
    yield put(nodeActions.snackbar(true, data.message));
  }
}

export default function* subscribeNewsletterSaga() {
  yield takeEvery('SUBSCRIBE_NEWSLETTER', subscribeNewsletter);
}
