import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Radio extends React.Component {
  cssClass = 'radio-element';

  handleValueChange = (event, value) => {
    const { onChange, input } = this.props;
    if (input) {
      input.onChange(value);
    }
    if (typeof onChange === 'function') {
      onChange(event, value);
    }
  };

  getValue = () => {
    const { input, value } = this.props;
    if (typeof value !== 'undefined') {
      return value;
    }
    return input && input.value;
  };

  render() {
    const {
      className,
      radioButtonGroupClass,
      radioButtonClass,
      options,
      hintText,
      floatingLabelText,
      inline,
      readOnly,
      ...rest
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    const radioButtonStyle = this.props.radioButtonStyle || {};
    const labelStyle = this.props.labelStyle || {};

    if (inline) {
      radioButtonStyle.display = 'inline-block';
      radioButtonStyle.width = 'auto';
      radioButtonStyle.marginRight = '15px';

      labelStyle.width = 'max-content';
    }

    const label = hintText || floatingLabelText;

    return (
      <div className={componentClassName}>
        {label && <p className="text-muted">{label}</p>}
        <RadioButtonGroup
          {...rest}
          className={radioButtonGroupClass}
          onChange={this.handleValueChange}
          valueSelected={this.getValue()}
          style={radioButtonStyle}
        >
          {options.map((opt) => (
            <RadioButton
              disabled={readOnly && opt.value !== this.getValue()}
              className={radioButtonClass}
              style={radioButtonStyle}
              labelStyle={labelStyle}
              key={opt.value}
              value={opt.value}
              label={opt.label}
            />
          ))}
        </RadioButtonGroup>
      </div>
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
};

Radio.defaultProps = {
  className: '',
};

export default Radio;
