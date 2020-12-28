/**
 * Created by Peter Hoang Nguyen on 4/13/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { loginOAuthSuccessRequest } from 'actions/auth/saga-creators';
import { layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import './style.scss';
import { t1 } from 'translate';

class SocialAuth extends React.Component {
  style = { paddingLeft: 0, marginRight: -15, marginLeft: -15 };

  constructor(props) {
    super(props);
    this.state = {};
  }

  dispatchLogin = (type, token) => {
    const { dispatch, history, action, nextUrl } = this.props;
    const actionType = action || 'login';
    dispatch(
      loginOAuthSuccessRequest(
        type,
        token,
        undefined,
        history,
        actionType,
        nextUrl,
      ),
    );
  };

  responseGoogle = (response) => {
    this.dispatchLogin('google', response.tokenId);
  };

  responseFacebook = (response) => {
    this.dispatchLogin('facebook', response.accessToken);
  };

  render() {
    const {
      googleClientId,
      facebookAppId,
      themeConfig,
      enableRegisters,
      action,
      label,
    } = this.props;
    if (!enableRegisters) return '';
    let numberOfLoginOptions = 0;
    if (enableRegisters.includes('register_facebook') && facebookAppId)
      numberOfLoginOptions += 1;
    if (enableRegisters.includes('register_google') && googleClientId)
      numberOfLoginOptions += 1;
    if (numberOfLoginOptions === 0) return '';

    const actionType = action || 'login';

    if (themeConfig.layout !== layouts.XPEAK) {
      return (
        <div className="social-auth m-t-10 m-b-10">
          <div className="social-login-label text-center">
            <strong>{label || t1(`you_can_${actionType}_with`)}</strong>
          </div>
          <div
            className="center-block tools row social-login"
            style={this.style}
          >
            {facebookAppId &&
              enableRegisters &&
              enableRegisters.includes('register_facebook') && (
                <div className="social-login-item">
                  <FacebookLogin
                    appId={facebookAppId}
                    fields="name,email,picture"
                    textButton={<Icon type="facebook" />}
                    callback={this.responseFacebook}
                    cssClass="social-login-item-icon facebook"
                  />
                </div>
              )}
            {googleClientId &&
              enableRegisters &&
              enableRegisters.includes('register_google') && (
                <div className="social-login-item">
                  <GoogleLogin
                    clientId={googleClientId}
                    buttonText={<Icon type="google" />}
                    className="social-login-item-icon google"
                    onSuccess={this.responseGoogle}
                  />
                </div>
              )}
          </div>
        </div>
      );
    }

    return (
      <div className="center-block tools">
        {facebookAppId &&
          enableRegisters &&
          enableRegisters.includes('register_facebook') && (
            <FacebookLogin
              appId={facebookAppId}
              fields="name,email,picture"
              textButton=""
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
          )}
        {googleClientId &&
          enableRegisters &&
          enableRegisters.includes('register_google') && (
            <GoogleLogin
              clientId={googleClientId}
              buttonText={
                <i className="fa fa-google-plus" aria-hidden="true" />
              }
              className="another-login-icon googleplus"
              onSuccess={this.responseGoogle}
            />
          )}
      </div>
    );
  }
}

SocialAuth.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

SocialAuth.propTypes = {
  facebookAppId: PropTypes.string,
  googleClientId: PropTypes.string,
};

SocialAuth.defaultProps = {
  facebookAppId: '',
  googleClientId: '',
};

const mapStateToProps = (state, props) => {
  const conf = state.domainInfo.conf;
  const { themeConfig } = props;
  const appName = (themeConfig && themeConfig.layout) || 'pixelz';

  const facebookAppIdConfig = conf && conf['sso:facebook:app_id'];
  const facebookConfigByAppName =
    conf && conf['sso:facebook:config_by_app_name'];
  let facebookAppId =
    (facebookConfigByAppName &&
      facebookConfigByAppName[appName] &&
      facebookConfigByAppName[appName].app_id) ||
    facebookAppIdConfig;
  if (facebookAppId === 'none') {
    facebookAppId = null;
  }

  let googleClientId = conf && conf['sso:google:client_id'];
  if (googleClientId === 'none') {
    googleClientId = null;
  }

  return {
    googleClientId,
    facebookAppId,
    enableRegisters: conf && conf.enable_registers,
    themeConfig: getThemeConfig(state),
  };
};

export default withRouter(connect(mapStateToProps)(SocialAuth));
