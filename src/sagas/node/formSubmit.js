import { call, takeEvery } from 'redux-saga/effects';
import formSubmitFunction from 'sagas/node/common/formSubmitFunction';

function* formSubmitRequest(action) {
  const { formid, options, method } = action;
  yield call(formSubmitFunction, formid, options, method);
}

export default function* formSubmitSaga() {
  yield takeEvery('FORM_SUBMIT_REQUEST', formSubmitRequest);
}
