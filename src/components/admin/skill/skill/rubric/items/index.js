import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import {
  filterObjectKeys,
  fromTreeToArray,
  isShallowEqual,
} from 'common/utils/object';
import {
  fromValueToScalePart,
  getCoverPercentOfScaleParts,
  getScaledChildOfNode,
  getScaledChildrenOfNode,
  getSkillScaleInfoSelector,
} from 'components/admin/skill/skill/utils';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';
import DisplayHtml from 'components/common/html';
import Icon from 'components/common/Icon';
import { sum } from 'common/utils/Array';
import { t1 } from 'translate';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import InfoOfScaleChild from './info-of-scale-child';
import MarkingSelectParts from './marking-inputs/SelectParts';
import MarkingInput from './marking-inputs/Input';
import './stylesheet.scss';
import skillSchema from 'components/admin/skill/schema/form';

class SkillRubricViewItems extends React.Component {
  style = { width: '100%' };

  tableRowColumnStyle = {
    height: 'auto',
    minHeight: 48,
  };

  cssClass = 'skill-rubric-view-items';

  constructor(props) {
    super(props);
    this.state = {
      markingValues: props.defaultMarkingValues || {},
      suggestedValues: {},
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { skill } = this.props;
    const oldOverallMarkingValue = this.getMarkingValue(skill, prevState);
    const currentOverallMarkingValue = this.getMarkingValue(skill);
    if (oldOverallMarkingValue !== currentOverallMarkingValue) {
      const { onMarkingOverallValueChange } = this.props;
      if (typeof onMarkingOverallValueChange === 'function') {
        onMarkingOverallValueChange(currentOverallMarkingValue);
      }
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      !isShallowEqual(
        nextProps.defaultMarkingValues,
        this.props.defaultMarkingValues,
      )
    ) {
      this.setMarkingValues(nextProps.defaultMarkingValues);
    }
  };

  getMarkingValues = (state) => {
    const { controlled } = this.props;
    if (controlled) {
      return this.props.markingValues;
    }
    const { markingValues } = state || this.state;
    return markingValues;
  };

  getMarkingValue = (nodeOrIid, state) => {
    const markingValues = this.getMarkingValues(state);
    if (!nodeOrIid) {
      return null;
    }
    const iid = typeof nodeOrIid === 'object' ? nodeOrIid.iid : nodeOrIid;
    return markingValues[iid];
  };

  findNodeParentRecursively = (nodeIid, currentParentNode) => {
    if (!currentParentNode) {
      return null;
    }
    if (!Array.isArray(currentParentNode.children)) {
      return null;
    }
    for (let i = 0; i < currentParentNode.children.length; i += 1) {
      const child = currentParentNode.children[i];
      if (child) {
        if (String(child.iid) === String(nodeIid)) {
          return currentParentNode;
        }
        const mayBeParentNode = this.findNodeParentRecursively(nodeIid, child);
        if (mayBeParentNode) {
          return mayBeParentNode;
        }
      }
    }
    return null;
  };

  findNodeParent = (nodeIid) => {
    const { skill } = this.props;
    return this.findNodeParentRecursively(nodeIid, skill);
  };

  recalculatedScoreFromThisNodeUpward = (nodeIid, score) => {
    const parent = this.findNodeParent(nodeIid);
    let result = {
      [nodeIid]: score,
    };
    if (parent && parent.iid) {
      const parentScore = sum(parent.children, (child) => {
        if (!child) {
          return 0;
        }

        const childScore =
          String(child.iid) === String(nodeIid)
            ? score
            : this.getMarkingValue(child);

        return childScore && child.weighted
          ? (childScore * child.weighted) / 100
          : 0;
      });
      const recalculatedScoreFromParentNodeUpward = this.recalculatedScoreFromThisNodeUpward(
        parent.iid,
        parentScore,
      );
      result = {
        ...result,
        ...recalculatedScoreFromParentNodeUpward,
      };
    }
    return result;
  };

  setMarkingValues = (values) => {
    const { onMarkingValuesChange, controlled } = this.props;
    if (!controlled) {
      this.setState({
        markingValues: values,
      });
    }
    if (typeof onMarkingValuesChange === 'function') {
      onMarkingValuesChange(values);
    }
  };

  setMarkingValue = (value, node) => {
    const markingValues = this.getMarkingValues();
    if (!node || !node.iid) {
      return;
    }

    const valueAsNumber = Number.parseFloat(value);

    if (isNaN(valueAsNumber)) {
      this.setMarkingValues(filterObjectKeys(markingValues, [node.iid], false));
    } else {
      const validScore = Math.min(100, Math.max(0, valueAsNumber));
      const newSuggestedValues = this.recalculatedScoreFromThisNodeUpward(
        node.iid,
        validScore,
      );
      delete newSuggestedValues[node.iid];
      const { suggestedValues } = this.state;
      this.setMarkingValues({
        ...markingValues,
        [node.iid]: validScore,
      });

      this.setState({
        suggestedValues: {
          ...suggestedValues,
          ...newSuggestedValues,
        },
      });
    }
  };

  getEditingHeaderCells = (className) => {
    const { skill, getSkillScaleInfo } = this.props;
    if (!skill || !skill.scale) {
      return null;
    }

    const skillScaleInfo = getSkillScaleInfo(skill.scale);
    if (!skillScaleInfo) {
      return null;
    }

    return skillScaleInfo.parts.map((part, partIndex) => (
      <div
        key={partIndex}
        style={{
          width: `${getCoverPercentOfScaleParts(skillScaleInfo, partIndex)}%`,
        }}
        className={className}
      >
        {part.name}
      </div>
    ));
  };

  getMarkingHeaderCells = (className) => {
    const { skill, getSkillScaleInfo } = this.props;
    if (!skill || !skill.scale) {
      return null;
    }

    const skillScale = skill.scale;
    const skillScaleInfo = getSkillScaleInfo(skillScale);
    if (!skillScaleInfo) {
      return null;
    }

    if (skillScaleInfo.scoring_method === 'select_part') {
      return (
        <MarkingSelectParts
          className={className}
          nodeScale={skillScale}
          style={{ width: '100%', padding: 0 }}
          hideHelpIcon
          showPartsName
        />
      );
    }

    return (
      <div style={this.style} className={className}>
        {t1('score')}
      </div>
    );
  };

  getAssignChildrenScoreHeaderCells = (className) => {
    const { skill, getSkillScaleInfo } = this.props;

    const defaultReturn = (
      <div style={this.style} className={className}>
        {t1('score')}
      </div>
    );

    if (!skill || !skill.scale) {
      return defaultReturn;
    }

    const skillScaleInfo = getSkillScaleInfo(skill.scale);
    if (!skillScaleInfo) {
      return defaultReturn;
    }

    if (skillScaleInfo.scoring_method === 'select_part') {
      return skillScaleInfo.parts.map((part, partIndex) => (
        <div
          key={partIndex}
          style={{
            width: `${getCoverPercentOfScaleParts(skillScaleInfo, partIndex)}%`,
          }}
          className={className}
        >
          {part.name}
        </div>
      ));
    }

    return defaultReturn;
  };

  handleEditCellClick = (node, nodeParent, scale, scalePartIndex) => {
    const { dispatch, readOnly } = this.props;
    if (!node) {
      return;
    }

    const scaleChild = this.getScaleChild(node, scale, scalePartIndex);

    let contentDialog = null;
    if (readOnly) {
      contentDialog = <InfoOfScaleChild scaleChild={scaleChild} />;
    } else if (scaleChild) {
      contentDialog = (
        <NodeNew
          ntype={'skill'}
          schema={skillSchema}
          mode={'edit'}
          step={'scale_part'}
          node={scaleChild}
          closeModal
          formid={`edit_skill_${node.iid}`}
        />
      );
    } else {
      contentDialog = (
        <NodeNew
          ntype={'skill'}
          schema={skillSchema}
          mode={'edit'}
          step={'new_scale_part'}
          node={filterObjectKeys(node, ['id', 'iid', 'ntype'])}
          params={{
            scale_part_index: scalePartIndex,
            scale,
          }}
          closeModal
          formid={`edit_skill_${node.iid}`}
        />
      );
    }

    if (contentDialog) {
      const optionsProperties = {
        handleClose: true,
        modal: true,
      };
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
    }
  };

  getScaleChildren = (node, scale) => {
    return node && scale === node.scale && node.scaled_children;
  };

  getScaleChild = (node, scale, scalePartIndex) => {
    const scaleChildren = this.getScaleChildren(node, scale);
    return Array.isArray(scaleChildren) && scaleChildren[scalePartIndex];
  };

  getEditingCellsWhenThereAreNoScaleInfo = (className) => {
    const componentClassName = 'skill-rubric-editing-cell-no-score-scale-info';
    return (
      <div
        className={`${className || ''} ${componentClassName}`}
        style={this.noInfoAboutScoreScaleStyle}
      >
        {t1('there_are_no_information_about_this_score_scale')}
      </div>
    );
  };

  getEditingCells = (className, node, nodeParent) => {
    const { skill, getSkillScaleInfo } = this.props;
    const nodeScale = node.scale || skill.scale;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);

    const componentClassName = 'skill-rubric-editing-cell';

    if (!nodeScaleInfo || !Array.isArray(nodeScaleInfo.parts)) {
      return this.getEditingCellsWhenThereAreNoScaleInfo(
        `${className || ''} ${componentClassName}`,
      );
    }

    return nodeScaleInfo.parts.map((part, partIndex) => {
      const scaleChild = this.getScaleChild(node, nodeScale, partIndex);
      return (
        <div
          key={partIndex}
          style={{
            width: `${getCoverPercentOfScaleParts(nodeScaleInfo, partIndex)}%`,
          }}
          className={`${className || ''} ${componentClassName}`}
          onClick={() =>
            this.handleEditCellClick(node, nodeParent, nodeScale, partIndex)
          }
        >
          {scaleChild && scaleChild.description && (
            <DisplayHtml
              className={`${componentClassName}__description`}
              content={scaleChild.description}
            />
          )}
        </div>
      );
    });
  };

  handleMarkingCellHelpClick = (node, nodeScale, partIndex) => {
    const { dispatch } = this.props;

    let contentDialog = null;

    const componentClassName = 'rubric-scale-children-info';

    if (typeof partIndex !== 'undefined') {
      const scaleChild = getScaledChildOfNode(node, nodeScale, partIndex);
      if (scaleChild) {
        contentDialog = (
          <div className={componentClassName}>
            <InfoOfScaleChild
              className={`${componentClassName}__child`}
              scaleChild={scaleChild}
            />
          </div>
        );
      }
    } else {
      const scaleChildren = getScaledChildrenOfNode(node, nodeScale);
      if (Array.isArray(scaleChildren)) {
        contentDialog = (
          <div className={componentClassName}>
            {scaleChildren.map((scaleChild) => (
              <Card>
                <CardHeader
                  title={scaleChild.name}
                  subtitle={t1('click_to_see_info')}
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <InfoOfScaleChild
                    className={`${componentClassName}__child`}
                    scaleChild={scaleChild}
                  />
                </CardText>
              </Card>
            ))}
          </div>
        );
      }
    }

    if (contentDialog) {
      const optionsProperties = {
        handleClose: true,
      };
      dispatch(
        actions.handleOpenDialog(
          { contentDialog, optionsProperties },
          'rubric_marking_cell_content',
        ),
      );
    }
  };

  getMarkingCellsWhenThereAreNoScaleInfo = this
    .getEditingCellsWhenThereAreNoScaleInfo;

  getMarkingCells = (className, node, nodeParent) => {
    const { skill, getSkillScaleInfo } = this.props;
    const nodeScale = node.scale || skill.scale;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);

    if (!nodeScaleInfo || !Array.isArray(nodeScaleInfo.parts)) {
      return this.getMarkingCellsWhenThereAreNoScaleInfo(`${className || ''}`);
    }

    if (nodeScaleInfo.scoring_method === 'select_part') {
      return (
        <MarkingSelectParts
          className={className}
          nodeScale={nodeScale}
          value={this.getMarkingValue(node)}
          onChange={(value) => this.setMarkingValue(value, node)}
          style={{ width: '100%', padding: 0 }}
          onMarkingCellHelpClick={(partIndex) =>
            this.handleMarkingCellHelpClick(node, nodeScale, partIndex)
          }
        />
      );
    }

    return (
      <MarkingInput
        className={className}
        nodeScale={nodeScale}
        value={this.getMarkingValue(node)}
        onChange={(value) => this.setMarkingValue(value, node)}
        style={{ width: '100%' }}
        onMarkingCellHelpClick={() =>
          this.handleMarkingCellHelpClick(node, nodeScale)
        }
      />
    );
  };

  getNodeWeightedLabel = (node, nodeParent) => {
    const { skill } = this.props;
    if (!node || node === skill) {
      return '';
    }
    if (typeof node.weighted !== 'number') {
      return '';
    }

    if (nodeParent === skill) {
      return `${node.weighted}%`;
    }

    if (nodeParent && typeof nodeParent.weighted === 'number') {
      return `${(node.weighted * nodeParent.weighted) / 100}%`;
    }

    return '';
  };

  getMarkingSuggestionLabel = (node) => {
    const { suggestedValues } = this.state;
    const { getSkillScaleInfo, skill } = this.props;

    if (!node || !node.iid) {
      return '';
    }
    const suggestedValue = suggestedValues[node.iid];

    const nodeScale = node.scale || skill.scale;
    const nodeScaleInfo = getSkillScaleInfo(nodeScale);
    if (nodeScaleInfo && nodeScaleInfo.scoring_method === 'select_part') {
      const part = fromValueToScalePart(suggestedValue, nodeScaleInfo);
      return part && part.name;
    }

    return suggestedValue;
  };

  render() {
    const { className, skill, getSkillScaleInfo, mode } = this.props;
    if (!skill) {
      return null;
    }

    if (!['assign_children_score'].includes(mode)) {
      if (!skill.scale) {
        return null;
      }

      const skillScaleInfo = getSkillScaleInfo(skill.scale);
      if (!skillScaleInfo) {
        return null;
      }
    }

    const skillHasChildren =
      Array.isArray(skill.children) && skill.children.length > 0;
    const shouldShowWeight =
      skillHasChildren && !['assign_children_score'].includes(mode);
    const shouldShowSuggestion = mode === 'marking';

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                className={`${this.cssClass}__cell\
                  ${this.cssClass}__cell--name\
                  ${this.cssClass}__cell--left-most`}
              />
              {shouldShowWeight && (
                <TableHeaderColumn
                  className={`${this.cssClass}__cell\
                    ${this.cssClass}__cell--weighted`}
                >
                  {t1('weighted')}
                </TableHeaderColumn>
              )}
              {shouldShowSuggestion && (
                <TableHeaderColumn
                  className={`${this.cssClass}__cell\
                      ${this.cssClass}__cell--marking-suggestion`}
                >
                  {t1('suggestion')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn className={`${this.cssClass}__column`}>
                {(() => {
                  if (mode === 'marking') {
                    return this.getMarkingHeaderCells(
                      `${this.cssClass}__cell
                        ${this.cssClass}__cell--header`,
                    );
                  }
                  if (mode === 'assign_children_score') {
                    return this.getAssignChildrenScoreHeaderCells(
                      `${this.cssClass}__cell
                        ${this.cssClass}__cell--header`,
                    );
                  }
                  return this.getEditingHeaderCells(
                    `${this.cssClass}__cell
                      ${this.cssClass}__cell--header`,
                  );
                })()}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {fromTreeToArray(
              skill,
              (node, nodeParent, currentLevel) =>
                node &&
                typeof (node === 'object') &&
                !(
                  ['assign_children_score'].includes(mode) && node === skill
                ) && (
                  <TableRow>
                    <TableRowColumn
                      style={{
                        paddingLeft: (currentLevel + 1) * 24,
                      }}
                      className={`${this.cssClass}__cell\
                      ${this.cssClass}__cell--name\
                      ${this.cssClass}__cell--left-most`}
                      title={node === skill ? t1('overall') : node.name}
                    >
                      {node === skill ? (
                        t1('overall')
                      ) : (
                        <span>
                          <Icon
                            className={`${this.cssClass}__child-name-icon`}
                            icon="navigate-next"
                          />
                          <span>{node.name}</span>
                        </span>
                      )}
                    </TableRowColumn>
                    {shouldShowWeight && (
                      <TableRowColumn
                        className={`${this.cssClass}__cell\
                        ${this.cssClass}__cell--weighted`}
                        title={this.getNodeWeightedLabel(node, nodeParent)}
                      >
                        {this.getNodeWeightedLabel(node, nodeParent)}
                      </TableRowColumn>
                    )}
                    {shouldShowSuggestion && (
                      <TableRowColumn
                        className={`${this.cssClass}__cell\
                          ${this.cssClass}__cell--marking-suggestion`}
                        title={this.getMarkingSuggestionLabel(node)}
                      >
                        {this.getMarkingSuggestionLabel(node)}
                      </TableRowColumn>
                    )}
                    <TableRowColumn
                      style={this.tableRowColumnStyle}
                      className={`${this.cssClass}__column`}
                    >
                      {['marking', 'assign_children_score'].includes(mode)
                        ? this.getMarkingCells(
                            `${this.cssClass}__cell`,
                            node,
                            nodeParent,
                          )
                        : this.getEditingCells(
                            `${this.cssClass}__cell`,

                            node,
                            nodeParent,
                          )}
                    </TableRowColumn>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SkillRubricViewItems.propTypes = {
  className: PropTypes.string,
  controlled: PropTypes.bool,
  defaultMarkingValues: PropTypes.shape(),
  markingValues: PropTypes.shape(),
  mode: PropTypes.string,
  onMarkingOverallValueChange: PropTypes.func,
  onMarkingValuesChange: PropTypes.func,
};

SkillRubricViewItems.defaultProps = {
  className: '',
  controlled: false,
  defaultMarkingValues: null,
  markingValues: {},
  mode: 'edit',
  onMarkingOverallValueChange: null,
  onMarkingValuesChange: null,
};

const mapStateToProps = (state) => {
  return {
    getSkillScaleInfo: getSkillScaleInfoSelector(state),
  };
};

export default connect(mapStateToProps)(SkillRubricViewItems);
