import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';

//import './stylesheet.scss';

class Index extends React.Component {
  render() {
    const { doLogin, changePassword, handleKeyPress } = this.props;
    const style = {
      underlineStyle: {
        borderColor: '#e13542',
      },
      floatingLabelStyle: {
        color: '#e13542',
      },
    };
    const cssClass = 'evn-login-form';
    return (
      <div className={`${cssClass}`}>
        <h3 className="title">{t1('login')}</h3>
        <TextField
          fullWidth
          name="lname"
          floatingLabelText={t1('account')}
          onKeyPress={handleKeyPress}
          className="text-field"
          floatingLabelFocusStyle={style.floatingLabelStyle}
          underlineFocusStyle={style.underlineStyle}
        />
        <TextField
          type="password"
          fullWidth
          name="pass"
          floatingLabelText={t1('pass')}
          onKeyPress={handleKeyPress}
          className="text-field"
          floatingLabelFocusStyle={style.floatingLabelStyle}
          underlineFocusStyle={style.underlineStyle}
        />
        <div className="action">
          <button className="btn" onClick={() => doLogin()}>
            {t1('login')}
          </button>
          <a onClick={changePassword} className="forgot-password">
            {' '}
            {t1('forgot_password')}?
          </a>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  doLogin: PropTypes.func,
  changePassword: PropTypes.func,
  handleKeyPress: PropTypes.func,
  goToRegister: PropTypes.func,
};

Index.defaultProps = {
  doLogin: null,
  changePassword: null,
  handleKeyPress: null,
  goToRegister: null,
};

export default Index;
