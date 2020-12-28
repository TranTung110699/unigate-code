/**
 * Created by hungvo on 23/09/17.
 */
import React, { Component } from 'react';
import TwoSideToggle from './TwoSideToggle';
import AntToggle from 'antd/lib/switch';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import lodashGet from 'lodash.get';
import { t } from 'translate';

class Toggle extends Component {
  spanStyle = { color: 'rgba(0, 0, 0, 0.3)' };
  handleOnToggle = (isInputChecked) => {
    const { onChange, dataSet } = this.props;
    const value = isInputChecked
      ? (dataSet && dataSet.on) || 1
      : (dataSet && dataSet.off) || 0;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { dataSet, label, twoSide, ...props } = this.props;
    let { toggled } = this.props;

    toggled = !!(
      (dataSet && dataSet.on && dataSet.on === toggled) ||
      (!dataSet && toggled === 1)
    );

    props.onChange = (isInputChecked) => {
      this.handleOnToggle(isInputChecked);
    };
    delete props.onBlur;

    if (twoSide) {
      let element = [<TwoSideToggle {...props} toggled={toggled} />];
      if (label) {
        element = [<span style={this.spanStyle}>{label}</span>].concat(element);
      }
      return element;
    }

    // mode = 'on' | 'off'
    const getLabel = (mode) => {
      return typeof label === 'undefined'
        ? t(mode)
        : typeof label === 'string'
        ? label
        : lodashGet(label, mode);
    };

    const labelDisplay = toggled ? getLabel('on') : getLabel('off');

    return (
      <div>
        <AntToggle {...props} checked={toggled} /> &nbsp;
        <label>{labelDisplay}</label>
      </div>
    );
  }
}

export default makeReduxFormCompatible({
  valueProp: 'toggled',
})(Toggle);
