import React, { Component } from 'react';
import Checkbox from 'antd/lib/checkbox';
import { t1 } from 'translate';
import isEqual from 'lodash.isequal';
import Form from 'antd/lib/form';
import './stylesheet.scss';
import { elementDisplayModes } from 'schema-form/constants';
import lodashGet from 'lodash.get';
import withSnackbar from 'common/hoc/withSnackbar';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';
import Help from '../Help';

const MultiCheckboxInRecapMode = ({ options, value, label }) => {
  options = options || [];
  value = value || [];

  const recapContent = options
    .filter((opt) => (value || []).includes(lodashGet(opt, 'value')))
    .map((opt) => lodashGet(opt, 'label'))
    .join(', ');

  if (!recapContent) {
    return null;
  }

  return <DefaultFormElementRecap label={label} content={recapContent} />;
};

const MultiCheckboxInDefaultMode = ({
  name,
  options,
  value,
  disabled,
  label,
  inline,
  checkAll,
  errorText,
  required,
  onChange,
}) => {
  options = options || [];
  value = value || [];

  const handleChange = (newValue) => {
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const getValueCheckBoxByOptions = () => {
    if (Array.isArray(options) && options.length) {
      return (
        options
          .map((option) => option && option.value)
          .filter((val) => typeof val !== 'undefined') || []
      );
    }

    return [];
  };

  const getPropsCheckAll = () => {
    const optionValues = getValueCheckBoxByOptions();
    const checked =
      Array.isArray(value) &&
      value.length &&
      isEqual(value.sort(), optionValues.sort());
    const indeterminate =
      Array.isArray(value) &&
      value.length &&
      value.length < optionValues.length;

    return {
      checked,
      indeterminate,
      onChange: (event) => {
        handleChange(event.target.checked ? optionValues : []);
      },
    };
  };

  const handleClickOption = (val) => {
    const optionValues = getValueCheckBoxByOptions();
    let newValue = [...value];
    if (val) newValue = val;

    handleChange(optionValues.filter((map) => newValue.includes(map)));
  };

  options.forEach((option, i) => {
    option.label = (
      <span>
        {option.label} <Help guide={option.guide} />
      </span>
    );
    options[i] = option;
  });
  return (
    <div id={name} className="ant-multi-checkbox">
      <Form.Item
        validateStatus={errorText ? 'error' : ''}
        help={errorText || ''}
        style={{ width: '100%' }}
      >
        <div>
          {checkAll ? (
            <Checkbox {...getPropsCheckAll()} label={t1('check_all')}>
              {t1('check_all')}
            </Checkbox>
          ) : (
            <div className={'input-text-label'}>
              <label>{label}</label>
            </div>
          )}
        </div>
        <Checkbox.Group
          options={options}
          value={value}
          onChange={handleClickOption}
          disabled={disabled}
          className={!inline && 'ant-checkbox-multiline'}
        />
      </Form.Item>
    </div>
  );
};

class MultiCheckbox extends Component {
  componentWillMount() {
    const { defaultValue } = this.props;
    if (defaultValue && defaultValue.length) {
      this.handleOnChange(defaultValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    const inputValue = this.props.value || [];
    const { populateValue, options } = this.props;
    const valueOptions =
      Array.isArray(options) && options.map((option) => option.value);
    const nextValueOptions =
      Array.isArray(nextProps.options) &&
      nextProps.options.map((option) => option.value);

    if (populateValue && !isEqual(valueOptions, nextValueOptions)) {
      this.handleOnChange(nextValueOptions);
    } else if (
      Array.isArray(valueOptions) &&
      valueOptions.length &&
      !isEqual(valueOptions, nextValueOptions) &&
      Array.isArray(inputValue) &&
      inputValue.length
    ) {
      this.handleOnChange([]);
    }
  }

  handleOnChange = (value) => {
    const { onChange, maximum, showSnackbar } = this.props;
    if (value && value.length > maximum) {
      showSnackbar(
        'error',
        t1('you_cannot_select_more_than_%s_items', [maximum]),
      );
      return;
    }

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {
      elementDisplayMode,
      floatingLabelText,
      required,
      name,
      options,
      errorText,
      checkAll,
      hiddenWhenOptionEmpty,
      disabled,
      inline,
      value,
    } = this.props;

    if (hiddenWhenOptionEmpty && (!Array.isArray(options) || !options.length)) {
      return null;
    }

    switch (elementDisplayMode) {
      case elementDisplayModes.RECAP:
        return (
          <MultiCheckboxInRecapMode
            options={options}
            value={value}
            label={floatingLabelText}
          />
        );
      default:
        return (
          <MultiCheckboxInDefaultMode
            options={options}
            value={value}
            label={floatingLabelText}
            checkAll={checkAll}
            disabled={disabled}
            errorText={errorText}
            inline={inline}
            name={name}
            required={required}
            onChange={this.handleOnChange}
          />
        );
    }
  }
}

export default withSnackbar()(MultiCheckbox);
