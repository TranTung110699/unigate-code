import React from 'react';
import PropTypes from 'prop-types';
import { getHighlightsClass, getValueOfItem } from 'utils/learn/Exam';
import { remove } from 'common/utils/Array';
import './stylesheet.scss';

class SelectImage extends React.Component {
  selected = (itemValue) => {
    const { value, multiple, saveAsArrayWhenMultipleIsFalse } = this.props;
    if (multiple || saveAsArrayWhenMultipleIsFalse) {
      return !!(Array.isArray(value) && value.includes(itemValue));
    }
    return value === itemValue;
  };

  onSelectWhenMultipleIsTrue = (itemValue) => {
    const { value, onChange } = this.props;
    if (typeof onChange !== 'function') {
      return;
    }

    const realValue = Array.isArray(value) ? value : [];

    if (!this.selected(itemValue)) {
      onChange(realValue.concat([itemValue]));
    } else {
      onChange(remove(realValue, itemValue));
    }
  };

  onSelectWhenMultipleIsFalse = (itemValue) => {
    const { onChange, saveAsArrayWhenMultipleIsFalse } = this.props;
    if (typeof onChange !== 'function') {
      return;
    }

    if (this.selected(itemValue)) {
      return;
    }

    if (saveAsArrayWhenMultipleIsFalse) {
      onChange([itemValue]);
    } else {
      onChange(itemValue);
    }
  };

  onSelect = (itemValue) => {
    const { multiple, resetHighlights, disabled } = this.props;
    if (disabled) {
      return;
    }

    if (multiple) {
      this.onSelectWhenMultipleIsTrue(itemValue);
    } else {
      this.onSelectWhenMultipleIsFalse(itemValue);
    }

    if (resetHighlights) resetHighlights();
  };

  render() {
    const {
      meta,
      activeClass,
      wrapperClass,
      vertical,
      data,
      withText,
      valueKey,
      highlights,
      notBlurNonselectedImage,
    } = this.props;

    let {
      itemsPerLine,
      height,
      options,
      title,
      alt,
      avatar,
      label,
    } = this.props;

    const newAlt = alt || title || 'alt';
    avatar = avatar || 'avatar';
    title = label || title || 'title';
    const activeClazz = activeClass || 'selected';
    const wrapperClazz = wrapperClass !== undefined ? wrapperClass : 'wrapper';
    const directionClass = vertical ? 'direction-column' : 'direction-row';
    itemsPerLine = itemsPerLine || options.length;
    height = height || 'auto'; // '180px';
    const width = (100 / itemsPerLine).toFixed(4);
    options = options || data;

    return (
      <div className="input-select-image">
        {this.props.hintText}
        {meta && meta.touched && meta.error && (
          <div style={this.divStyle}>{meta.error}</div>
        )}
        <ul className={`display-panel ${directionClass}`}>
          {options &&
            options.map((item, index) => {
              const itemValue = getValueOfItem(item, index, valueKey);
              return (
                <li
                  style={{
                    width: `${width}%`,
                    height: `${height}`,
                    marginBottom: '15px',
                  }}
                  key={index}
                  className={
                    this.selected(itemValue) ? activeClazz : wrapperClazz
                  }
                  onClick={() => {
                    this.onSelect(itemValue);
                  }}
                  title={item[title]}
                >
                  <div className={getHighlightsClass(highlights, itemValue)}>
                    <img
                      src={item[avatar]}
                      alt={item[newAlt]}
                      title={item.imgTitle || ''}
                      className={(() => {
                        if (this.selected(itemValue)) {
                          return 'selected';
                        }
                        if (notBlurNonselectedImage) {
                          return 'nonselected';
                        }
                        return 'nonselected nonselected__blur';
                      })()}
                    />
                    {withText && title && (
                      <div className="element-name">{item[title]}</div>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

SelectImage.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string,
  activeClass: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default SelectImage;
