import React from 'react';
import { isEmail, isPhoneNumber, required } from 'common/validators';
import { reduxForm } from 'redux-form';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1, t3 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import './stylesheet.scss';

class Form extends React.Component {
  cssClass = 'vieted-home-page-contact-form';
  color = '#717171';
  focusColor = '#FC8006';

  handleSubmit = (data) => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.newNodeRequest({
        ntype: 'contact',
        apiUrl: '/contact/new',
        data,
      }),
    );
  };

  render() {
    const { handleSubmit } = this.props;
    const title = t3('contact');
    const content = t1(
      'send_us_your_information_and_message,_we_will_contact_you_within_24_hours!',
    );

    const inputStyle =
      window.innerWidth > 480
        ? {
            inputStyle: { fontSize: '14px', color: this.color },
            floatingLabelStyle: { fontSize: '14px', color: this.color },
            floatingLabelShrinkStyle: { fontSize: '12px', color: this.color },
            underlineFocusStyle: { borderColor: this.focusColor },
          }
        : {
            inputStyle: { fontSize: '11px', color: this.color },
            floatingLabelStyle: { fontSize: '11px', color: this.color },
            floatingLabelShrinkStyle: { fontSize: '11px', color: this.color },
            errorStyle: { fontSize: '11px' },
            underlineFocusStyle: { borderColor: this.focusColor },
          };

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__title`}>{title}</div>
        <div className={`${this.cssClass}__content`}>{content}</div>
        <div className={`${this.cssClass}__inputs`}>
          <TextField
            className={`${this.cssClass}__input`}
            name="name"
            fullWidth
            floatingLabelText={t1('name')}
            validate={[required()]}
            {...inputStyle}
          />
          <TextField
            className={`${this.cssClass}__input`}
            name="email"
            fullWidth
            validate={[required(), isEmail()]}
            floatingLabelText={t1('email')}
            {...inputStyle}
          />
          <TextField
            className={`${this.cssClass}__input`}
            name="phone"
            fullWidth
            validate={[required(), isPhoneNumber()]}
            floatingLabelText={t1('phone')}
            {...inputStyle}
          />
          <TextField
            className={`${this.cssClass}__input`}
            name="website"
            fullWidth
            floatingLabelText={t1('website')}
            {...inputStyle}
          />
          <TextField
            className={`${this.cssClass}__input`}
            name="organization"
            fullWidth
            floatingLabelText={t1('organization')}
            {...inputStyle}
          />
          <TextField
            className={`${this.cssClass}__input ${this.cssClass}__message`}
            name="content"
            fullWidth
            validate={[required()]}
            multiLine
            floatingLabelText={t1('message')}
            {...inputStyle}
          />
        </div>
        <div className={`${this.cssClass}__buttons`}>
          <button
            className={`${this.cssClass}__button`}
            onClick={handleSubmit(this.handleSubmit)}
          >
            {t3('send')}
          </button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {};

Form.defaultProps = {};

export default reduxForm({
  form: 'vieted_home_page_contact',
})(Form);
