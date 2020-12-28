import React from 'react';
import AntCheckbox from 'antd/lib/checkbox';
import lGet from 'lodash.get';
import Form from 'antd/lib/form';
import './stylesheet.scss';
import { elementDisplayModes } from 'schema-form/constants';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';
import Help from '../Help';

const CheckboxInRecapMode = ({ label, content, checked }) => {
  if (!checked) {
    return null;
  }
  if (!content) {
    return <DefaultFormElementRecap label={label} />;
  }
  return <DefaultFormElementRecap label={label} content={content} />;
};

const CheckboxInDefaultMode = ({
  touched,
  error,
  fullWidth,
  readOnly,
  onCheck,
  onChange,
  checked,
  style,
  label,
  floatingLabelText,
  guide,
  ...rest
}) => {
  const handleOnChange = (event, isChecked) => {
    if (typeof onChange === 'function') {
      onChange(isChecked);
    }
    if (typeof isChecked !== 'undefined' && typeof onCheck === 'function') {
      onCheck(event, isChecked);
    }
  };

  return (
    <Form.Item
      validateStatus={touched && error ? 'error' : ''}
      help={(touched && error) || null}
      style={{ display: !fullWidth ? 'inline-block' : 'block' }}
      className="ant-checkbox-mb-0 ant-checkbox-container"
    >
      <div className="input-text-label">
        <label>{floatingLabelText}</label>
      </div>
      <AntCheckbox
        {...rest}
        style={style}
        checked={checked}
        onChange={(event) => {
          handleOnChange(event, event.target.checked);
        }}
      >
        {label} <Help guide={guide} />
      </AntCheckbox>
    </Form.Item>
  );
};

class Checkbox extends React.Component {
  componentWillMount() {
    const { input, valueSet, checked } = this.props;
    let value = input && input.value;
    if (checked || value) {
      value = value || valueSet || 1;
      this.handleOnChange(null, value);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { checked, valueSet } = this.props;
    if (
      typeof checked !== 'undefined' &&
      nextProps &&
      typeof nextProps.checked !== 'undefined' &&
      checked !== nextProps.checked
    ) {
      const value = nextProps.checked ? valueSet || 1 : 0;
      this.handleOnChange(null, value);
    }
  }

  handleOnChange = (isChecked) => {
    const { input, readOnly } = this.props;
    if (readOnly) {
      return;
    }

    let { valueSet } = this.props;
    if (isChecked) {
      valueSet = valueSet || 1;
    } else {
      valueSet = 0;
    }

    if (input && typeof input.onChange === 'function') {
      input.onChange(valueSet);
    }
  };

  render() {
    let {
      input,
      readOnly,
      checked,
      onCheck,
      elementDisplayMode,
      label,
      floatingLabelText,
    } = this.props;

    const touched = lGet(this.props, 'meta.touched') || false;
    let error = lGet(this.props, 'meta.error') || undefined;

    if (input) {
      checked = !!(input && input.value);
    }

    switch (elementDisplayMode) {
      case elementDisplayModes.RECAP:
        if (floatingLabelText) {
          return (
            <CheckboxInRecapMode
              label={floatingLabelText}
              checked={checked}
              content={label}
            />
          );
        }
        return <CheckboxInRecapMode label={label} checked={checked} />;
      default:
        return (
          <CheckboxInDefaultMode
            {...this.props}
            touched={touched}
            error={error}
            readOnly={readOnly}
            onChange={this.handleOnChange}
            onCheck={onCheck}
            checked={checked}
            label={label}
            floatingLabelText={floatingLabelText}
          />
        );
    }
  }
}

export default Checkbox;
