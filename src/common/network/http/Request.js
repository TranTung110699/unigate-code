/**
 * Created by Peter Hoang Nguyen on 4/2/2017.
 */
import axios from 'axios';
import Store from 'store';
import actions from 'actions/node/creators';
import errorCodes from 'common/errorCodes';
import common from './Common';
import { logout } from 'actions/auth';
import { sessionExpired } from 'actions/auth';

const PROGRESS_PROCESS = 0.8;

const sessionCheckAction = (data = {}) => {
  const { err, err_code } = data;

  if (err && err_code === 402) {
    Store.dispatch(sessionExpired(true));
    return;
  }
};

const checkGoogleAuthenticatorError = (ret) => {
  const errorCode = ret.err_code;

  switch (errorCode) {
    case errorCodes.ERR_GA_REQUIRED:
    case errorCodes.ERR_GA_SETUP_REQUIRED:
      Store.dispatch(actions.handleGoogleAuthenticatorDialog(errorCode));

      break;
    case errorCodes.ERR_AUTHENTICATE_FAILED:
      Store.dispatch(logout());

      break;
  }
};
axios.interceptors.request.use(
  (config) =>
    // console.log("before request: success", config);
    config,
  (error) =>
    // console.log("before request: not success");
    Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) =>
    // Do something with response data
    // console.log("response: success");
    response,
  (error) =>
    // Do something with response error
    // console.log("response: not success");
    Promise.reject(error),
);

class Request {
  constructor() {
    //Init cancelToken. Note: Must create cancel token for each request
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  get(url, params) {
    const { urlProcess, allParams } = common.getURL(url, params);
    if (window.NProgress) {
      window.NProgress.start();
      window.NProgress.set(PROGRESS_PROCESS);
    }
    return axios
      .get(urlProcess, {
        params: allParams,
      })
      .then((response) => {
        const ret = response.data;
        if (!ret.success) checkGoogleAuthenticatorError(ret);
        if (window.NProgress) {
          window.NProgress.done();
        }
        sessionCheckAction(ret);
        return ret;
      })
      .catch((error) => {
        if (window.NProgress) {
          window.NProgress.done();
        }
      });
  }

  post(url, params, config, showProgress = true) {
    const { urlProcess, allParams } = common.getURL(url, params);
    const formPost = common.createFrom(allParams);
    if (showProgress && window.NProgress) {
      window.NProgress.start();
      window.NProgress.set(PROGRESS_PROCESS);
    }
    return axios
      .post(urlProcess, formPost, config)
      .then((response) => {
        const ret = response.data;
        if (!ret.success) checkGoogleAuthenticatorError(ret);
        if (window.NProgress) {
          window.NProgress.done();
        }
        sessionCheckAction(ret);

        return ret;
      })
      .catch((error) => {
        if (window.NProgress) {
          window.NProgress.done();
        }
      });
  }

  //Cancel request by token request
  actionCancel() {
    this.source.cancel('Operation canceled by the user.');
  }
}

export default new Request();
