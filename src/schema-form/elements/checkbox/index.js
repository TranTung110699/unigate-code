/**
 * Created by hungvo on 22/08/17.
 */
import React, { Component } from 'react';
import MUCheckBox from 'material-ui/Checkbox';
import IconChecked from 'material-ui/svg-icons/navigation/check';
import IconUnChecked from 'material-ui/svg-icons/content/clear';
import lGet from 'lodash.get';
const styles = {
  error: {
    color: 'red',
    fontSize: 'small',
  },
};

class Checkbox extends Component {
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

  handleOnChange = (event, value, isChecked) => {
    const { input, onCheck } = this.props;
    if (input && typeof input.onChange === 'function') {
      input.onChange(value);
    }
    if (typeof isChecked !== 'undefined' && onCheck) {
      onCheck(event, isChecked);
    }
  };

  render() {
    let {
      input,
      valueSet,
      readOnly,
      labelStyle,
      iconStyle,
      checkedIcon,
      uncheckedIcon,
      checked,
      style,
      ...props
    } = this.props;
    const touched = lGet(this.props, 'meta.touched') || false;
    const error = lGet(this.props, 'meta.error') || undefined;

    if (input) {
      checked = !!(input && input.value);
    }

    if (readOnly) {
      checkedIcon = <IconChecked />;
      uncheckedIcon = <IconUnChecked />;
      if (!checked) {
        iconStyle = {
          fill: 'rgba(0, 0, 0, 0.3)',
        };
        labelStyle = {
          color: 'rgba(0, 0, 0, 0.3)',
        };
      }
    }

    let appliedStyle = {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 10,
      paddingTop: 10,
    };

    if (style) {
      appliedStyle = {
        ...appliedStyle,
        ...style,
      };
    }

    return [
      <MUCheckBox
        {...props}
        style={appliedStyle}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        labelStyle={labelStyle}
        iconStyle={iconStyle}
        checked={checked}
        onCheck={(event, isInputChecked) => {
          if (readOnly) {
            return;
          }
          if (isInputChecked) {
            valueSet = valueSet || 1;
          } else {
            valueSet = 0;
          }
          this.handleOnChange(event, valueSet, isInputChecked);
        }}
      />,
      //TODO: Hiện tại mới chỉ show được error khi click submit form khi chưa click vào checkbox, nếu đã click vào checkbox thì touched luôn = false và error luôn bằng undefined, https://github.com/erikras/redux-form/issues/3330
      <span>
        {touched && error && <span style={styles.error}>{error}</span>}
      </span>,
    ];
  }
}

export default Checkbox;
