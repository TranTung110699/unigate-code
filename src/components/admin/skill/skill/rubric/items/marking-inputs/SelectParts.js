import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCoverPercentOfScaleParts,
  getSkillScaleInfoSelector,
  getValueWhenSelectAScalePart,
  isValueInScalePartRange,
} from 'components/admin/skill/skill/utils';
import Icon from 'components/common/Icon';
import lodashGet from 'lodash.get';
import './stylesheet.scss';

class SelectParts extends React.Component {
  cssClass = 'skill-rubric-marking-cell-select-part';

  getMarkingValue = () => {
    const { value } = this.props;
    return value;
  };

  setMarkingValue = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  handleMarkingCellHelpClick = (partIndex) => {
    const { onMarkingCellHelpClick } = this.props;
    if (typeof onMarkingCellHelpClick === 'function') {
      onMarkingCellHelpClick(partIndex);
    }
  };

  handleMarkingCellClick = (partIndex) => {
    const { nodeScale, getSkillScaleInfo, scalePartIdAsValue } = this.props;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);
    if (!nodeScaleInfo) {
      return null;
    }

    const markingValue = scalePartIdAsValue
      ? lodashGet(nodeScaleInfo, `parts[${partIndex}].id`)
      : getValueWhenSelectAScalePart(nodeScaleInfo, partIndex);

    this.setMarkingValue(markingValue);
  };

  render() {
    const {
      className,
      style,
      nodeScale,
      hideHelpIcon,
      showPartsName,
      hasOuterBorder,
      hideCheckIcon,
      highlightCheckedBox,
      shouldCalculatePartsWidthByItsValue,
      scalePartIdAsValue,
      floatingLabelText,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    const { getSkillScaleInfo } = this.props;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);

    const markingValue = this.getMarkingValue();

    return [
      floatingLabelText && (
        <label style={{ fontSize: 12 }}>{floatingLabelText}</label>
      ),
      <div className={componentClassName} style={style}>
        {nodeScaleInfo.parts.map((part, partIndex, arr) => {
          const isSelected = scalePartIdAsValue
            ? part && part.id === markingValue
            : isValueInScalePartRange(markingValue, part, partIndex);

          return (
            <div
              key={partIndex}
              style={{
                width: shouldCalculatePartsWidthByItsValue
                  ? `${getCoverPercentOfScaleParts(nodeScaleInfo, partIndex)}%`
                  : `${100 / arr.length}%`,
              }}
              className={`${this.cssClass}__part\
                ${partIndex === 0 ? `${this.cssClass}__part--first` : ''}\
                ${
                  partIndex === arr.length - 1
                    ? `${this.cssClass}__part--last`
                    : ''
                }\
                ${
                  hasOuterBorder
                    ? `${this.cssClass}__part--has-outer-border`
                    : ''
                }\
                ${
                  isSelected && highlightCheckedBox
                    ? `${this.cssClass}__part--hightlighted`
                    : ''
                }
                `}
              onClick={() => this.handleMarkingCellClick(partIndex)}
            >
              {showPartsName && part.name}
              {!hideHelpIcon && (
                <a
                  className={`${this.cssClass}__help`}
                  onClick={(event) => {
                    event.stopPropagation();
                    this.handleMarkingCellHelpClick(partIndex);
                  }}
                >
                  <Icon icon="live_help" />
                </a>
              )}
              {isSelected && !hideCheckIcon && (
                <Icon className={`${this.cssClass}__check-icon`} icon="check" />
              )}
            </div>
          );
        })}
      </div>,
    ];
  }
}

SelectParts.propTypes = {
  className: PropTypes.string,
};

SelectParts.defaultProps = {
  className: '',
  scalePartIdAsValue: false,
};

const mapStateToProps = (state) => ({
  getSkillScaleInfo: getSkillScaleInfoSelector(state),
});

export default connect(mapStateToProps)(SelectParts);
