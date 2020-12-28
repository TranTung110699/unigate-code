import React from 'react';
import PropTypes from 'prop-types';
import { compareObjectWithoutType } from 'common';
import { getHighlightsClass } from 'utils/learn/Exam';

import './stylesheet.scss';

class SelectImage extends React.Component {
  divStyle = { color: 'red' };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { defaultValue, input } = this.props;
    if (!defaultValue) {
      return;
    }
    if (Array.isArray(defaultValue)) {
      defaultValue.map((value) => {
        this.dataChange(value);
      });
    } else {
      this.dataChange(defaultValue);
    }
  }

  getValueOfItem = (item, index) => {
    let { configs } = this.props;
    configs = configs || { label: 'label' };
    const { value } = configs;
    let itemValue;

    if (value && value === '@index') {
      itemValue = index;
    } else {
      itemValue = !value ? { ...item } : item[value];
    }
    return itemValue;
  };

  onSelect = (dataValue) => {
    const { multiple, resetHighlights, disabled } = this.props;
    if (disabled) {
      return;
    }
    if (this.isSelected(dataValue)) {
      const newValues = this.removeIndex(dataValue);
      if (!multiple) {
        this.dispatchDataChange(undefined, undefined);
      } else {
        this.dispatchDataChange(newValues);
      }

      return;
    }

    const values = this.props.input.value || [];

    this.dataChange([...values, dataValue]);
  };

  dataChange = (dataValue) => {
    const { resetHighlights } = this.props;
    this.dispatchDataChange(dataValue);

    if (resetHighlights) {
      resetHighlights();
    }
  };

  dispatchDataChange(newValue, newIndex) {
    const { input, onChange } = this.props;
    if (input) {
      input.onChange(newValue, newIndex);
    }
    if (onChange) {
      onChange(newValue, newIndex);
    }
  }

  removeIndex(valueToRemove) {
    const { input, configs } = this.props;
    const newValues = [];
    const values = input.value;
    const newSelectedIndexes = [];
    values.forEach((value, i) => {
      if (!configs.value) {
        if (!compareObjectWithoutType(valueToRemove, value)) {
          newValues.push(value);
        }
      } else if (value != valueToRemove) {
        newValues.push(value);
      } else {
        console.log(
          'value !== valueToRemove',
          value,
          valueToRemove,
          value !== valueToRemove,
        );
      }
    });

    return newValues;
  }

  getIndexByValue = (value, dataSource) => {
    let { options, configs } = this.props;
    if (dataSource) {
      options = dataSource;
    }
    configs = configs || { label: 'label' };
    if (!options || options.length === 0) {
      return -1;
    }
    for (let i = 0; i < options.length; i++) {
      if (!configs.value) {
        if (compareObjectWithoutType(options[i], value)) {
          return i;
        }
      } else if (options[i] == value) {
        return i;
      }
    }
    return -1;
  };

  isSelected(value) {
    const { input } = this.props;
    if (!input.value || value === undefined) {
      return false;
    }

    if (this.getIndexByValue(value, input.value) === -1) {
      return false;
    }
    return true;
  }

  getHighlightsClass(dataValue) {
    const { highlights } = this.props;
    return getHighlightsClass(highlights, dataValue);
  }

  render() {
    const { meta, activeClass, wrapperClass, data } = this.props;

    let { height, options, title, alt, avatar, label, configs } = this.props;

    configs = configs || { value: 'value', label: 'label' };

    const activeClazz = activeClass || 'selected';
    const wrapperClazz = wrapperClass || 'wrapper-class';
    options = options || data;

    return (
      <div className="touchable-component">
        {this.props.hintText}
        {meta && meta.touched && meta.error && (
          <div style={this.divStyle}>{meta.error}</div>
        )}

        <ul className={'content-panel'}>
          {options &&
            options.map((item, index) => {
              const value = this.getValueOfItem(item, index);
              return (
                <li
                  key={index}
                  className={
                    this.isSelected(value) ? activeClazz : wrapperClazz
                  }
                  onClick={() => {
                    this.onSelect(value);
                  }}
                >
                  {item[configs.label]}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const dataTypes = PropTypes.arrayOf(PropTypes.shape(PropTypes.any));

SelectImage.propTypes = {
  name: PropTypes.string,
  // data: dataTypes,
  // options: dataTypes,
  alt: PropTypes.string,
  activeClass: PropTypes.string,
  wrapperClass: PropTypes.string,
  // input: passed down from redux-form's Field
};
export default SelectImage;
