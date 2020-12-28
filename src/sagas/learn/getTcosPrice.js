import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { GET_TCOS_PRICE_REQUEST } from 'actions/learn/saga-creators';

import { saveTcosPriceToStore } from 'actions/learn';

//= ======================fetchNodeSaga=================================
function* getTcosPrice(action) {
  try {
    const { params } = action;
    const data = yield call(Requester.get, apiUrls.get_tcos_price, params);
    yield put(saveTcosPriceToStore(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getTcosPriceSaga() {
  yield takeEvery(GET_TCOS_PRICE_REQUEST, getTcosPrice);
}
