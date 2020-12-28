/**
 * Created by hungvo on 22/08/17.
 */
import React, { Component } from 'react';
import MUCheckBox from 'material-ui/Checkbox';
import IconChecked from 'material-ui/svg-icons/navigation/check';
import IconUnChecked from 'material-ui/svg-icons/content/clear';

class CollapserField extends Component {
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

  handleOnChange = (event, value) => {
    const { input } = this.props;
    if (input && typeof input.onChange === 'function') {
      input.onChange(value);
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

    return (
      <span>asdf</span>
    );
  }
}

export default CollapserField;
