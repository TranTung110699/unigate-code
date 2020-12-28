import React from 'react';
import './stylesheet.scss';
import AntInput from 'antd/lib/input';

class ContentInput extends React.Component {
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
      hintText,
      multiLine,
      rows,
      rowsMax,
      elementDisplayMode,
      ...custom
    } = this.props;
    return !multiLine ? (
      <AntInput
        onChange={onChange}
        value={value}
        {...custom}
        ref={(el) => {
          this.input = el;
          if (typeof setRef === 'function') {
            setRef(el);
          }
        }}
        placeholder={placeholder}
        allowClear={!!shouldShowClearIcon}
        suffix={icon || ''}
      />
    ) : (
      <AntInput.TextArea
        onChange={onChange}
        value={value}
        {...custom}
        ref={(el) => {
          this.input = el;
          if (typeof setRef === 'function') {
            setRef(el);
          }
        }}
        placeholder={placeholder}
        allowClear={!!shouldShowClearIcon}
        suffix={icon || ''}
        autosize={{ minRows: rows || 4, maxRows: rowsMax || 10 }}
      />
    );
  }
}

export default ContentInput;
