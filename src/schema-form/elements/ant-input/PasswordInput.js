import React from 'react';
import Input from 'antd/lib/input';

class PasswordInput extends React.Component {
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
      placeholder,
      ...custom
    } = this.props;

    return (
      <Input.Password
        onChange={onChange}
        value={value}
        {...custom}
        className={`${cssClass}__input`}
        ref={(el) => {
          this.input = el;
          if (typeof setRef === 'function') {
            setRef(el);
          }
        }}
        placeholder={placeholder}
        allowClear={!!shouldShowClearIcon}
      />
    );
  }
}

export default PasswordInput;
