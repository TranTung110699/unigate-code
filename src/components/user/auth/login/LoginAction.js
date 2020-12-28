import React from 'react';
import { t1 } from 'translate';
import Request from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { layouts } from 'configs/constants';
import { closeLoginDialog } from 'actions/auth/auth-dialog';
import { loginSuccess } from 'actions/auth';
import sagaActions from 'actions/saga-creators';

import '../stylesheet.scss';
import { getDashboardUrl } from '../../../../routes/links/common';

class LoginAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.doLoginAction = this.doLoginAction.bind(this);
  }

  doLoginAction(values, themeConfig, dispatch, history, nextUrl) {
    // const contentDialog = <ViettelNoti />;

    if (values && values.lname && values.pass) {
      Request.post('/user/login', values)
        .then((response) => {
          if (response.success) {
            dispatch(loginSuccess(response.result));
            dispatch(
              sagaActions.getInformationByDomain(window.location.hostname),
            );
            dispatch(closeLoginDialog());
            if (nextUrl) {
              history.push(nextUrl);
            } else if (themeConfig.layout === layouts.UMS) {
              history.push('/');
            } else if (window.isGoJapan) {
              if (this.props.nextUrl) {
                history.push(this.props.nextUrl);
              } else {
                history.push(getDashboardUrl('courses'));
              }
            } else history.push('/dashboard');
          } else {
            dispatch(nodeActions.snackbar('error', response.message));
          }
        })
        .catch((response) => {
          dispatch(nodeActions.snackbar('error', response.message));
        });
    } else {
      dispatch(
        nodeActions.snackbar('error', t1("the_login_fields_can't_be_empty")),
      );
    }
  }
}

export default LoginAction;
