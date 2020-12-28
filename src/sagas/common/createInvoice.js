import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { t1 } from 'translate';

function* createInvoice(action) {
  const { url, params, executeOnSuccess } = action;

  try {
    const data = yield call(Requester.post, url, params);

    if (data.success) {
      if (typeof executeOnSuccess === 'function') {
        executeOnSuccess(data);
      }
    } else {
      yield put(nodeActions.snackbar(true, data.message));
    }
  } catch (ex) {
    yield put(nodeActions.snackbar(true, t1('create_invoice_failed')));
  }
}

export default function* createInvoiceSaga() {
  yield takeEvery('CREATE_INVOICE_REQUEST', createInvoice);
}
