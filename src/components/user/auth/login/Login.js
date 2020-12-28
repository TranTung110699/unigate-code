import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthPanel from 'components/user/auth/AuthPanel';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import { layouts } from 'configs/constants';
import {
  activeLoginTab,
  activeRegisterTab,
  closeLoginDialog,
} from 'actions/auth/auth-dialog';
import { getRootUrl } from 'routes/links/common';
import EtecLogin from './etec/index';
import UmsLogin from './ums/index';
import GoJapanLogin from './gojapan';

import MobileSignIn from './mobile/index';
import userLinks from 'routes/links/user';

import '../stylesheet.scss';
import SocialAuth from '../social-auth/SocialAuth';
import LoginAction from './LoginAction';
import { parse } from 'query-string';
import lGet from 'lodash.get';
import nodeActions from '../../../../actions/node/creators';

class Login extends LoginAction {
  textFieldHintStyle = { padding: '6px 12px' };
  textFieldUnderlineStyle = { display: 'none' };
  checkboxLabelStyle = { color: '#9d9d9d' };
  checkboxIconStyle = { fill: '#9d9d9d' };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.doLogin();
    }
  };

  changePassword = () => {
    const { dispatch, history } = this.props;

    dispatch(closeLoginDialog());
    history.push(userLinks.forgot_password);
  };

  doLogin() {
    const { loginForm, themeConfig, dispatch, history, location } = this.props;
    const nextUrl = get(parse(location.search), 'next');

    this.doLoginAction(
      loginForm.values,
      themeConfig,
      dispatch,
      history,
      nextUrl,
    );
  }

  renderContent = (props) => {
    const {
      themeConfig,
      rootUrl,
      dispatch,
      enableRegisters,
      history,
      allowLoginByOperatingOrganization,
      location,
    } = props;

    const nextUrl =
      lGet(location, 'query.nextUrl', '') ||
      lGet(parse(location.search), 'next');

    let content = <div />;
    if (themeConfig.layout === layouts.XPEAK) {
      content = (
        <AuthPanel>
          <div className="ui-auth-panel">
            <div className="ui-auth-header">
              <div
                className="login-register-tab active"
                style={
                  !enableRegisters ||
                  !enableRegisters.includes('normal_register')
                    ? { width: '100%' }
                    : null
                }
              >
                {t1('login')}
              </div>
              {enableRegisters && enableRegisters.includes('normal_register') && (
                <div
                  className="login-register-tab"
                  onClick={() => {
                    dispatch(activeRegisterTab());
                  }}
                >
                  {t1('register')}
                </div>
              )}
            </div>

            <div className="login-register-area">
              <TextField
                fullWidth
                name="lname"
                floatingLabelText={`${t1('email')} / ${t1('code')}`}
                hintText={`${t1('email')} / ${t1('code')}`}
                onKeyPress={this.handleKeyPress}
              />
              <TextField
                type="password"
                fullWidth
                name="pass"
                floatingLabelText={t1('password')}
                hintText={t1('Password')}
                onKeyPress={this.handleKeyPress}
              />
              <div className="remember-me-panel ">
                <Checkbox
                  labelStyle={this.checkboxLabelStyle}
                  iconStyle={this.checkboxIconStyle}
                  name="remember_me"
                  label={t1('remember_me')}
                />
              </div>

              <div className="ui-button-group clearfix center-block">
                <div className="pull-left login-button-panel">
                  <div onClick={this.doLogin} className="login-btn">
                    {t1('login')}
                  </div>
                </div>
                <div className="pull-right">
                  <a onClick={this.changePassword} className="forgot-password">
                    {' '}
                    {t1('forgot_password')}?
                  </a>
                </div>
              </div>
              {enableRegisters &&
                (enableRegisters.includes('register_facebook') ||
                  enableRegisters.includes('register_google')) && (
                  <div className="another-login-tools-panel">
                    <div className="header clearfix">
                      <div className="center-block line-over">
                        <span>{t1('or_login_with')}</span>
                      </div>
                    </div>
                    <SocialAuth nextUrl={nextUrl} />
                  </div>
                )}
            </div>
          </div>
        </AuthPanel>
      );
    } else if (rootUrl === 'mobile') {
      content = (
        <MobileSignIn
          doLogin={() => {
            this.doLogin();
          }}
          changePassword={this.changePassword}
          handleKeyPress={this.handleKeyPress}
        />
      );
    } else if (themeConfig.layout === layouts.UMS) {
      content = (
        <UmsLogin
          doLogin={() => {
            this.doLogin();
          }}
          changePassword={this.changePassword}
          handleKeyPress={this.handleKeyPress}
        />
      );
    } else if (themeConfig.layout === layouts.GJ) {
      content = (
        <GoJapanLogin
          enableRegisters={enableRegisters}
          allowLoginByOperatingOrganization={allowLoginByOperatingOrganization}
          doLogin={() => {
            this.doLogin();
          }}
          changePassword={this.changePassword}
          handleKeyPress={this.handleKeyPress}
          goToRegister={() => {
            if (
              themeConfig.layout === layouts.VT ||
              themeConfig.layout === layouts.BLUE ||
              themeConfig.layout === layouts.HPU2 ||
              themeConfig.layout === layouts.GJ
            ) {
              history.push(
                `${userLinks.register}${nextUrl ? `?next=${nextUrl}` : ''}`,
              );
            } else {
              dispatch(activeRegisterTab());
            }
          }}
          themeConfig={themeConfig}
          nextUrl={nextUrl}
        />
      );
    } else {
      content = (
        <EtecLogin
          enableRegisters={enableRegisters}
          allowLoginByOperatingOrganization={allowLoginByOperatingOrganization}
          doLogin={() => {
            this.doLogin();
          }}
          changePassword={this.changePassword}
          handleKeyPress={this.handleKeyPress}
          goToRegister={() => {
            if (
              themeConfig.layout === layouts.VT ||
              themeConfig.layout === layouts.BLUE ||
              themeConfig.layout === layouts.HPU2
            ) {
              history.push(userLinks.register);
            } else {
              dispatch(activeRegisterTab());
            }
          }}
          themeConfig={themeConfig}
        />
      );
    }
    return content;
  };

  render() {
    return this.renderContent(this.props);
  }
}

Login.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};
const populateStateToProps = (state, props) => {
  const userInfo = state.user.info;
  return {
    rootUrl: getRootUrl(props),
    loginForm: state.form.login,
    userInfo,
    allowLoginByOperatingOrganization: get(
      state,
      'domainInfo.conf.allow_login_by_the_operating_organization',
    ),
    enableRegisters: get(state, 'domainInfo.conf.enable_registers'),
    themeConfig: getThemeConfig(state),
  };
};

export default connect(populateStateToProps)(
  reduxForm({
    form: 'login', // a unique identifier for this form
  })(withRouter(Login)),
);
