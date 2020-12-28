/**
 * Created by anhvtt on 09/05/2017.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import Requester from 'common/network/http/Request';
import actions from 'actions/node/creators';
import { loginSuccess, maskTeacher } from 'actions/auth/';
import getUser from 'common/auth';

function* loginAs(action) {
  try {
    const { user, apiUrl, formid, closeModal } = action.payload;

    if (formid) {
      yield put(startSubmit(formid));
    }

    const json = yield call(Requester.post, apiUrl, { user });

    if (json.success) {
      // now save the current user into new redux 'masked_teacher' field
      const currentUser = getUser();
      yield put(maskTeacher(currentUser));

      yield put(loginSuccess(json.result));
      // alert("Logged in as " + json.result.name);
      if (closeModal) {
        yield put(actions.handleOpenDialog({ openDialog: false }));
      }
    } else {
      yield put(actions.snackbar(true, json.message || json.err));
    }

    if (formid) {
      yield put(stopSubmit(formid));
    }
  } catch (e) {
    console.log('Get login as failed', e);
  }
}

export default function* loginAsSaga() {
  yield takeEvery('LOGIN_AS', loginAs);
}
