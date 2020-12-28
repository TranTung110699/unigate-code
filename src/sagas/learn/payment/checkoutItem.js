import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_CHECKOUT_ITEM_SAGA,
  addCheckoutItem,
} from 'actions/learn/payment/buy-package';
import Requester from 'common/network/http/Request';
import packageApi from 'components/buy-package/api';
import nodeActions from 'actions/node/creators';

function* checkoutItem(action) {
  const { config } = action;
  const { params, executeOnSuccess, executeOnFailure } = config;
  const data = yield call(Requester.post, packageApi.newSalesOrder, params);

  if (data.success) {
    yield put(
      addCheckoutItem({ iid: data.result.iid, amount: params.total_amount }),
    );
    if (executeOnSuccess && typeof executeOnSuccess === 'function')
      executeOnSuccess(data.result);
  } else {
    yield put(nodeActions.snackbar('error', data.message));
    if (executeOnFailure && typeof executeOnFailure === 'function')
      executeOnFailure();
  }
}

export default function* checkoutItemSaga() {
  yield takeEvery(ADD_CHECKOUT_ITEM_SAGA, checkoutItem);
}
