import { call, put, takeEvery } from 'redux-saga/effects';
import nodeActions from 'actions/node/creators';
import { changeUserMoney } from 'actions/user';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { GET_USER_MONEY_REQUEST } from 'actions/learn/payment/saga-creators';

function* getUserMoney() {
  const data = yield call(Requester.get, apiUrls.get_user_balance);
  if (data.success) {
    yield put(changeUserMoney(data.result));
  } else {
    yield put(nodeActions.snackbar(true, data.message));
  }
}

export default function* getUserMoneySaga() {
  yield takeEvery(GET_USER_MONEY_REQUEST, getUserMoney);
}
