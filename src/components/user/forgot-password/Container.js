import React from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import { reduxForm } from 'redux-form';
import { t1 } from 'translate';
import { layouts } from 'configs/constants';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import lGet from 'lodash.get';
import { forgotPassword } from '../forgot-password/actions/saga-creators';
import { isEmail, required } from 'common/validators';
import { Link } from 'react-router-dom';
import userLinks from '../../../routes/links/user';

class ForgotPasswordContainer extends React.Component {
  forgotPasswordAction = () => {
    const { dispatch, forgotPasswordForm } = this.props;
    dispatch(forgotPassword(forgotPasswordForm.values));
  };

  render() {
    const { themeConfig, schoolConfig } = this.props;
    const schoolName = lGet(schoolConfig, 'name', '');
    const style = {
      underlineStyle: {
        borderColor: themeConfig.layout === layouts.UMS ? '#e13542' : '#cecece',
      },
      floatingLabelStyle: {
        color: themeConfig.layout === layouts.UMS ? '#e13542' : '#cecece',
      },
    };
    return (
      <div className="container forgot-password-container">
        <div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <TextField
                fullWidth
                name="mail"
                floatingLabelText={t1('type_your_email')}
                className="text-field"
                floatingLabelFocusStyle={style.floatingLabelStyle}
                underlineFocusStyle={style.underlineStyle}
                validate={[required(), isEmail()]}
              />
            </div>
          </div>
          <div
            className={`forgot-password-btn ${
              themeConfig.layout === layouts.UMS
                ? 'ums-forgot-password-btn'
                : 'forgot-password-button'
            }`}
          >
            <button onClick={this.forgotPasswordAction}>
              {t1('send_password')}
            </button>
          </div>
          <div className="row text-center m-b-20">
            <Link to={userLinks.login}>{t1('login')}</Link>
          </div>
          <div>
            {t1(
              'when_you_click_the_forgot_password_button_the_system_will_send_the_instructions_on_how_to_reset_your_password_in_your_email',
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const user = state.user && state.user.info;

  return {
    user,
    forgotPasswordForm: state.form.forgotPassword,
    themeConfig: getThemeConfig(state),
    schoolConfig: lGet(state, 'domainInfo.school'),
  };
};

export default reduxForm({
  form: 'forgotPassword',
})(connect(mapStateToProps)(ForgotPasswordContainer));
