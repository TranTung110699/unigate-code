import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'antd/lib/tooltip';
import Radio from 'antd/lib/radio';
import './stylesheet.scss';
import Form from 'antd/lib/form';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Icon from 'antd/lib/icon';
// import IconHelp from 'components/common/Icon/Help';
import Help from '../Help';

const RadioElement = ({
  className,
  radioButtonGroupClass,
  radioButtonClass,
  options,
  hintText,
  floatingLabelText,
  inline,
  readOnly,
  errorText,
  radioButtonStyle,
  label,
  onChange,
  value,
  ...rest
}) => {
  const componentClassName = `antd-radio-button ${className || ''}`;

  radioButtonStyle = radioButtonStyle || {};

  if (!inline) {
    radioButtonStyle = {
      ...radioButtonStyle,
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
  }

  label = floatingLabelText || hintText || label;

  const handleValueChange = React.useCallback(
    (event) => {
      if (typeof onChange === 'function') {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  return (
    <div className={componentClassName}>
      {label && (
        <div className={'input-text-label'}>
          <label>{label}</label>
        </div>
      )}
      <Form.Item
        validateStatus={errorText ? 'error' : ''}
        help={errorText || ''}
        className="m-b-0"
      >
        <Radio.Group
          {...rest}
          className={radioButtonGroupClass}
          onChange={handleValueChange}
          value={value}
        >
          {(options || []).map((opt) => (
            <Radio
              disabled={readOnly && opt.value !== value}
              className={radioButtonClass}
              style={radioButtonStyle}
              key={opt.value}
              value={opt.value}
            >
              {opt.label} <Help guide={opt.guide} />
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

RadioElement.propTypes = {
  className: PropTypes.string,
};

RadioElement.defaultProps = {
  className: '',
};

export default makeReduxFormCompatible({})(RadioElement);
