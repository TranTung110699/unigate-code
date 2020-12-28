import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import { Link } from 'react-router-dom';
import '../../etec.scss';
import SocialAuth from '../../social-auth/SocialAuth';
import { getMobileUrl } from 'routes/links/common';

class MobileLogin extends React.Component {
  divStyle = { margin: 0, padding: 0 };
  checkboxLabelStyle = { color: '#242c42' };
  checkboxIconStyle = {
    fill: '#242c42',
    width: '15px',
    height: '15px',
    top: '2px',
    marginRight: '5px',
  };

  render() {
    const { doLogin, changePassword, handleKeyPress } = this.props;
    const style = {
      underlineStyle: {
        borderTop: 'none #8fdd2d !important',
        borderLeft: 'none #8fdd2d !important',
        borderRight: 'none #8fdd2d !important',
        borderBottom: '2px solid #8fdd2d !important',
      },
    };
    return (
      <div className="etec-login-form">
        <h3>{t1('login')}</h3>
        <hr className="indicator" />
        <div className="row" style={this.divStyle}>
          <TextField
            fullWidth
            name="lname"
            floatingLabelText={t1('account')}
            onKeyPress={handleKeyPress}
            underlineStyle={style.underlineStyle}
          />
        </div>
        <div className="row" style={this.divStyle}>
          <TextField
            type="password"
            fullWidth
            name="pass"
            floatingLabelText={t1('pass')}
            onKeyPress={handleKeyPress}
            underlineStyle={style.underlineStyle}
          />
        </div>
        <div className="remember-me-panel row">
          <Checkbox
            labelStyle={this.checkboxLabelStyle}
            iconStyle={this.checkboxIconStyle}
            name="remember_me"
            label={t1('remember_me')}
          />
        </div>
        <div className="row">
          <a className="login-btn" onClick={() => doLogin()}>
            {t1('login')}
          </a>
        </div>
        <div className="row are-you-forgot-pass">
          <Link
            to={getMobileUrl('forgot-password')}
            className="forgot-password"
          >
            {' '}
            {t1('forgot_password')}?
          </Link>
        </div>
        <SocialAuth />

        <div className="footer">
          {`${t1('you_do_not_have_an_account_yet')}?`}
          &nbsp;
          <Link to="/mobile/sign-up">{t1('register')}</Link>
        </div>
      </div>
    );
  }
}

MobileLogin.propTypes = {
  doLogin: PropTypes.func,
  changePassword: PropTypes.func,
  handleKeyPress: PropTypes.func,
  goToRegister: PropTypes.func,
};

MobileLogin.defaultProps = {
  doLogin: null,
  changePassword: null,
  handleKeyPress: null,
  goToRegister: null,
};

export default MobileLogin;
