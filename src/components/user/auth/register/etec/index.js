import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { layouts } from 'configs/constants';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import '../../etec.scss';
import SocialAuth from '../../social-auth/SocialAuth';

class Index extends React.Component {
  divStyle = { display: 'flex', color: '#242c42' };
  divStyle1 = { marginBottom: '26px' };
  checkboxStyle = { width: '20px', display: 'inline', paddingTop: '0px' };
  checkboxLabelStyle = { color: '#242c42' };
  checkboxIconStyle = {
    fill: '#242c42',
    width: '16px',
    height: '16px',
    top: '3px',
    marginRight: '5px',
  };
  labelStyle = { cursor: 'pointer' };

  render() {
    const { doRegister, goToLogin, themeConfig } = this.props;
    const evnCssClass =
      themeConfig &&
      [layouts.SEABANK, layouts.EVN, layouts.MSI].includes(themeConfig.layout)
        ? 'evn-login-form'
        : '';
    return (
      <div className={`etec-login-form ${evnCssClass}`}>
        <h3>{t1('register')}</h3>
        <hr className="indicator" />
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
        <div className="remember-me-panel row" style={this.divStyle}>
          <Checkbox
            id="agree"
            style={this.checkboxStyle}
            labelStyle={this.checkboxLabelStyle}
            iconStyle={this.checkboxIconStyle}
            name="agree"
          />
          <label style={this.labelStyle} htmlFor="agree">
            {t1('agree_on')}
          </label>
          <a>
            &nbsp;
            {t1('terms_of_use')}
          </a>
        </div>
        <div className="row" style={this.divStyle1}>
          <a className="login-btn" onClick={doRegister}>
            {t1('register')}
          </a>
        </div>
        <SocialAuth />
        <div className="footer">
          {`${t1('do_you_already_have_an_account')}?`}
          &nbsp;
          <span onClick={goToLogin}>{t1('login')}</span>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  doRegister: PropTypes.func,
  goToLogin: PropTypes.func,
};

Index.defaultProps = {
  doRegister: null,
  goToLogin: null,
};

export default Index;
