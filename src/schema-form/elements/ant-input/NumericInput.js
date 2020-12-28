import React from 'react';
import InputNumber from 'antd/lib/input-number';

import './stylesheet.scss';

class NumericInput extends React.Component {
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
      <InputNumber
        onChange={onChange}
        value={value}
        {...custom}
        className={`${cssClass}__input ${custom.fullWidth && 'full-width'}`}
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

export default NumericInput;
