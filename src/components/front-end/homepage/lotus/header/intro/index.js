import React from 'react';
import { change, reduxForm } from 'redux-form';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1, t2, t3 } from 'translate';
import './stylesheet.scss';

class Intro extends React.Component {
  textFieldInputStyle = { fontSize: '16px', color: '#FFFFF' };
  textFieldStyle = { maxWidth: 390 };
  cssClass = 'lotus-home-page-intro';

  focusColor = '#FC8006';
  color = '#FFFFFF';

  handleEmailChange = (value) => {
    const { dispatch } = this.props;
    dispatch(change('vieted_home_page_contact', 'email', value));
  };

  render() {
    const title = t2('teach_smart_learn_easy');
    const content = '';

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__title`}>{title}</div>
        {content && (
          <div className={`${this.cssClass}__content`}>{content}</div>
        )}
        <div className={`${this.cssClass}__inputs`}>
          <TextField
            inputStyle={this.textFieldInputStyle}
            floatingLabelStyle={{ color: this.color }}
            floatingLabelShrinkStyle={{ fontSize: '12px', color: this.color }}
            underlineFocusStyle={{ borderColor: this.focusColor }}
            className={`${this.cssClass}__mail`}
            style={this.textFieldStyle}
            fullWidth
            name="email"
            onChange={this.handleEmailChange}
            floatingLabelText={t1('your_email')}
          />
        </div>
        <div className={`${this.cssClass}__buttons`}>
          <a className={`${this.cssClass}__button`} href="/#contact">
            {t3('request_live_demo')}
          </a>
        </div>
      </div>
    );
  }
}

Intro.propTypes = {};

Intro.defaultProps = {};

export default reduxForm({
  form: 'lotus_home_page_intro',
})(Intro);
