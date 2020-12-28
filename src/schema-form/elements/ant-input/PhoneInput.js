import React from 'react';
import ContentInput from './ContentInput';
import { isPhoneNumber } from 'common/validators';

class PhoneInput extends React.Component {
  render() {
    const {
      className,
      value,
      onChange,
      errorText,
      shouldShowClearIcon,
      setRef,
      icon,
      floatingLabelText,
      cssClass,
      ...custom
    } = this.props;

    return (
      <ContentInput
        onChange={onChange}
        value={value}
        {...custom}
        floatingLabelFixed
        validate={[isPhoneNumber(errorText)]}
        errorText={errorText}
        className={`${cssClass}__input`}
        ref={(el) => {
          this.input = el;
          if (typeof setRef === 'function') {
            setRef(el);
          }
        }}
        floatingLabelText={floatingLabelText}
      />
    );
  }
}

export default PhoneInput;
