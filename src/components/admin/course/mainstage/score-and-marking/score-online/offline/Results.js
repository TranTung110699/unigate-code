import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import nodeSagaActions from 'actions/node/saga-creators';
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
import MarkingRubric from 'components/common/rubric/index';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes';

class Results extends Component {
  cssClass = 'admin-course-score-offline-result';
  actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  componentWillReceiveProps(nextProps) {
    const { resultId } = this.props;

    if (resultId !== nextProps.resultId) {
      this.getProgressOfGraduatingSeniors(nextProps);
    }
  }

  handleSaveProgressSuccessfully = (props) => {
    this.getProgressOfGraduatingSeniors(props);
  };

  getProgressOfGraduatingSeniors = (props) => {
    const { dispatch, node, keyState, users, searchValues } = props;
    const url = apiUrls.get_progress_of_offline_exam;
    dispatch(
      nodeSagaActions.getDataRequest(
        { url, keyState, post: true },
        {
          course_iid: node && node.iid,
          users,
          ...searchValues,
        },
      ),
    );
  };

  render() {
    const {
      items,
      className,
      users,
      progresses,
      node,
      searchValues,
      formid,
      hasPermUpdateTranscriptStatus,
    } = this.props;
    return (
      <div
        id="teacher-search-form"
        className={`${className || ''} ${this.cssClass}`}
      >
        <Table className={`${this.cssClass}__table`} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{t1('student_info')}</TableHeaderColumn>
              <TableHeaderColumn className={`${this.cssClass}__th-score`}>
                {t1('score')}
                {hasPermUpdateTranscriptStatus && (
                  <ActionToggle
                    readOnly={false}
                    readOnlyLabelSet={this.actionToggleReadOnlyLabelSet}
                    baseURL={routes.url('node_update', {
                      ...this.props.node,
                      step: 'transcript_status',
                    })}
                    label={t1('transcript_status')}
                    dataSet={this.actionToggleReadOnlyLabelSet}
                    value={
                      get(this.props, 'node.transcript_status') || 'queued'
                    }
                    name="transcript_status"
                    style={{ width: 150 }}
                  />
                )}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {items &&
              items.map((item) => {
                const user = get(item, 'user');
                const rubric = get(item, 'rubric');
                const scoreScale = get(item, 'score_scale');
                const condition = get(item, 'condition');
                return (
                  <TableRow key={`${user.iid}`}>
                    <TableRowColumn
                      className={`${this.cssClass}__td-student-info`}
                    >
                      <Avatar user={user} /> {user.name}{' '}
                      {user.code && (
                        <span className="text-muted">({user.code})</span>
                      )}
                    </TableRowColumn>
                    <TableRowColumn className={`${this.cssClass}__td-score`}>
                      {(() => {
                        if (
                          condition &&
                          !get(condition, `[${get(rubric, 'iid')}]`)
                        ) {
                          return (
                            <div
                              className={`${
                                this.cssClass
                              }__graduated-label--failed`}
                            >
                              {t1('ban_contest')}
                            </div>
                          );
                        }

                        if (rubric) {
                          return (
                            <MarkingRubric
                              user={user}
                              rubric={rubric}
                              rubricParentSubType="academic_score"
                              scoreScale={scoreScale}
                              handleSaveProgressSuccessfully={() => {
                                this.handleSaveProgressSuccessfully(this.props);
                              }}
                            />
                          );
                        }

                        return (
                          <div className="text-muted">
                            {t1('rubric_not_support')} {scoreScale}
                          </div>
                        );
                      })()}
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

function mapStateToProps(state, props) {
  const keyState = `progresses-${props.node.iid}`;
  const progresses = state.dataApiResults[keyState] || {};
  let results = [];
  const key = props.formid;
  const resultFromStore = state.searchResults[key];

  if (resultFromStore && resultFromStore.result) {
    results = resultFromStore.result;
  }

  return {
    keyState,
    progresses,
    results,
  };
}

export default connect(mapStateToProps)(Results);
