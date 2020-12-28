import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getFormValues, submit } from 'redux-form';
import Requester from 'common/network/http/Request';
import nodeActions from '../../actions/node/creators';
import { t1 } from 'translate';

function* generateOTPForContestants(action) {
  let { url, params, formid } = action;
  if (!params && formid) {
    params = yield select(getFormValues(formid));
  }

  try {
    const data = yield call(Requester.get, url, params);

    if (data.success) {
      yield put(submit(formid));

      yield put(
        nodeActions.snackbar(
          true,
          t1('generate_otp_for_contestants_successful'),
        ),
      );
    } else {
      yield put(
        nodeActions.snackbar(true, t1('generate_otp_for_contestants_failed')),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* exportDataSaga() {
  yield takeEvery('GENERATE_OTP_FOR_CONTESTANTS', generateOTPForContestants);
}
