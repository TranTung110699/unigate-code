/**
 * Created by hungvo on 20/04/2017.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { submit } from 'redux-form';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import actions from 'actions/node/creators';

function* deleteNode(action) {
  const {
    ntype,
    id,
    step,
    alternativeApi,
    onRequestSuccessful,
    formid,
    message,
  } = action;
  try {
    let params = action.params || {};

    let apiUrl;
    if (alternativeApi) {
      apiUrl = alternativeApi;
    } else {
      apiUrl = apiUrls.delete_node(ntype);
    }

    params = Object.assign(params, { id, _sand_step: step });
    const post = yield call(
      Requester.post, // Requester.post
      apiUrl,
      params,
    );

    if (post.success) {
      yield put(
        actions.snackbar(
          true,
          (message && message.success) ||
            post.message ||
            t1('delete_successful'),
        ),
      );
      if (onRequestSuccessful) {
        onRequestSuccessful();
      }
      if (formid) {
        yield put(submit(formid));
      }
    } else if (post.message) {
      yield put(actions.snackbar('error', post.message));
    } else {
      yield put(
        actions.snackbar(
          'error',
          (message && message.error) || t1('delete_failed'),
        ),
      );
    }
  } catch (e) {
    yield put(
      actions.snackbar(true, (message && message.error) || t1('delete_failed')),
    );
  }
}

export default function* deleteNodeSaga() {
  yield takeEvery('DELETE_NODE_REQUEST', deleteNode);
}
