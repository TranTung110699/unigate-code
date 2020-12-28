import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import FlatButton from 'components/common/mui/FlatButton';
import AuthPanel from 'components/user/auth/AuthPanel';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import { loginSuccess } from 'actions/auth';
import {
  activeLoginTab,
  activeRegisterTab,
  closeLoginDialog,
} from 'actions/auth/auth-dialog';
import nodeActions from 'actions/node/creators';
import Request from 'common/network/http/Request';
import { layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import { getRootUrl } from 'routes/links/common';
import sagaActions from 'actions/saga-creators';

import '../stylesheet.scss';
import SocialAuth from '../social-auth/SocialAuth';
import EtecRegister from './etec/index';
import MobileRegister from './mobile/index';
import GJLoginForm from './gj';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 * */

class Register extends React.Component {
  checkboxLabelStyle = { color: '#9d9d9d' };
  checkboxIconStyle = { fill: '#9d9d9d' };
  checkboxStyle = { display: 'none', width: 'auto' };
  divStyle = { display: 'none' };

  constructor(props) {
    super(props);
    this.state = {};
    this.doRegister = this.doRegister.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(activeRegisterTab());
  }

  doRegister() {
    const { registerForm, dispatch, themeConfig } = this.props;
    // let data = Object.assign({},registerForm.values, {submit : 1});
    // Fetch.post("/user/register", data);
    // console.log(registerForm);
    if (
      themeConfig.layout === layouts.ETEC &&
      registerForm &&
      registerForm.values &&
      !registerForm.values.agree
    ) {
      console.log('agree', registerForm.values.agree);
      dispatch(
        nodeActions.snackbar(true, t1("the_register_fields_can't_be_empty")),
      );
      return;
    }

    if (
      registerForm.values /*&&
      registerForm.values.name &&
      registerForm.values.email &&
      registerForm.values.pass*/
    ) {
      const registerUrl = `${
        window.APP_SERVER_API_URL
      }/user/register?submit=1&&name=${registerForm.values.name}&pass=${
        registerForm.values.pass
      }&mail=${registerForm.values.email}`;

      Request.get(registerUrl)
        .then((response) => {
          if (response.success) {
            dispatch(
              sagaActions.getInformationByDomain(window.location.hostname),
            );
            dispatch(closeLoginDialog());
            dispatch(loginSuccess(response.result));
          } else {
            dispatch(nodeActions.snackbar(true, response.message));
          }
        })
        .catch((response) => {
          dispatch(nodeActions.snackbar(true, response.message));
        });
    } else {
      dispatch(
        nodeActions.snackbar(true, t1("the_register_fields_can't_be_empty")),
      );
    }

    // Request.post("/user/register", registerForm.values);
    // Request.post("/user/login", loginForm.values)
  }

  render() {
    const { dispatch, themeConfig, rootUrl } = this.props;
    if (rootUrl === 'mobile') {
      return <MobileRegister doRegister={this.doRegister} />;
    }

    if (themeConfig.layout === layouts.GJ) {
      return (
        <GJLoginForm
          doRegister={this.doRegister}
          goToLogin={() => {
            dispatch(activeLoginTab());
          }}
          themeConfig={themeConfig}
        />
      );
    }

    if (themeConfig.layout !== layouts.XPEAK) {
      return (
        <EtecRegister
          doRegister={this.doRegister}
          goToLogin={() => {
            dispatch(activeLoginTab());
          }}
          themeConfig={themeConfig}
        />
      );
    }

    return (
      <AuthPanel>
        <div className="ui-auth-panel">
          <div className="ui-auth-header">
            <div
              className="login-register-tab"
              onClick={() => {
                dispatch(activeLoginTab());
              }}
            >
              {t1('login')}
            </div>
            <div className="login-register-tab active">{t1('register')}</div>
          </div>

          <div className="login-register-area">
            <TextField
              fullWidth
              name="name"
              hintText={t1('fullname')}
              floatingLabelText={t1('fullname')}
            />

            <TextField
              fullWidth
              name="email"
              hintText={t1('email')}
              floatingLabelText={t1('email')}
            />

            <TextField
              type="password"
              fullWidth
              name="pass"
              hintText={t1('password')}
              floatingLabelText={t1('password')}
            />

            <div className="terms-and-conditions clearfix">
              <div className="pull-left">
                <Checkbox
                  labelStyle={this.checkboxLabelStyle}
                  iconStyle={this.checkboxIconStyle}
                  style={this.checkboxStyle}
                  name="remember_me"
                />
              </div>
              <div className="pull-left text-link" style={this.divStyle}>
                {t1('agree_with')}
                <FlatButton href="#"> {t1('terms')}</FlatButton>
                {' & '}
                <FlatButton href="#"> {t1('conditions')}</FlatButton>
              </div>
            </div>

            <div className="ui-button-group clearfix text-center">
              <div className="login-button-panel">
                <div onClick={this.doRegister} className="register-btn">
                  {t1('register')}
                </div>
              </div>
            </div>
            <div className="another-register-tools-panel">
              <div className="header clearfix">
                <div className="center-block line-over">
                  <span>{t1('or_register_with')}</span>
                </div>
              </div>
              <SocialAuth />
            </div>
          </div>
        </div>
      </AuthPanel>
    );
  }
}

const populateStateToProps = (state, props) => ({
  registerForm: state.form.register,
  themeConfig: getThemeConfig(state),
  rootUrl: getRootUrl(props),
});

Register.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

const RegisterForm = reduxForm({
  form: 'register', // a unique identifier for this form
})(Register);

export default connect(populateStateToProps)(RegisterForm);
