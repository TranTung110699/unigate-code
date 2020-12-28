import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getInputValueFromValue,
  getScalePartInputValueFromValue,
  getSkillScaleInfoSelector,
  getValueWhenInput,
  getValueWhenInputAScalePart,
} from 'components/admin/skill/skill/utils';
import TextField from 'schema-form/elements/text/TextField';
import { isStringInteger } from 'common/utils';
import Icon from 'components/common/Icon';
import get from 'lodash.get';

class Input extends React.Component {
  cssClass = 'skill-rubric-marking-cell-input';

  componentDidMount() {
    const { focusOnMount } = this.props;
    if (focusOnMount && this.textField) {
      this.textField.focus();
    }
  }

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

  getTextInputPropsForMarkingCellByInputPart = (nodeScaleInfo) => {
    if (
      nodeScaleInfo.parts &&
      nodeScaleInfo.parts.every((part) =>
        isStringInteger(part && part.input_value),
      ) &&
      nodeScaleInfo.parts.every(
        (part, index) =>
          index === 0 ||
          Number(part.input_value) ===
            Number(nodeScaleInfo.parts[index - 1].input_value) + 1,
      )
    ) {
      return {
        type: 'number',
        min: nodeScaleInfo.parts[0].input_value,
        max: nodeScaleInfo.parts[nodeScaleInfo.parts.length - 1].input_value,
      };
    }
    return {};
  };

  handleMarkingInputPartChange = (value) => {
    const { getSkillScaleInfo, nodeScale } = this.props;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);
    if (!nodeScaleInfo) {
      return null;
    }
    this.setMarkingValue(getValueWhenInputAScalePart(nodeScaleInfo, value));
  };

  handleMarkingInputChange = (value) => {
    const { getSkillScaleInfo, nodeScale, scalePartIdAsValue } = this.props;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);
    if (!nodeScaleInfo) {
      return null;
    }
    this.setMarkingValue(
      getValueWhenInput(nodeScaleInfo, value, scalePartIdAsValue),
    );
  };

  setRefTextField = (el) => {
    this.textField = el;
  };

  render() {
    const {
      className,
      style,
      nodeScale,
      hideHelpIcon,
      getSkillScaleInfo,
      onKeyDown,
      scalePartIdAsValue,
      floatingLabelText,
      disabled,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);

    return (
      <div style={style} className={componentClassName}>
        {!hideHelpIcon && (
          <a
            className={`${this.cssClass}__help`}
            onClick={(event) => {
              event.stopPropagation();
              this.handleMarkingCellHelpClick();
            }}
          >
            <Icon icon="live_help" />
          </a>
        )}
        {nodeScaleInfo.scoring_method === 'input_part' && (
          <TextField
            disabled={disabled}
            {...this.getTextInputPropsForMarkingCellByInputPart(nodeScaleInfo)}
            setRef={this.setRefTextField}
            onKeyDown={onKeyDown}
            fullWidth
            floatingLabelText={floatingLabelText}
            value={getScalePartInputValueFromValue(
              nodeScaleInfo,
              this.getMarkingValue(),
            )}
            onChange={(event, value) => {
              this.handleMarkingInputPartChange(value);
            }}
          />
        )}
        {nodeScaleInfo.scoring_method === 'input' && (
          <TextField
            disabled={disabled}
            floatingLabelFixed
            floatingLabelText={floatingLabelText}
            onKeyDown={onKeyDown}
            setRef={this.setRefTextField}
            type="number"
            step="any"
            min={get(nodeScaleInfo, 'scoring_input_range.min', 0)}
            max={get(nodeScaleInfo, 'scoring_input_range.max', 100)}
            fullWidth
            value={getInputValueFromValue(
              nodeScaleInfo,
              this.getMarkingValue(),
              scalePartIdAsValue,
            )}
            onChange={(event, value) => {
              this.handleMarkingInputChange(value);
            }}
          />
        )}
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  scalePartIdAsValue: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  scalePartIdAsValue: false,
};

const mapStateToProps = (state) => ({
  getSkillScaleInfo: getSkillScaleInfoSelector(state),
});

export default connect(mapStateToProps)(Input);
