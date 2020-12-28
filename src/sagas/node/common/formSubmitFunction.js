import { call, put, select } from 'redux-saga/effects';
import { getFormValues, startSubmit, stopSubmit, submit } from 'redux-form';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/creators';
import { t1 } from 'translate';

export default function* formSubmit(
  formid,
  options,
  method,
  showSnackbar = true,
) {
  try {
    const {
      executeOnSuccess,
      executeOnFailure,
      closeModal,
      modalKey,
      extraParams,
      formidToSubmitOnSuccess,
      successMessage,
      failureMessage,
      params,
      hideMessage,
    } = options;
    let { url } = options;

    url = url || apiUrls[formid];

    const formValues = formid ? yield select(getFormValues(formid)) : {};
    let submittedParams = Object.assign({}, formValues, params, extraParams);

    const req =
      typeof method === 'string'
        ? Requester[method.toLowerCase()]
        : Requester.post;

    if (formid) {
      yield put(startSubmit(formid));
    }

    const post = yield call(req, url, submittedParams);

    if (post && post.success) {
      // success
      if (formidToSubmitOnSuccess) {
        yield put(submit(formidToSubmitOnSuccess));
      }
      if (closeModal) {
        yield put(actions.handleOpenDialog({ openDialog: false }, modalKey));
      }
      if (executeOnSuccess) {
        yield call(executeOnSuccess, post);
      }

      let message = '';
      if (successMessage) {
        message = successMessage;
      } else if (post.message) {
        message = post.message;
      } else {
        message = t1('request_successfully');
      }

      if (showSnackbar && !hideMessage)
        yield put(actions.snackbar(true, message));
    } else {
      // failed
      if (executeOnFailure) {
        yield call(executeOnFailure, post);
      }

      let message = '';
      if (failureMessage) {
        message = failureMessage;
      } else if (post && post.message) {
        message = post.message;
      } else {
        message = t1('request_failed');
      }

      if (showSnackbar && !hideMessage)
        yield put(actions.snackbar(true, message));
    }

    if (formid) {
      yield put(stopSubmit(formid));
    }
    return post;
  } catch (ex) {
    console.log(ex);
    return ex;
  }
}
