import React, { Component } from 'react';
import { connect } from 'react-redux';
import remove from 'lodash.remove';
import actions from 'actions/node/creators';
import { aspects } from 'components/admin/skill/configs';
import Icon from 'components/common/Icon';
import Editable from 'components/common/forms/editable';
import { t1, t4 } from 'translate';
import Weight from 'components/admin/node/edit/controls/Weight';
import EditStatusExam from 'components/admin/node/edit/controls/EditStatusExam';
import SelectField from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Toggle from 'antd/lib/switch';
import Checkbox from 'material-ui/Checkbox';
import EditEquivalentModule from 'components/admin/path/metadata/equivalent-module';
import get from 'lodash.get';
import {
  hasDuration,
  hasSequential,
  hasWeight,
} from 'components/admin/node/configs';
import {
  isAttendanceScoreRubric,
  isExam,
  isGroupAssignment,
} from 'common/learn';
import { Link } from 'react-router-dom';
import {
  canAddLearningItems,
  isCreditSyllabus,
  isEnrolmentPlanProgram,
  isNodeDescendantsCanBeSkillLearningItems,
  isProgramModule,
  isRubric,
} from 'components/admin/node/utils';
import { isScormSco } from 'components/admin/scorm/scorm';

import Comment from '../../metadata-v2/Comment';
import { ntype as allNtype, schoolTypes, skillType } from 'configs/constants';
import { createSelector } from 'reselect';
import CoursesOfEnrolmentPlanCredit from 'components/admin/enrolment-plan/mainstage/credits/course/Button';
import TimeRange from './time-range';
import ScormProcessingStatus from 'components/admin/scorm/scorm-processing-status';
import AddLearningItemToRubricSkill from './add-learning-items-to-rubric-skill';
import Name from './Name';
import Question from './Question';
import { setListItemRender } from '../actions';
import { canUserEditChildrenOfEnrolmentPlanProgram } from 'components/admin/enrolment-plan/common';
// import CheckValidityForm from 'components/admin/contest/check-validity/form';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import ScoExamItem from 'components/learn/items/exam/sco';
import { modes, types } from 'common/learn/exercise';
import { initExam } from 'actions/learn/exercise/normal/saga-creators';

class MetadataRow extends Component {
  divStyle = { padding: '10px' };
  divStyle1 = { marginRight: '10px' };
  divStyle2 = { width: '150px', maxWidth: '150px', textAlign: 'right' };
  checkboxStyle = { textAlign: 'left', float: 'left' };
  linkStyle = { float: 'left' };
  spanStyle = { color: 'red' };
  spanStyle1 = { textAlign: 'right' };
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  constructor(props) {
    super(props);
    this.saveSettingTestRule = this.saveSettingTestRule.bind(this);
  }

  toggleStyle = {
    display: 'inline-flex',
    paddingRight: 20,
  };

  componentDidMount() {
    const { item, dispatch } = this.props;
    dispatch(setListItemRender(item && item.iid));
  }

  saveSettingTestRule = (options) => {
    const { item, updateDataRow, itemIndex } = this.props;
    updateDataRow(
      {
        iid: item.iid,
        options,
      },
      itemIndex,
    );
  };

  getMenuItems = () => {
    const listSpeaker = this.props.listSpeaker || [];
    const options = [
      <MenuItem value={null} primaryText={t1('choose_speaker')} />,
    ];
    return options.concat(
      listSpeaker.map((speaker) => (
        <MenuItem
          key={speaker && speaker.name}
          value={speaker && speaker.name}
          primaryText={speaker && speaker.name}
          leftIcon={<Avatar src={speaker && speaker.avatar} />}
        />
      )),
    );
  };

  getCreditByChildren = (node) =>
    node.metadata.reduce(
      (sum, syllabus) => sum + (syllabus && syllabus.credit) || 0,
      0,
    );

  handleFetchTreeSyllabus = () => {
    const { dispatch, itemAncestors, visualTreeDepth } = this.props;
    const pNode = itemAncestors && itemAncestors[0];
    if (pNode) {
      pNode.depth = visualTreeDepth;
      dispatch(actions.fetchNode(pNode));
    }
  };

  handleFetchParentItem = () => {
    const { dispatch, parentItem } = this.props;
    dispatch(actions.fetchNode(parentItem));
  };

  handleEditItem = (item) => {
    const { dispatch, node, parentItem, depth, syllabusIid } = this.props;
    dispatch(
      actions.setBankNtype(
        item.ntype,
        item.type,
        parentItem.iid,
        'metadata',
        item.type,
        {
          node: item,
          mode: 'edit',
          depth,
          syllabusIid,
        },
      ),
    );
  };

  enableEditItem = (item) =>
    get(item, 'ntype') === 'skill' && get(item, 'type') === 'rubric';

  render() {
    const {
      depth,
      item,
      itemIndex,
      updateDataRow,
      nodes,
      onRemove,
      metadataFilters,
      maximumDepth,
      fieldEdit,
      readOnly,
      parentIndex,
      node,
      itemAncestors,
      parentItem,
      syllabusIid,
      schoolType,
      themeConfig,
      ntypesAllowRemove,
      examTemplateIid,
      inEPRunning,
    } = this.props;

    const enrolmentPlanProgramInItemAncestors = (itemAncestors || []).find(
      isEnrolmentPlanProgram,
    );

    const hasEnrolmentPlanProgramAsParent =
      String(get(parentItem, 'iid')) ===
      String(get(enrolmentPlanProgramInItemAncestors, 'iid'));

    // const isParentWeighted = parentItem && parentItem.weighed_score;
    const showWeightToggler =
      !examTemplateIid &&
      metadataFilters.weight &&
      (item.ntype === 'sco' || item.ntype === 'exercise') &&
      item.metadata &&
      item.metadata.length &&
      depth < maximumDepth;
    let hasPreview = fieldEdit !== 'skills';
    if (item.type && item.type === 'credit') hasPreview = false;

    // Don't display manage aspects of skill on add skills to job position
    const showRequiredSwitch =
      fieldEdit === 'skills' &&
      node &&
      (node.ntype !== 'top-equivalent-position' &&
        node.type !== 'job_position' &&
        node.ntype !== 'category' &&
        node.ntype !== 'job-position');

    if (
      [allNtype.PROGRAM_MODULE, allNtype.SPECIALIZATION_PROGRAM].includes(
        item.type,
      ) &&
      item.credit === 'undefined' &&
      item.metadata &&
      item.metadata.length
    ) {
      item.credit = this.getCreditByChildren(item);
    }

    const hasCredit = !!(
      item.type &&
      (item.type === 'credit' ||
        ([allNtype.PROGRAM_MODULE, allNtype.SPECIALIZATION_PROGRAM].includes(
          item.type,
        ) &&
          typeof item.credit !== 'undefined'))
    );

    const hasSetRequiredForSkill =
      item &&
      item.type === 'skill' &&
      (node.ntype === 'top-equivalent-position' ||
        (node && node.type === 'job_position'));

    const showDatetime =
      parentItem &&
      parentItem.ntype === 'path' &&
      parentItem.type === 'classgroup';

    item.isPMDRubric =
      [item.type, parentItem.type].includes(skillType.PMD_RUBRIC) ||
      parentItem.isPMDRubric;

    if (this.props.action === 'sequential') {
      const sequential = this.props.sequential || [];
      return (
        <div className="flex-container-wrap">
          <Toggle
            labelPosition="right"
            checked={sequential.includes(item.iid.toString())}
            onChange={(event, isInputChecked) => {
              if (this.props.updateSequential) {
                this.props.updateSequential(item.iid, isInputChecked);
              }
            }}
          />
          <div className="flex-item">
            <Name item={{ ...item, path: null }} />
          </div>
        </div>
      );
    }
    const layout = get(themeConfig, 'layout');

    let showP0 = true;
    if (Array.isArray(parentItem.metadata)) {
      parentItem.metadata.map((ck) => {
        if (String(item.iid) === String(ck.iid) && ck.great_exercise_score) {
          showP0 = false;
        }
      });
    }

    let showP1 = true;
    if (Array.isArray(parentItem.metadata)) {
      parentItem.metadata.map((ck) => {
        if (String(item.iid) !== String(ck.iid) && ck.great_exercise_score) {
          showP1 = false;
        } else if (
          String(item.iid) === String(ck.iid) &&
          ck.average_of_children_score
        ) {
          showP1 = false;
        }
      });
    }

    return (
      <div className="sort-item-wrapper">
        {item.errored && (
          <div style={this.divStyle}>
            <span style={this.spanStyle}>{item.errored}</span>
          </div>
        )}
        <div className="clearfix">
          <div className="pull-left">
            <Name
              item={item}
              fieldEdit={fieldEdit}
              metadataFilters={metadataFilters}
              showDatetime={showDatetime}
              parentItem={parentItem}
              schoolType={schoolType}
              inEPRunning={inEPRunning}
            />
            {isGroupAssignment(item) && (
              <TimeRange
                readOnly={readOnly}
                item={item}
                onChangeFinished={({ start_time, end_time }) => {
                  updateDataRow(
                    {
                      iid: item.iid,
                      start_time,
                      end_time,
                    },
                    itemIndex,
                  );
                }}
              />
            )}
            {isScormSco(item) && (
              <ScormProcessingStatus item={item} readOnly={readOnly} />
            )}
          </div>
          <div className="pull-right" style={this.divStyle1}>
            <span className="pull-right" style={this.spanStyle1}>
              {item.ntype === 'sco' && isExam(item) && (
                <span className="edit-status-exam">
                  <EditStatusExam node={item} syllabusIid={syllabusIid} />
                </span>
              )}
              {item.ntype === 'sco' && isExam(item) && (
                <DetailOnDialog
                  renderPreview={({ showFull }) => (
                    <Icon
                      icon="preview"
                      className="action"
                      onClick={showFull}
                    />
                  )}
                  renderFull={({ closeDialog }) => {
                    const learnInfo = {
                      type: types.EXAM,
                      id: item.id,
                      iid: item.iid,
                      name: item.name,
                      description: item.description,
                      options: {
                        shouldDisplayCheckedResult: true,
                      },
                      exam_type: item.ntype,
                      exam_order: 1,
                      duration: item.duration,
                      mode: modes.PREVIEW,
                    };

                    this.props.dispatch(initExam(item.iid, learnInfo));

                    return (
                      <ScoExamItem
                        key={`${item.iid}-sco-exam`}
                        id={`${item.iid}-sco-exam`}
                        learnItemIid={item.iid}
                        mode={modes.PREVIEW}
                      />
                    );
                  }}
                  dialogOptionsProperties={{
                    handleClose: true,

                    title: t1('preview_exam'),
                    modal: true,
                    width: '90%',
                  }}
                />
              )}
              {item && item.ntype === 'question' && (
                <Question
                  readOnly={readOnly}
                  totalNrRows={this.props.totalNrRows}
                  item={this.props.item}
                  items={this.props.items}
                  itemIndex={this.props.itemIndex}
                  updateDataRow={this.props.updateDataRow}
                />
              )}
              {item &&
                item.ntype === 'skill' &&
                item.sub_type === 'test' &&
                showP0 && (
                  <Checkbox
                    readOnly={readOnly}
                    disabled={readOnly}
                    style={this.checkboxStyle}
                    key={`${item.id}-small_exercise_score`}
                    type="checkbox"
                    label={t1('average_of_children_score')}
                    value={item.average_of_children_score}
                    checked={item.average_of_children_score}
                    onCheck={(ev, checked) =>
                      updateDataRow(
                        {
                          iid: item.iid,
                          average_of_children_score: checked ? 1 : 0,
                        },
                        itemIndex,
                      )
                    }
                  />
                )}

              {item &&
                item.ntype === 'skill' &&
                item.sub_type === 'test' &&
                showP1 && (
                  <Checkbox
                    readOnly={readOnly}
                    disabled={readOnly}
                    style={this.checkboxStyle}
                    key={`${item.id}-great_exercise_score`}
                    type="checkbox"
                    label={t1('midterm_test')}
                    value={item.great_exercise_score}
                    checked={item.great_exercise_score}
                    onCheck={(ev, checked) =>
                      updateDataRow(
                        {
                          iid: item.iid,
                          great_exercise_score: checked ? 1 : 0,
                        },
                        itemIndex,
                      )
                    }
                  />
                )}
              {showWeightToggler ? (
                <div style={this.divStyle2}>
                  <Weight node={item} brief readOnly={readOnly} />
                </div>
              ) : null}

              {node && node.type === 'roleplay' && (
                <span className="m-r-20">
                  <SelectField
                    value={(item && item.speaker && item.speaker.name) || null}
                    onChange={(event, key, val) => {
                      const listSpeaker = this.props.listSpeaker || [];
                      const speaker = listSpeaker.find(
                        (sp) => sp && sp.name === val,
                      );
                      updateDataRow(
                        {
                          iid: item.iid,
                          speaker,
                        },
                        itemIndex,
                      );
                    }}
                  >
                    {this.getMenuItems()}
                  </SelectField>
                </span>
              )}
              {metadataFilters.sequential &&
                hasSequential(item, '', nodes, parentIndex, itemIndex) && (
                  <span className="m-r-20 text-muted">
                    <Link
                      to={`${item && item.basePath}/sequential`}
                      title={t1('edit_sequential')}
                      className="action"
                    >
                      <Icon icon="sequential" className="action" />{' '}
                      {item &&
                        item.sequential &&
                        item.sequential.length > 0 &&
                        `(${[item.sequential.length]})`}
                    </Link>
                  </span>
                )}

              {metadataFilters.duration &&
                (item.duration || item.aggregated_duration) &&
                hasDuration(item.ntype, fieldEdit) &&
                (!isExam(item) || item.ntype !== 'syllabus') && (
                  <span className="m-r-20">
                    <span className="m-r-5">
                      <Icon icon="clock" className="text-muted" />
                    </span>
                    {item.duration || item.aggregated_duration}
                  </span>
                )}
              {(() => {
                if (
                  !enrolmentPlanProgramInItemAncestors &&
                  item &&
                  isCreditSyllabus(item) &&
                  layout === 'sb'
                ) {
                  return (
                    <span className="syllabus-hours">
                      ({item.credit || 0} {t1('points')})
                    </span>
                  );
                }
                return null;
              })()}

              {(() => {
                if (
                  enrolmentPlanProgramInItemAncestors &&
                  isCreditSyllabus(item)
                ) {
                  return (
                    <CoursesOfEnrolmentPlanCredit
                      readOnly={readOnly}
                      enrolmentPlanProgram={enrolmentPlanProgramInItemAncestors}
                      credit={item}
                      onNumberOfCourseChange={this.handleFetchParentItem}
                    />
                  );
                }
                return null;
              })()}

              {/* TODO: uncomment this once the content has been migrated */
              /* isParentWeighted && */
              metadataFilters.weight &&
              hasWeight(item.ntype, parentItem) &&
              !item.isPMDRubric ? (
                <span className="m-r-20" title={t1('item_weight')}>
                  <span className="m-r-5 text-muted">
                    {node.weight_scheme &&
                      node.weight_scheme === 'percent' &&
                      '%'}
                  </span>
                  <Editable
                    disabled={readOnly}
                    form={`edit-weighted-${item.iid}-${itemIndex}`}
                    name="weighted"
                    initialValue={item.weighted}
                    onSubmit={({ weighted }) => {
                      updateDataRow(
                        {
                          iid: item.iid,
                          weighted,
                        },
                        itemIndex,
                      );
                    }}
                    validate={({ weighted }) => {
                      const isValid = !isNaN(weighted);
                      return isValid
                        ? {}
                        : { weighted: t1('weight_is_number') };
                    }}
                  />
                </span>
              ) : null}

              {isRubric(item) && get(item, 'pass_score') && (
                <span title={t1('passing_score')} className="p-r-10">
                  <Icon icon="ok" /> {get(item, 'pass_score')}
                </span>
              )}

              {hasCredit && schoolType !== schoolTypes.ENTERPRISE && (
                <span style={this.toggleStyle}>
                  <EditEquivalentModule node={item} />
                </span>
              )}

              {isProgramModule(item) ? (
                <span style={this.toggleStyle}>
                  <Toggle
                    title={t1('require_or_not')}
                    checked={item && item.require}
                    onChange={(isInputChecked, event) => {
                      updateDataRow(
                        {
                          iid: item.iid,
                          require: isInputChecked ? 1 : 0,
                        },
                        itemIndex,
                      );
                    }}
                    className="m-r-5 m-l-5"
                  />
                  <span>{t4('required')}</span>
                </span>
              ) : null}

              {(isCreditSyllabus(item) ||
                hasCredit ||
                hasSetRequiredForSkill) &&
                (parentItem.type !== 'subjectgroup' &&
                  !enrolmentPlanProgramInItemAncestors) && (
                  <span style={this.toggleStyle}>
                    <Toggle
                      title={t1('set_the_final_score_of_the_process')}
                      checked={item && item.weighted}
                      onChange={(isInputChecked, event) => {
                        updateDataRow(
                          {
                            iid: item.iid,
                            weighted: isInputChecked ? 1 : 0,
                          },
                          itemIndex,
                        );
                      }}
                      className="m-r-5 m-l-5"
                    />
                    {!!hasCredit && <span>{t4('scoring')}</span>}
                    {!!hasSetRequiredForSkill && (
                      <span>{t4('mandatory_skill')}</span>
                    )}
                  </span>
                )}

              {hasCredit && !enrolmentPlanProgramInItemAncestors && (
                <span title={t1('credits')} className={'m-r-20'}>
                  <Icon icon="credit" />
                  <b>{item.credit || 0}</b> {t4('credits')}
                </span>
              )}
              {isRubric(item) &&
                canAddLearningItems(item) &&
                isNodeDescendantsCanBeSkillLearningItems(
                  itemAncestors && itemAncestors[0],
                ) &&
                !readOnly && (
                  <AddLearningItemToRubricSkill
                    item={item}
                    syllabusIid={syllabusIid}
                    className="action m-r-20"
                  />
                )}
              {metadataFilters.comment && item.ntype !== 'vocab' && (
                <span className="m-r-20 text-muted">
                  {Comment({
                    node: item,
                    syllabusIid: this.props.syllabusIid,
                    handleFetchNode: this.handleFetchTreeSyllabus,
                  })}
                </span>
              )}
              {!readOnly && this.enableEditItem(item) && (
                <span className="m-r-20 text-muted">
                  <Icon
                    icon="edit"
                    className="action"
                    onClick={(ev) => {
                      this.handleEditItem(item);
                    }}
                    title={t1('edit_item')}
                  />
                </span>
              )}
              {((!readOnly &&
                !inEPRunning &&
                !isAttendanceScoreRubric(item) &&
                // !isAcademicScoreRubric(item) &&
                (!enrolmentPlanProgramInItemAncestors ||
                  (hasEnrolmentPlanProgramAsParent &&
                    canUserEditChildrenOfEnrolmentPlanProgram(
                      enrolmentPlanProgramInItemAncestors,
                    )))) ||
                (Array.isArray(ntypesAllowRemove) &&
                  ntypesAllowRemove.includes(item.ntype))) && (
                <span className="text-muted">
                  <Icon
                    icon="remove"
                    className="action m-l-20"
                    onClick={(ev) => {
                      onRemove(item.iid, ev, itemIndex);
                    }}
                    title={t1('remove_item')}
                  />
                </span>
              )}
            </span>
          </div>
          {/*
            showRequiredSwitch ? <ActionToggle
              readOnly={readOnly}
              label="required"
              labelPosition="right"
              dataSet={{ on: 1, off: 0 }}
              title={t1('click_to_toggle_score_being_average_sum')}
              value={item.require}
              handleChange={(res, val) => {
                updateDataRow({
                  iid: item.iid,
                  require: val,
                }, itemIndex);
              }}
            /> : null
            */
          showRequiredSwitch && (
            <div>
              <div className="clearfix" />
              <hr />
              {t1('attach_this_item_to_following_skill_aspects')}
              <div className="row">
                {aspects.map((aspect) => (
                  <div className="col-md-4">
                    <Checkbox
                      style={this.checkboxStyle}
                      key={`${item.id}-${aspect}`}
                      type="checkbox"
                      label={t1(aspect)}
                      value={aspect}
                      checked={
                        item.attached_aspects &&
                        item.attached_aspects.length &&
                        item.attached_aspects.indexOf(aspect) !== -1
                      }
                      onCheck={(ev, checked) => {
                        let attached_aspects = item.attached_aspects || [];
                        // get the new list of attachable
                        if (checked) {
                          attached_aspects.push(aspect);
                        } else {
                          attached_aspects = remove(
                            item.attached_aspects,
                            (n) => n !== aspect,
                          );
                        }

                        updateDataRow(
                          {
                            iid: item.iid,
                            attached_aspects,
                          },
                          itemIndex,
                        );
                      }}
                    />{' '}
                    <Link
                      style={this.linkStyle}
                      to={`/admin/skill/${item.iid}/${aspect}?from=${node.iid}`}
                      title={t1('manage_this_skill')}
                    >
                      {t1('manage')}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bottom-underline" />
      </div>
    );
  }
}

/*
 MetadataRow.propTypes = {
 itemAncestors: PropTypes.arrayOf(PropTypes.object),
 nodes: PropTypes.arrayOf(PropTypes.object),
 depth: PropTypes.number,
 };

 MetadataRow.defaultProps = {
 itemAncestors: [{}],
 nodes: [{}],
 };
 */

const mapStateToProps = createSelector(
  (state) => get(state, 'domainInfo.conf.list_speaker'),
  (state) => get(state, 'domainInfo.school.type'),
  (state, props) => {
    const item = get(props, 'item') || {};
    item.duration = get(state, `tree.${item.iid}.duration`);
    return item;
  },
  (listSpeaker, schoolType, item) => ({
    listSpeaker: listSpeaker || [],
    schoolType,
    item,
  }),
);

export default connect(mapStateToProps)(MetadataRow);
