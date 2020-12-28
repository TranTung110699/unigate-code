import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

class Text extends React.Component {
  cssClass = 'text-input';

  handleClearIconClick = (e) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(e, '');
      this.input.focus();
    }
  };

  inputStyleWithClearIcon = {
    paddingRight: 30,
  };

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
      ...custom
    } = this.props;

    const componentClass = `${className || ''} ${this.cssClass} ${
      errorText ? `${this.cssClass}--error` : ''
    }`;

    const inputStyle = shouldShowClearIcon
      ? this.inputStyleWithClearIcon
      : null;

    return (
      <div className={componentClass}>
        <TextField
          onChange={onChange}
          value={value}
          {...custom}
          inputStyle={inputStyle}
          errorText={errorText}
          className={`${this.cssClass}__input`}
          ref={(el) => {
            this.input = el;
            if (typeof setRef === 'function') {
              setRef(el);
            }
          }}
          floatingLabelText={floatingLabelText}
        />
        {typeof value !== 'undefined' &&
          (icon ||
            (shouldShowClearIcon && (
              <Icon
                className={`${this.cssClass}__clear-icon ${
                  floatingLabelText
                    ? `${this.cssClass}__clear-icon--has-floating-label`
                    : ''
                }`}
                icon="clear"
                onClick={this.handleClearIconClick}
              />
            )))}
      </div>
    );
  }
}

Text.propTypes = {
  className: PropTypes.string,
  shouldShowClearIcon: PropTypes.bool,
};

Text.defaultProps = {
  className: '',
  shouldShowClearIcon: false,
};

export default Text;
