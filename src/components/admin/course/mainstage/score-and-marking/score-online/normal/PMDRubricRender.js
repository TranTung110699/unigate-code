import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Avatar from 'components/common/avatar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import get from 'lodash.get';
import { parseScoreToString } from 'common/utils/Score';
import Icon from 'components/common/Icon';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes';

const cssClass = 'admin-course-score-normal-result';

class RubricRender extends React.PureComponent {
  actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  getMaxRowHeader = (rubrics) => {
    const academic = rubrics.find(
      (rubric) =>
        get(rubric, 'sub_type') === 'academic_score' &&
        get(rubric, 'children.length') > 1,
    );
    return academic ? 2 : 1;
  };

  renderHeader = (rubrics, hasPermUpdateTranscriptStatus) => {
    const rowSpan = this.getMaxRowHeader(rubrics);
    return (
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn rowSpan={rowSpan}>
            {t1('student_info')}
          </TableHeaderColumn>
          {rubrics.map((rubric, index) => {
            if (get(rubric, 'sub_type') === 'academic_score') {
              return (
                <TableHeaderColumn
                  key={index}
                  colSpan={get(rubric, 'children.length')}
                  rowSpan={get(rubric, 'children.length') > 1 ? 1 : 2}
                  className={`${cssClass}__th-score`}
                >
                  {get(rubric, 'name')}
                </TableHeaderColumn>
              );
            }
            return (
              <TableHeaderColumn
                key={index}
                className={`${cssClass}__th-score`}
                rowSpan={rowSpan}
              >
                {get(rubric, 'name')}
              </TableHeaderColumn>
            );
          })}
          <TableHeaderColumn
            className={`${cssClass}__th-score`}
            rowSpan={rowSpan}
          >
            {t1('average_score')}
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" rowSpan={rowSpan}>
            {t1('graduated')}
            {hasPermUpdateTranscriptStatus && (
              <ActionToggle
                readOnly={false}
                readOnlyLabelSet={this.actionToggleReadOnlyLabelSet}
                baseURL={routes.url('node_update', {
                  ...this.props.node,
                  step: 'transcript_status',
                })}
                dataSet={this.actionToggleReadOnlyLabelSet}
                value={get(this.props, 'node.transcript_status') || 'queued'}
                name="transcript_status"
              />
            )}
          </TableHeaderColumn>
        </TableRow>
        {rowSpan > 1 ? (
          <TableRow>
            {rubrics.map((pRubric, index) => {
              if (get(pRubric, 'sub_type') === 'academic_score') {
                if (get(pRubric, 'children.length') > 1)
                  return get(pRubric, 'children', []).map((rubric, index) => (
                    <TableHeaderColumn
                      key={index}
                      className={`${cssClass}__th-score`}
                    >
                      {get(rubric, 'name')}
                    </TableHeaderColumn>
                  ));
              }
            })}
          </TableRow>
        ) : (
          <div style={{ display: 'none' }} />
        )}
      </TableHeader>
    );
  };

  render() {
    const {
      rubrics,
      progresses,
      renderMarking,
      renderGroupAssignment,
      users,
      className,
      node,
      rubric,
      conditions,
      score_scale,
      attendance,
      handleExportPmdResult,
      isEditScore,
      hasPermUpdateTranscriptStatus,
      commentFinalScore,
    } = this.props;

    return (
      <div
        id="teacher-search-form"
        className={`${className || ''} ${cssClass}`}
      >
        <Table className={`${cssClass}__table`} selectable={false}>
          {this.renderHeader(rubrics, hasPermUpdateTranscriptStatus)}
          <TableBody displayRowCheckbox={false}>
            {users.filter(Boolean).map((user /* , invitedUserIndex */) => {
              const userProgress = progresses[user.iid];
              const graduated = get(userProgress, `[${node.iid}].graduated`);
              const allowedToTest = get(
                userProgress,
                `[${node.iid}].allowed_to_test`,
              );
              const enhancedUser = {
                ...user,
                graduated,
                allowed_to_test: allowedToTest,
              };

              const assignment = get(user, 'assignment');

              const condition = conditions[user.iid] || {};
              return (
                <TableRow key={`${enhancedUser.iid}`}>
                  <TableRowColumn className={`${cssClass}__td-student-info`}>
                    <Avatar user={enhancedUser} /> {enhancedUser.name} &nbsp;
                    <span className="text-muted">
                      {enhancedUser.code || enhancedUser.iid}
                    </span>
                  </TableRowColumn>
                  {rubrics.map((rubric, rubricIndex) => {
                    const scoreScaleOfUser = get(score_scale, `[${user.iid}]`);

                    if (get(rubric, 'sub_type') === 'attendance') {
                      const attendentOfUser = get(attendance, `[${user.iid}]`);
                      return (
                        <TableRowColumn
                          key={rubricIndex}
                          className={`${cssClass}__td-score`}
                        >
                          {get(attendentOfUser, 'absent')}/
                          {get(attendentOfUser, 'total')} (
                          {get(attendentOfUser, 'passed') ? 'P' : 'F'})
                        </TableRowColumn>
                      );
                    }

                    if (get(rubric, 'sub_type') === 'academic_score') {
                      return get(rubric, 'children', []).map((item) => (
                        <TableRowColumn
                          key={rubricIndex}
                          className={`${cssClass}__td-score`}
                          style={{ position: 'relative' }}
                        >
                          <div style={{ display: 'flex' }}>
                            {(condition[item.iid] ||
                              scoreScaleOfUser === 'pmd') &&
                            isEditScore
                              ? renderMarking({
                                  rubric: item,
                                  enhancedUser,
                                  user,
                                  progress: progresses[user.iid],
                                  scoreScale: get(score_scale, `[${user.iid}]`),
                                  rubricParentSubType: 'academic_score',
                                })
                              : get(
                                  progresses,
                                  `[${user.iid}][${item.iid}].p_original`,
                                )}
                            {renderGroupAssignment(user, item)}
                          </div>
                        </TableRowColumn>
                      ));
                    }
                    return (
                      <TableRowColumn
                        key={rubricIndex}
                        className={`${cssClass}__td-score`}
                      >
                        <div style={{ display: 'flex' }}>
                          {condition[rubric.iid] && isEditScore
                            ? renderMarking({
                                rubric,
                                enhancedUser,
                                user,
                                progress: progresses[user.iid],
                                scoreScale: get(score_scale, `[${user.iid}]`),
                              })
                            : get(
                                progresses,
                                `[${user.iid}][${rubric.iid}].p_original`,
                              )}
                          {renderGroupAssignment(user, rubric)}
                        </div>
                      </TableRowColumn>
                    );
                  })}
                  <TableRowColumn className={`${cssClass}__td-score`}>
                    {parseScoreToString(
                      get(
                        progresses,
                        `[${user.iid}][${rubric && rubric.iid}].p_original`,
                        '',
                      ),
                      get(score_scale, `[${user.iid}]`),
                    )}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {typeof graduated !== 'undefined' && (
                      <span
                        className={`${cssClass}__graduated-label\
                ${
                  graduated
                    ? `${cssClass}__graduated-label--passed`
                    : `${cssClass}__graduated-label--failed`
                }`}
                      >
                        {graduated ? t1('passed') : t1('failed')}
                        {get(score_scale, `[${user.iid}]`) === 'pmd' && (
                          <Icon
                            icon="fileDownload"
                            className="download-pmd"
                            onClick={() => handleExportPmdResult(user)}
                          />
                        )}
                        {commentFinalScore({
                          ...user,
                          progress: progresses[user.iid],
                        })}
                      </span>
                    )}
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

RubricRender.propTypes = {
  rubrics: PropTypes.arrayOf(PropTypes.shape()),
  progresses: PropTypes.arrayOf(PropTypes.shape()),
  renderMarking: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape()),
  isSis: PropTypes.bool,
  searchValues: PropTypes.shape(),
  className: PropTypes.string,
  node: PropTypes.shape(),
};

RubricRender.defaultValue = {
  rubrics: [],
  progresses: [],
  renderMarking: () => {},
  users: [],
  isSis: false,
  searchValues: {},
  className: '',
  node: {},
};

export default RubricRender;
