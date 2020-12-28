import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import { t, t1 } from 'translate';
import actions from 'actions/node/creators';
import apiUrls from 'api-endpoints';

const postSuccess = () => `${t('cloned_successfully')}`;

function* deepCloneNode(action) {
  try {
    const payload = action.payload || {};
    const { data, ntype, iid, requestSuccessful, options } = payload;

    const post = yield call(Requester.post, apiUrls.deep_clone, {
      iid,
      ntype,
      options,
    });

    if (post.success) {
      if (!post.result) return;

      const values = Object.assign({}, data, post.result);

      if (requestSuccessful) {
        yield call(requestSuccessful, values);
      }

      yield put(actions.treeUpsertNode(values));
      yield put(actions.snackbar(true, postSuccess(post.result)));
    } else {
      yield put(
        actions.snackbar(true, t1('something_went_wrong_please_try_again')),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* deepCloneNodeSaga() {
  yield takeEvery('DEEP_CLONE_NODE_REQUEST', deepCloneNode);
}
