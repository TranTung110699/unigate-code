import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import nodeActions from 'actions/node/creators';
import React from 'react';
import { PAY_FOR_LEARNING_PATH } from 'actions/learn/saga-creators';

//= ======================fetchNodeSaga=================================
function* payForLearningPaths(action) {
  const { params, executeOnSuccess } = action;
  const data = yield call(Requester.get, apiUrls.pay_for_path, params);

  if (data.success) {
    yield executeOnSuccess();
  } else {
    yield put(nodeActions.snackbar(true, data.message));
  }
}

export default function* payForLearningPathsSagas() {
  yield takeEvery(PAY_FOR_LEARNING_PATH, payForLearningPaths);
}
