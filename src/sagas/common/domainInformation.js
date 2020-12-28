/**
 * Created by vohung on 06/06/2017.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import actions from 'actions/creators';
import { loginSuccess, logout } from 'actions/auth';
import errorCodes from 'common/errorCodes';
import { setLayout } from 'layouts/actions';

function* domainInfo(data) {
  const { hostname } = data;
  const url = apiUrls.get_information_by_domain;
  const post = yield call(Requester.post, url, { _sand_hostname: hostname });

  if (post && post.success && post.result) {
    const { userInfo, ...domainInformation } = post.result;
    if (userInfo) {
      yield put(loginSuccess(userInfo));
    }
    yield put(actions.saveInformationByDomain(domainInformation));

    yield put(
      setLayout(
        post.result &&
          post.result.school &&
          post.result.school.theme &&
          post.result.school.theme.layout,
      ),
    );
  } else if (post && !post.success) {
    if (post.err_code === errorCodes.ERR_SCHOOL_NOT_EXISTS) {
      // wrong domain, just redirect it
      window.location.assign(post.message);
    } else if (post.err === 1) {
      yield put(actions.saveInformationByDomain({ domain: 've' }));
      yield put(logout('/'));
    }
  } else {
    console.log('Failed');
  }
}

export default function* domainInfoSaga() {
  yield takeEvery('GET_INFORMATION_BY_DOMAIN_REQUEST', domainInfo);
}
