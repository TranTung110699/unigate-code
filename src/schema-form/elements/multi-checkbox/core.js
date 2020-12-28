/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
// import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';
import Checkbox from 'schema-form/elements/checkbox';
import { t1 } from 'translate';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';

class MultiCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillMount() {
    const { value } = this.props;
    const defaultValue = value || this.props.defaultValue;
    if (defaultValue && defaultValue.length) {
      this.handleOnChange(defaultValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    const inputValue = this.props.value || this.state.value || [];
    const { populateValue } = this.props;
    const valueOptions =
      Array.isArray(this.props.options) &&
      this.props.options.map((option) => option.value);
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
    const { onChange, maximum, dispatch } = this.props;
    if (value && value.length > maximum) {
      dispatch(
        actions.snackbar(
          true,
          t1('you_cannot_select_more_than_%s_items', [maximum]),
        ),
      );
      return;
    }

    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  };

  getValueCheckBoxByOptions = () => {
    const options = this.props.options || [];

    if (Array.isArray(options) && options.length) {
      return (
        options
          .map((option) => option && option.value)
          .filter((val) => typeof val !== 'undefined') || []
      );
    }

    return [];
  };

  getPropsCheckAll = () => {
    const inputValue = this.props.value || this.state.value || [];
    const optionValues = this.getValueCheckBoxByOptions();
    const checked =
      Array.isArray(inputValue) &&
      inputValue.length &&
      isEqual(inputValue.sort(), optionValues.sort());

    return {
      checked,
      onCheck: (event, isInputCheckbox) => {
        this.handleOnChange(isInputCheckbox ? optionValues : []);
      },
    };
  };

  renderOptions = () => {
    const {
      readOnly,
      disabled,
      iconStyle,
      value,
      inline,
      options,
      renderCustomizableOptions,
    } = this.props;

    const inputValue = value || this.state.value || [];
    const optionValues = this.getValueCheckBoxByOptions();

    const optionsRender = options.map(({ full_data, ...option }, index) => ({
      readOnly: typeof readOnly !== 'undefined' ? readOnly : option.readOnly,
      disabled: typeof disabled !== 'undefined' ? disabled : option.disabled,
      type: 'checkbox',
      value: option.value,
      checked:
        Array.isArray(inputValue) &&
        inputValue.includes(option && option.value),
      label: option.label,
      full_data,
      onCheck: (event, isInputChecked) => {
        const newValue = [...inputValue];
        if (isInputChecked) {
          newValue.push(option.value);
        } else {
          newValue.splice(newValue.indexOf(option.value), 1);
        }

        this.handleOnChange(
          optionValues.filter((map) => newValue.includes(map)),
        );
      },
    }));

    if (typeof renderCustomizableOptions === 'function') {
      return renderCustomizableOptions(optionsRender, this.getPropsCheckAll);
    }

    const checkBoxStyle = this.props.inline
      ? { padding: 0, display: 'inline-block', width: 'auto' }
      : { padding: 0, display: 'flex', width: 'auto' };
    const labelStyle =
      this.props.labelStyle || this.props.inline
        ? { width: 'max-content', marginRight: 30 }
        : {};

    return (
      <div
        style={inline ? { paddingTop: '15px', display: 'inline-block' } : {}}
      >
        {optionsRender.map((option) => (
          <Checkbox
            {...option}
            iconStyle={iconStyle}
            labelStyle={labelStyle}
            style={checkBoxStyle}
            key={option.value}
          />
        ))}
      </div>
    );
  };

  render() {
    const {
      floatingLabelText,
      required,
      name,
      options,
      errorText,
      checkAll,
      hiddenWhenOptionEmpty,
    } = this.props;

    if (hiddenWhenOptionEmpty && (!Array.isArray(options) || !options.length)) {
      return null;
    }

    return (
      <div id={name}>
        <div>
          {checkAll ? (
            <Checkbox
              {...this.getPropsCheckAll()}
              label={floatingLabelText}
              labelPosition="left"
              title={t1('check_all')}
            />
          ) : (
            floatingLabelText
          )}
          {/*{required && <span> (*)</span>}*/}
        </div>
        {errorText && <div style={{ color: 'red' }}>{errorText}</div>}
        {Array.isArray(options) && this.renderOptions()}
      </div>
    );
  }
}

export default connect()(MultiCheckbox);
