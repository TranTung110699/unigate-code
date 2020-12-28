/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import React from 'react';
import Store from 'store';
import getUser from 'common/auth';
import { checkAccessToWanDomain } from 'utils/WanVsInternet';
import { checkWanDomainIsEnabled } from 'common/conf';
import lGet from 'lodash.get';

let existTestWanImg = false;

class CommonURL {
  options = (userInfo = true) => {
    const user = getUser() || {};
    const maskedTeacher = getUser('maskedTeacher');

    let { info, ga } = user;
    info = info || {};
    ga = ga || {};

    let { domain } = Store.getState().domainInfo;
    const { conf } = Store.getState().domainInfo;
    //Get isWan from local storage
    let isWan = null;
    let isWanObject = JSON.parse(localStorage.getItem('isWanObject'));
    if (
      isWanObject &&
      isWanObject.test_wan_img === lGet(conf, 'test_wan_img') &&
      isWanObject.wan_domain_enabled === lGet(conf, 'wan_domain_enabled')
    ) {
      isWan = isWanObject.isWan;
    }

    if ((!isWanObject || isWan === null) && conf) {
      checkAccessToWanDomain(conf, function(exists) {
        existTestWanImg = exists;
      });

      isWan =
        (existTestWanImg &&
          checkWanDomainIsEnabled(Store.getState().domainInfo)) ||
        false;
      isWanObject = {
        isWan: isWan,
        test_wan_img: lGet(conf, 'test_wan_img'),
        wan_domain_enabled: lGet(conf, 'wan_domain_enabled'),
      };
      localStorage.setItem('isWanObject', JSON.stringify(isWanObject));
    }

    if (lGet(info, 'lname') === 'root' || lGet(info, 'code') === 'root') {
      domain = 'system';
    }

    const params = {
      submit: 1,
      _sand_ajax: 1,
      _sand_platform: 3,
      _sand_readmin: 1,
      _sand_is_wan: isWan,
      _sand_ga_sessionToken: ga.sessionToken || '',
      _sand_ga_browserToken: ga.browserToken || '',
      // _sand_ga_token: userInfo.ga_token,
      _sand_domain: domain || window.APP_SCHOOL,
      _sand_masked: maskedTeacher && maskedTeacher.info ? 1 : '',
    };

    if (userInfo) {
      params._sand_token = info.token;
      params._sand_uiid = info.iid;
      params._sand_uid = info.id;
    }

    return params;
  };

  appendObjectToURL(url, params) {
    if (!params) {
      return url;
    }

    const urlObj = new URL(url);
    Object.keys(params).forEach((key) =>
      urlObj.searchParams.append(key, params[key]),
    );
    return urlObj;
  }

  checkRequestSynchronize = (localUrl) => {
    const domainUrl =
      Store.getState().domainInfo.conf &&
      Store.getState().domainInfo.conf['synchronize:server_endpoint'];
    const synchronizeAllowedRequests =
      Store.getState().domainInfo.conf &&
      Store.getState().domainInfo.conf['synchronize:allowed_requests'];

    if (
      domainUrl &&
      synchronizeAllowedRequests &&
      synchronizeAllowedRequests.includes(localUrl)
    ) {
      return domainUrl;
    }
    return null;
  };

  getURL(url, params, headers) {
    let localUrl = url;
    let localParams = params;
    let localHeaders = headers;
    // console.log('Store', Store.getState());
    localParams = localParams || {};
    let userInfo = true;
    const domainUrl = this.checkRequestSynchronize(localUrl);
    if (domainUrl) {
      localUrl =
        domainUrl + (localUrl.startsWith('/') ? localUrl : `/${localUrl}`);
      userInfo = false;
    } else if (
      Object.prototype.hasOwnProperty.call(localParams, 'domainUrl') ||
      Object.prototype.hasOwnProperty.call(localParams, 'domain-url')
    ) {
      localUrl =
        localParams.domainUrl + localUrl.startsWith('/')
          ? localUrl
          : `/${localUrl}`;
      delete localParams.domainUrl;
    } else if (!localUrl.startsWith('http') && !localUrl.startsWith('https')) {
      localUrl =
        window.APP_SERVER_API_URL +
        (localUrl.startsWith('/') ? localUrl : `/${localUrl}`);
    }
    localParams = Object.assign({}, localParams, this.options(userInfo));

    if (!localHeaders) {
      localHeaders = {};
    }

    const myHeaders = new Headers();
    Object.keys(localHeaders).forEach((key) => {
      myHeaders.append(key, localHeaders[key]);
    });
    return {
      urlProcess: localUrl,
      allParams: localParams,
      headersData: myHeaders,
    };
  }

  createFrom(params, form) {
    let localForm = form;
    if (!localForm) {
      localForm = new FormData();
    }
    if (!params) {
      return localForm;
    }
    Object.keys(params).forEach((key) => {
      this.simplifyParams(localForm, key, params[key]);
    });
    return localForm;
  }

  simplifyParams(form, key, param) {
    // console.log(key, param);
    if (typeof param === 'undefined' || param === null) return;

    // console.log('param: ', param, typeof param);
    if (
      typeof param !== 'object' ||
      param instanceof File ||
      React.isValidElement(param)
    ) {
      form.append(key, param);
      // console.log('appending', key, param);
      return;
    }

    if (Array.isArray(param)) {
      param.forEach((value, i) => {
        this.simplifyParams(form, `${key}[${i}]`, value);
      });
    } else {
      Object.keys(param).forEach((subKey) => {
        this.simplifyParams(form, `${key}[${subKey}]`, param[subKey]);
      });
    }
  }
}

export default new CommonURL();
