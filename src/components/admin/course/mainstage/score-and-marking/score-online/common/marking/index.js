import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import { connect } from 'react-redux';
import {
  defaultScoreScaleForMarkingSelector,
  getSkillScaleInfoSelector,
} from 'components/admin/skill/skill/utils';
import { schoolTypes } from 'configs/constants/index';
import MarkingSelectParts from 'components/admin/skill/skill/rubric/items/marking-inputs/SelectParts';
import MarkingInput from 'components/admin/skill/skill/rubric/items/marking-inputs/Input';
import FlatButton from 'components/common/mui/FlatButton';
// import Icon from 'components/common/Icon';
import get from 'lodash.get';
import { t1 } from 'translate';
import './stylesheet.scss';

class Marking extends React.Component {
  cssClass = 'admin-course-graduation-marking';

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editingValue: null,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  onChange = (editingValue) => {
    const { editableInline } = this.props;
    this.setState(
      () => ({ editingValue }),
      editableInline ? this.handleSubmit : () => {},
    );
  };

  markingComponent = () => {
    const editingValue =
      this.state.editingValue !== null
        ? this.state.editingValue
        : this.props.editingValue;
    const {
      disabled,
      scoreScale,
      getSkillScaleInfo,
      scalePartIdAsValue,
      floatingLabelText,
      editableInline,
    } = this.props;
    const nodeScaleInfo = getSkillScaleInfo(scoreScale);

    if (!nodeScaleInfo || !Array.isArray(nodeScaleInfo.parts)) {
      return null;
    }

    if (nodeScaleInfo.scoring_method === 'select_part') {
      return (
        <MarkingSelectParts
          showPartsName
          hasOuterBorder
          hideHelpIcon
          disabled={disabled}
          nodeScale={scoreScale}
          value={editingValue}
          onChange={this.onChange}
          hideCheckIcon
          highlightCheckedBox
          scalePartIdAsValue={scalePartIdAsValue}
          floatingLabelText={editableInline && floatingLabelText}
        />
      );
    }

    return (
      <MarkingInput
        disabled={disabled}
        hideHelpIcon
        focusOnMount
        floatingLabelText={editableInline && floatingLabelText}
        onKeyDown={this.handleInputKeyDown}
        nodeScale={scoreScale}
        value={editingValue}
        onChange={this.onChange}
        style={{ width: '100%' }}
        scalePartIdAsValue={scalePartIdAsValue}
      />
    );
  };

  handleSubmit = () => {
    const { editingValue } = this.state;
    const { onChange, anythingValue, editableInline } = this.props;
    if (
      ((typeof editingValue !== 'undefined' && editingValue !== '') ||
        anythingValue) &&
      typeof onChange === 'function'
    ) {
      onChange(editingValue);
    }

    if (editableInline) {
      return;
    }

    this.handleRequestClose();
  };

  render() {
    const {
      className,
      // node, nodeScale, scoreScale,
      label,
      style,
      editableInline,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    if (editableInline) {
      return this.markingComponent();
    }

    return (
      <div className={componentClassName} style={style}>
        <div className={`${this.cssClass}__edit-area`}>
          <a
            className={`${this.cssClass}__edit-button`}
            key="button"
            onClick={this.handleClick}
          >
            {label}
          </a>
        </div>
        <Popover
          key="popover"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <div className={`${this.cssClass}__popover-content`}>
            {get(this.props, 'schoolType') === schoolTypes.SIS && (
              <div>
                {t1('score_scale')}: {this.props.scoreScale}
              </div>
            )}
            {this.markingComponent()}
            <div className={`${this.cssClass}__actions`}>
              <FlatButton
                fullWidth
                disabled={
                  [null, undefined].includes(this.props.editingValue) &&
                  [null, undefined].includes(this.state.editingValue)
                }
                onClick={this.handleSubmit}
                label={t1('mark')}
              />
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

Marking.propTypes = {
  className: PropTypes.string,
  scoreScale: PropTypes.string,
  scalePartIdAsValue: PropTypes.bool,
};

Marking.defaultProps = {
  className: '',
  scoreScale: null,
  scalePartIdAsValue: false,
};

const mapStateToProps = (state, props) => ({
  scoreScale: props.scoreScale || defaultScoreScaleForMarkingSelector(state),
  getSkillScaleInfo: getSkillScaleInfoSelector(state),
  schoolType: get(state, 'domainInfo.school.type', null),
});

export default connect(mapStateToProps)(Marking);
