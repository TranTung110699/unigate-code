import { call, put, takeEvery } from 'redux-saga/effects';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import actions from 'actions/creators';
import nodeActions from 'actions/node/creators';
import { loadingStatuses } from 'configs/constants';
import formSubmitFunction from 'sagas/node/common/formSubmitFunction';

//= ======================fetchNodeSaga=================================
function* apiGetData(action) {
  const { params, config } = action;
  const {
    keyState,
    successMessage,
    failureMessage,
    executeOnSuccess,
    executeOnFailure,
    post,
    upsertNode,
    showMessage,
    onLoadingStatusChange,
  } = config;

  let { url } = config;
  url = url || apiUrls.fetch_node;

  const actionToSetLoadingStatusToSet = (status) =>
    actions.changeLoadingStatus({
      status,
      [keyState]: status,
    });

  function* setLoadingStatus(newLoadingStatus) {
    yield put(actionToSetLoadingStatusToSet(newLoadingStatus));
    if (typeof onLoadingStatusChange === 'function') {
      onLoadingStatusChange(newLoadingStatus);
    }
  }

  try {
    yield call(setLoadingStatus, loadingStatuses.LOADING);

    const options = {
      successMessage,
      failureMessage,
      url,
      extraParams: params,
      executeOnSuccess: (data) =>
        executeOnSuccess && executeOnSuccess(data.result, data.objects),
      executeOnFailure,
    };

    const method = post ? 'post' : 'get';
    const data = yield call(
      formSubmitFunction,
      keyState,
      options,
      method,
      false,
    );

    if (data && data.success && keyState) {
      yield put(nodeActions.updateDataApiRequestResults(data.result, keyState));
    }

    if (data && data.success && data.result && upsertNode) {
      yield put(actions.treeUpsertNodes(data.result, 'search'));
    }

    if ((!data || !data.success) && keyState) {
      yield put(nodeActions.updateDataApiRequestResults(null, keyState));
    }

    if (showMessage && data && data.message) {
      yield put(
        nodeActions.snackbar(data.success ? 'success' : 'error', data.message),
      );
    }

    yield call(setLoadingStatus, loadingStatuses.FINISHED);
  } catch (e) {
    yield call(setLoadingStatus, loadingStatuses.FINISHED);
    console.log(t1('network_request_error'));
  }
}

export default function* apiGetDataSaga() {
  yield takeEvery('API_GET_DATA_REQUEST', apiGetData);
}
