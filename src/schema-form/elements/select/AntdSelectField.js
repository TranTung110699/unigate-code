import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import isEqual from 'lodash.isequal';
import './stylesheet.scss';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';
import lodashGet from 'lodash.get';
import { elementDisplayModes } from 'schema-form/constants';
import Help from '../Help';

const { Option } = Select;

const RecapSelect = ({ options, value, label }) => {
  options = options || [];
  value = typeof value === 'object' ? value : [value] || [];
  const recapContent = options
    .filter(
      (opt) =>
        lodashGet(opt, 'value') !== '' &&
        value.includes(lodashGet(opt, 'value')),
    )
    .map((opt) => lodashGet(opt, 'label'))
    .join(', ');

  if (!recapContent) {
    return null;
  }

  return <DefaultFormElementRecap label={label} content={recapContent} />;
};

const DefaultSelect = ({ options, values, props }) => {
  options = options || [];

  const getTextFromOption = (opt) =>
    (opt && (opt.primaryText || opt.label)) || '';

  const {
    className,
    readOnly,
    renderedLabel,
    hiddenWhenOptionEmpty,
    transformValueOption,
    waringWhenOptionsIsEmpty,
    multiple,
    floatingLabelText,
    onBlur,
    errorText,
    placeholder,
    guide,
  } = props;

  if (multiple) {
    values = values || [];
  }

  let { ...custom } = props;
  const selection = options.find((item) => item.value === values);

  const selectionText = getTextFromOption(selection);
  let extraProps = {};
  let disabled = props.disabled;

  if (!options || !options.length) {
    if (waringWhenOptionsIsEmpty) {
      return waringWhenOptionsIsEmpty;
    }
    if (hiddenWhenOptionEmpty) {
      return null;
    }
    disabled = true;
  }
  if (selectionText) {
    extraProps = {
      ...extraProps,
      hintText: '',
      disabled,
    };
  }
  const opts = {};
  if (renderedLabel)
    opts.selectionRenderer = (values, menuItems) => (
      <span>{renderedLabel}</span>
    );

  const label = guide ? (
    <span>
      {floatingLabelText} <Help guide={guide} />
    </span>
  ) : (
    floatingLabelText
  );
  return (
    <div
      className={`${className || ''} ${custom.fullWidth ? 'full-width' : ''}`}
    >
      <Form.Item
        validateStatus={errorText ? 'error' : ''}
        help={errorText || ''}
        className="ant-form-select-option"
        label={label}
        colon={false}
      >
        {!readOnly ? (
          <Select
            className="full-width"
            mode={multiple ? 'multiple' : 'default'}
            placeholder={placeholder}
            onBlur={() => onBlur(values)}
            onChange={(value) => this.handleOnChange(value)}
            {...custom}
            {...extraProps}
            {...opts}
            value={values}
            showArrow
          >
            {options &&
              options.length &&
              options.map((opt) => {
                const { children, id, primaryText, ...rest } = opt;
                const value =
                  typeof transformValueOption == 'function'
                    ? transformValueOption(rest.value)
                    : rest.value;
                if (custom.multiple) {
                  const checked = values.includes(value);
                  return (
                    <Option
                      {...rest}
                      key={id || value}
                      value={value}
                      checked={checked}
                      title={getTextFromOption(opt)}
                    >
                      {getTextFromOption(opt)}
                    </Option>
                  );
                }
                return (
                  <Option
                    {...rest}
                    key={id || value}
                    value={value}
                    title={getTextFromOption(opt)}
                  >
                    {getTextFromOption(opt)}
                  </Option>
                );
              })}
          </Select>
        ) : (
          <Select
            className={className || ''}
            {...custom}
            {...extraProps}
            onBlur={null}
            onChange={null}
            value={selectionText}
            showArrow={false}
            notFoundContent={null}
          />
        )}
      </Form.Item>
    </div>
  );
};

class AntdSelectField extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      options,
      populateValue,
      multiple,
      transformValueOption,
    } = this.props;
    let nextOptions = nextProps && nextProps.options;

    if (isEqual(options, nextOptions)) {
      return;
    }

    const value = this.getValue();

    if (populateValue && Array.isArray(nextOptions)) {
      nextOptions = nextOptions.filter(Boolean);
      if (nextOptions.length === 1 && nextOptions[0] && nextOptions[0].value) {
        let newValue = multiple ? [nextOptions[0].value] : nextOptions[0].value;
        if (typeof transformValueOption == 'function') {
          newValue = Array.isArray(newValue)
            ? [transformValueOption[newValue[0]]]
            : transformValueOption(newValue);
        }
        if (!isEqual(newValue, value)) {
          this.handleOnChange(newValue);
          return;
        }
      }
    }

    let selection = true;
    if (value && Array.isArray(value)) {
      value.forEach((val) => {
        selection = selection
          ? nextOptions.find((item) =>
              isEqual(
                typeof transformValueOption === 'function'
                  ? transformValueOption(item.value)
                  : item.value,
                val,
              ),
            )
          : selection;
      });
    } else if (value) {
      selection = nextOptions.find((item) =>
        isEqual(
          item &&
            (typeof transformValueOption === 'function'
              ? transformValueOption(item.value)
              : item.value),
          value,
        ),
      );
    }

    if (value && !selection) {
      this.handleOnChange(null);
    }
  }

  getValue = (props) => {
    const { value, transformValueOption } = props || this.props;

    if (
      !value ||
      !transformValueOption ||
      typeof transformValueOption !== 'function'
    ) {
      return value;
    } else if (Array.isArray(value)) {
      return value.map(transformValueOption);
    }
    return transformValueOption(value);
  };

  handleOnChange = (value) => {
    const { onChange, transformValueOption, options } = this.props;
    let newValue = value;

    if (
      typeof transformValueOption == 'function' &&
      value &&
      Array.isArray(options)
    ) {
      if (Array.isArray(newValue)) {
        newValue = options
          .map((option) => {
            if (value.includes(transformValueOption(option.value))) {
              return option.value;
            }
            return null;
          })
          .filter(Boolean);
      } else {
        const option = options.find((op) => {
          return isEqual(value, transformValueOption(op.value));
        });
        newValue = option ? option.value : null;
      }
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  render() {
    const { options, floatingLabelText, elementDisplayMode } = this.props;
    const values = this.getValue();

    if (elementDisplayMode === elementDisplayModes.RECAP) {
      return (
        <RecapSelect
          options={options}
          value={values}
          label={floatingLabelText}
        />
      );
    } else {
      return (
        <DefaultSelect options={options} values={values} props={this.props} />
      );
    }
  }
}

AntdSelectField.propTypes = {
  className: PropTypes.string,
};

export default makeReduxFormCompatible({})(AntdSelectField);
