import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import NumericInput from './NumericInput';
import PhoneInput from './PhoneInput';
import PasswordInput from './PasswordInput';
import ContentInput from './ContentInput';
import './stylesheet.scss';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';
import { elementDisplayModes } from '../../constants';
import Help from '../Help';

const RecapInput = ({ value = '', label }) => {
  if (!value) {
    return null;
  } else {
    return <DefaultFormElementRecap label={label} content={value} />;
  }
};

class Input extends React.Component {
  cssClass = 'text-input-wrapper';

  getInputByType = (type) => {
    const { hintText } = this.props;

    let { ...custom } = this.props;
    if (hintText) {
      custom = { ...custom, placeholder: hintText };
    }

    let inputContent = '';
    switch (type) {
      case 'password': {
        inputContent = (
          <PasswordInput {...custom} className={`${this.cssClass}`} />
        );
        break;
      }
      case 'phone': {
        inputContent = (
          <PhoneInput {...custom} className={`${this.cssClass}`} />
        );
        break;
      }
      case 'number': {
        inputContent = (
          <NumericInput {...custom} className={`${this.cssClass}`} />
        );
        break;
      }
      default: {
        inputContent = (
          <ContentInput {...custom} className={`${this.cssClass}`} />
        );
        break;
      }
    }

    return inputContent;
  };

  render() {
    const {
      className,
      errorText,
      type,
      elementDisplayMode,
      value,
      guide,
      ...custom
    } = this.props;

    const componentClass = `${className || ''} ${this.cssClass} ${
      errorText ? `${this.cssClass}--error` : ''
    }`;

    if (elementDisplayMode === elementDisplayModes.RECAP) {
      return <RecapInput label={this.props.floatingLabelText} value={value} />;
    }

    const label =
      this.props.floatingLabelText || guide ? (
        <span>
          {this.props.floatingLabelText} <Help guide={guide} />
        </span>
      ) : null;
    return (
      <div className={componentClass}>
        <Form.Item
          validateStatus={errorText ? 'error' : ''}
          help={errorText || ''}
          className={custom.fullWidth && 'full-width'}
          colon={false}
          label={label}
        >
          {this.getInputByType(type)}
        </Form.Item>
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  shouldShowClearIcon: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  shouldShowClearIcon: false,
};

export default Input;
