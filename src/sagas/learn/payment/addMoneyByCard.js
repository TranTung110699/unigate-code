import { call, put, takeEvery } from 'redux-saga/effects';
import nodeActions from 'actions/node/creators';
import Requester from 'common/network/http/Request';
// import apiUrls from 'api-endpoints';
import cApiUrls from 'components/admin/card/endpoints';
import {
  ADD_MONEY_BY_CARD_REQUEST,
  getUserMoney,
} from 'actions/learn/payment/saga-creators';

function* addMoneyByCard(action) {
  const { params } = action;
  const data = yield call(Requester.post, cApiUrls.add_money_by_card, params);
  if (data.success) {
    yield put(getUserMoney());
    yield put(nodeActions.snackbar(true, data.message));
  } else {
    yield put(nodeActions.snackbar(true, data.message));
  }
}

export default function* addMoneyByCardSaga() {
  yield takeEvery(ADD_MONEY_BY_CARD_REQUEST, addMoneyByCard);
}
