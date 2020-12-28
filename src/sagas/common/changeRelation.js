import { call, put, takeEvery } from 'redux-saga/effects';
import { submit } from 'redux-form';
import Requester from 'common/network/http/Request';
import actions from 'actions/node/creators';

function* addRelation(action) {
  const { url, params, closeModal, executeOnSuccess, executeOnFailed } = action;

  const data = yield call(Requester.post, url, params);

  if (data.success) {
    yield put(submit(params.formid));
    if (closeModal) {
      yield put(actions.handleOpenDialog({ openDialog: false }));
    }
    if (typeof executeOnSuccess === 'function') {
      executeOnSuccess(data);
    }
  } else {
    if (typeof executeOnFailed === 'function') {
      executeOnFailed(data);
    }
    console.log('Change relation failed');
  }
}

export default function* addRelationSaga() {
  yield takeEvery('CHANGE_RELATION_REQUEST', addRelation);
}
