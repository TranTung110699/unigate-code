import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import isEqual from 'lodash.isequal';
import lodashGet from 'lodash.get';

class MUSelectField extends React.Component {
  cssClass = 'mu-select-field';

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
      nextOptions = nextOptions.filter((option) => option && option.value);
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
    const { input, transformValueOption } = props || this.props;
    const value = input && input.value;

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
    const { input, onChange, transformValueOption, options } = this.props;
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

    if (input && input.onChange) {
      input.onChange(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  getTextFromOption = (opt) => (opt && (opt.primaryText || opt.label)) || '';

  render() {
    const {
      className,
      input,
      label,
      meta: { touched, error },
      children,
      readOnly,
      options,
      renderedLabel,
      hiddenWhenOptionEmpty,
      transformValueOption,
      waringWhenOptionsIsEmpty,
      ...custom
    } = this.props;
    const { onBlur, ...inputProps } = input;
    const selection = options.find((item) => item.value === input.value);

    const selectionText = this.getTextFromOption(selection);
    let extraProps = {};
    let disabled = this.props.disabled;

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
        floatingLabelFixed: true,
        hintText: '',
        disabled,
      };
    }

    const values = this.getValue();

    const opts = {};
    if (renderedLabel)
      opts.selectionRenderer = (values, menuItems) => (
        <span>{renderedLabel}</span>
      );

    return !readOnly ? (
      <SelectField
        className={`${className || ''} ${this.cssClass}`}
        floatingLabelText={label}
        errorText={touched && error}
        {...inputProps}
        value={values}
        onBlur={() => onBlur(values)}
        onChange={(event, index, value) => this.handleOnChange(value)}
        {...custom}
        {...extraProps}
        {...opts}
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
              const checked = !!(
                Array.isArray(values) && values.includes(value)
              );

              return (
                <MenuItem
                  {...rest}
                  key={id || value}
                  value={value}
                  checked={checked}
                  primaryText={this.getTextFromOption(opt)}
                />
              );
            }
            return (
              <MenuItem
                {...rest}
                key={id || value}
                value={value}
                primaryText={this.getTextFromOption(opt)}
              />
            );
          })}
      </SelectField>
    ) : (
      <TextField
        className={`${className || ''} ${this.cssClass}`}
        floatingLabelText={label}
        errorText={touched && error}
        readOnly
        {...custom}
        value={selectionText}
        {...extraProps}
      />
    );
  }
}

MUSelectField.propTypes = {
  className: PropTypes.string,
};

MUSelectField.defaultProps = {
  className: '',
};

export default MUSelectField;
