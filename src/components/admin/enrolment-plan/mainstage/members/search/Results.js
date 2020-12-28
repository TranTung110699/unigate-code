import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import LinkIfNeeded from 'components/common/router/LinkIfNeeded';
import lodashGet from 'lodash.get';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import DetailOnDialog from 'components/common/detail-on-dialog';

import routes from 'routes';
import { t, t1, t3 } from 'translate';
import { hoursStringify, isOnlineCourse } from 'utils/Util';
import Icon from 'components/common/Icon';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import {
  canEnrolmentPlanMembersBeApproved,
  canEnrolmentPlanMembersBeRejected,
  doesEnrolmentPlanMembersNeedApprovalGivenConf,
  isEnrolmentPlanExecuted,
  isEnrolmentPlanMembersRejected,
} from 'components/admin/enrolment-plan/common';
import ApproveButton from 'components/admin/enrolment-plan/common/members/approve/Button';
import RejectButton from 'components/admin/enrolment-plan/common/members/reject/Button';
import LearnerProgress from 'components/admin/enrolment-plan/mainstage/learners-progress/search';
import { createSelector } from 'reselect';
import { confSelector } from 'common/selectors';

import {
  isEmptyArray,
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';

import {
  DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData,
  EnrolmentPlanMemberRejectionReasonGivenRelationsWithExpandedData,
  EnrolmentPlanMemberStatusGivenRelationsWithExpandedData,
  getActiveRelationR,
} from './common';
import OpenEndedTake from 'components/common/open-ended-take';
import './style.scss';
// import OrganizationsOrPhongBan from '../../../../category/common/OrganizationsOrPhongBanInResultTable';
// import VarDump from '../../../../../common/VarDump';

class Results extends Component {
  handleUserRelationshipChange = () => {
    const { onUserRelationshipChange } = this.props;
    if (typeof onUserRelationshipChange === 'function') {
      onUserRelationshipChange();
    }
  };

  getExperience = (startUnixTimestamp) => {
    if (!startUnixTimestamp) {
      return t3('n/a');
    }

    const durationInSeconds =
      Math.floor(Date.now() / 1000) - startUnixTimestamp;
    const durationInHours = Math.floor(durationInSeconds / (60 * 60));

    return (
      hoursStringify(['year', 'month'])(durationInHours) || `< 1 ${t('month')}`
    );
  };

  render() {
    const {
      resultTableHeight,
      items,
      node,
      searchFormId,
      resultTableFieldName,
      keysSave,
      checkKey,
      selectable,
      resultId,
      displayRowCheckboxOnTheRightSide,
      noActions,
      noLink,
      doesEnrolmentPlanMembersNeedApproval,
    } = this.props;

    let { columnsNotToShow } = this.props;

    if ((columnsNotToShow || []).includes('assigned_to_learn')) {
      columnsNotToShow = columnsNotToShow.concat([
        'academic_categories',
        'from_to_date',
        'location',
        'cp',
        'p',
        'oe_question',
      ]);
    }
    if (!items) return null;

    const groupKeyUserIid = 'user.iid';
    const groupKeyGroupIid = 'relations_with_groups.group_iid';
    const groupKeyCourseIid = 'relations_with_groups.courses.iid';

    let modifiedItems = items;

    modifiedItems = unwind(modifiedItems, 'relations_with_groups');
    if (!(columnsNotToShow || []).includes('assigned_to_learn')) {
      modifiedItems = unwind(modifiedItems, 'relations_with_groups.courses');
    }

    modifiedItems = modifiedItems.map((item, index) => {
      if (!item) {
        return item;
      }

      return {
        ...item,
        id: `${lodashGet(item, groupKeyUserIid)}${lodashGet(
          item,
          groupKeyGroupIid,
        )}${lodashGet(item, groupKeyCourseIid)}`,
      };
    });

    let keysToGroup = [groupKeyUserIid, groupKeyGroupIid];
    if (!(columnsNotToShow || []).includes('assigned_to_learn')) {
      keysToGroup = keysToGroup.concat([groupKeyCourseIid]);
    }

    modifiedItems = populateRowSpanInfoToRenderListOfItemAsTable(
      modifiedItems,
      keysToGroup,
    );

    const bodyRowCheckBoxSpans = modifiedItems.map((item) =>
      lodashGet(item, `rowSpans["${groupKeyGroupIid}"]`),
    );

    const width = {
      cp: '40px',
      p: '40px',
      name: '100px',
      mail: '100px',
      organization: '100px',
      aca: '100px',
      position: '100px',
      ep: '10%',
      course: '10%',
    };

    return (
      <div className="table-result">
        <Table
          height={resultTableHeight}
          fixedHeader
          className="table-border"
          key="result-table"
          name={resultTableFieldName || 'results'}
          itemList={modifiedItems}
          bodyRowCheckBoxSpans={bodyRowCheckBoxSpans}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable={selectable}
          displayRowCheckboxOnTheRightSide={displayRowCheckboxOnTheRightSide}
        >
          <TableHeader
            adjustForCheckbox={selectable}
            displaySelectAll={selectable}
          >
            <TableRow>
              {!(columnsNotToShow || []).includes('mail') && (
                <TableHeaderColumn style={{ width: width.mail }}>
                  {t1('mail')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('name') && (
                <TableHeaderColumn style={{ width: width.name }}>
                  {t1('name')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('organizations') && (
                <TableHeaderColumn style={{ width: width.organization }}>
                  {t1('organizations')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('job_position') && (
                <TableHeaderColumn style={{ width: width.position }}>
                  {t1('job_position')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('experience') && (
                <TableHeaderColumn>{t1('experience')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('enrolment_plan') && (
                <TableHeaderColumn style={{ width: width.name }}>
                  {t1('enrolment_plan')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('assigned_to_learn') && (
                <TableHeaderColumn style={{ width: width.course }}>
                  {t1('assigned_to_learn')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('academic_categories') && (
                <TableHeaderColumn style={{ width: width.name }}>
                  {t1('academic_categories')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('from_to_date') && (
                <TableHeaderColumn>{t1('time')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('location') && (
                <TableHeaderColumn>{t1('location')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('cp') && (
                <TableHeaderColumn style={{ width: width.cp }}>
                  {t1('completed_percent')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('p') && (
                <TableHeaderColumn style={{ width: width.p }}>
                  {t1('score')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('oe_question') && (
                <TableHeaderColumn>{t1('oe_question')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('method') && (
                <TableHeaderColumn
                  title={t1('how_the_members_were_added_to_the_training_plan')}
                >
                  {t1('method')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('status') && (
                <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('reason') && (
                <TableHeaderColumn>{t1('reason')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('action') && (
                <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={selectable}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false}
            key={resultId}
          >
            {modifiedItems &&
              modifiedItems.filter(Boolean).map((item) => {
                // if ((item.user.iid = 104)) console.log(item);

                const user = lodashGet(item, 'user');
                let course = lodashGet(item, 'relations_with_groups.courses');
                course = isEmptyArray(course) ? null : course;

                const enrolmentPlan = lodashGet(
                  item,
                  'relations_with_groups.enrolment_plan',
                );

                const relations = lodashGet(
                  item,
                  'relations_with_groups.relations',
                );

                const userRowSpan = lodashGet(
                  item,
                  `rowSpans["${groupKeyUserIid}"]`,
                );

                const enrolmentPlanRowSpan = lodashGet(
                  item,
                  `rowSpans["${groupKeyGroupIid}"]`,
                );

                const r = getActiveRelationR(relations);
                const rt = lodashGet(r, 'rt');

                return (
                  <TableRow key={item.id}>
                    {userRowSpan && !(columnsNotToShow || []).includes('mail') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        style={{ width: width.mail }}
                      >
                        {user.mail}
                      </TableRowColumn>
                    )}

                    {userRowSpan && !(columnsNotToShow || []).includes('name') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        style={{ width: width.name }}
                      >
                        <LinkIfNeeded
                          to={routes.url('admin_view_student', user)}
                        >
                          <div>{user.name}</div>
                        </LinkIfNeeded>
                      </TableRowColumn>
                    )}

                    {userRowSpan &&
                      !(columnsNotToShow || []).includes('organizations') && (
                        <TableRowColumn
                          rowSpan={userRowSpan}
                          style={{ width: width.organization }}
                        >
                          {user.organization_name}
                        </TableRowColumn>
                      )}
                    {userRowSpan &&
                      !(columnsNotToShow || []).includes('job_position') && (
                        <TableRowColumn
                          rowSpan={userRowSpan}
                          style={{ width: width.position }}
                        >
                          {user.position_name}
                        </TableRowColumn>
                      )}
                    {userRowSpan &&
                      !(columnsNotToShow || []).includes('experience') && (
                        <TableRowColumn rowSpan={userRowSpan}>
                          {this.getExperience(item.startdate)}
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('enrolment_plan') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.name }}
                        >
                          <LinkIfNeeded
                            noLink={noLink}
                            to={routes.url(
                              'node_edit',
                              Object.assign(
                                {},
                                {
                                  iid: lodashGet(enrolmentPlan, 'iid'),
                                  ntype: 'enrolment_plan',
                                },
                              ),
                              true /* dialog */,
                            )}
                          >
                            {lodashGet(enrolmentPlan, 'name')}
                          </LinkIfNeeded>
                        </TableRowColumn>
                      )}
                    {!(columnsNotToShow || []).includes(
                      'assigned_to_learn',
                    ) && (
                      <TableRowColumn style={{ width: width.course }}>
                        {course && (
                          <LinkIfNeeded
                            noLink={noLink}
                            to={routes.url(
                              'node_edit',
                              course,
                              true /* dialog */,
                            )}
                          >
                            {lodashGet(course, 'name')}
                          </LinkIfNeeded>
                        )}
                      </TableRowColumn>
                    )}
                    {!(columnsNotToShow || []).includes(
                      'academic_categories',
                    ) && (
                      <TableRowColumn style={{ width: width.name }}>
                        {course && lodashGet(course, 'category_name')}
                      </TableRowColumn>
                    )}

                    {!(columnsNotToShow || []).includes('from_to_date') && (
                      <TableRowColumn>
                        {course &&
                          (() => {
                            const startDate = lodashGet(course, 'start_date');
                            const endDate = lodashGet(course, 'end_date');
                            return (
                              <React.Fragment>
                                {startDate && (
                                  <div
                                    title={timestampToDateTimeString(startDate)}
                                  >
                                    {t1('from:_%s', [
                                      timestampToDateString(startDate),
                                    ])}
                                  </div>
                                )}
                                {endDate && (
                                  <div
                                    title={timestampToDateTimeString(endDate)}
                                  >
                                    {t1('to:_%s', [
                                      timestampToDateString(endDate),
                                    ])}
                                  </div>
                                )}
                                {!isOnlineCourse(course) && !noLink && (
                                  <LinkIfNeeded
                                    noLink={noLink}
                                    target="_blank"
                                    to={routes.url(
                                      'node_edit',
                                      Object.assign({}, course, {
                                        step: 'timetable',
                                      }),
                                    )}
                                  >
                                    ({t1('view_timetable')})
                                  </LinkIfNeeded>
                                )}
                              </React.Fragment>
                            );
                          })()}
                      </TableRowColumn>
                    )}
                    {!(columnsNotToShow || []).includes('location') && (
                      <TableRowColumn>
                        {course && (
                          <ul>
                            {(
                              lodashGet(course, '__expand.campus_iids') || []
                            ).map((campus) => (
                              <li>{lodashGet(campus, 'name')}</li>
                            ))}
                          </ul>
                        )}
                      </TableRowColumn>
                    )}
                    {!(columnsNotToShow || []).includes('cp') && (
                      <TableRowColumn style={{ width: width.cp }}>
                        {lodashGet(course, 'user_progress.cp')}
                      </TableRowColumn>
                    )}

                    {!(columnsNotToShow || []).includes('p') && (
                      <TableRowColumn style={{ width: width.p }}>
                        {lodashGet(course, 'user_progress.p')}
                      </TableRowColumn>
                    )}
                    {!(columnsNotToShow || []).includes('oe_question') && (
                      <TableRowColumn>
                        {lodashGet(course, 'open_ended_takes')
                          ? lodashGet(course, 'open_ended_takes').map(
                              (take, index) => (
                                <OpenEndedTake take={take} index={index} />
                              ),
                            )
                          : null}
                      </TableRowColumn>
                    )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('method') && (
                        <TableRowColumn rowSpan={enrolmentPlanRowSpan}>
                          <DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData
                            relations={relations}
                          />
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('status') && (
                        <TableRowColumn rowSpan={enrolmentPlanRowSpan}>
                          <EnrolmentPlanMemberStatusGivenRelationsWithExpandedData
                            relations={relations}
                          />
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('reason') && (
                        <TableRowColumn rowSpan={enrolmentPlanRowSpan}>
                          {isEnrolmentPlanMembersRejected(
                            enrolmentPlan,
                            rt,
                          ) && (
                            <EnrolmentPlanMemberRejectionReasonGivenRelationsWithExpandedData
                              relations={relations}
                            />
                          )}
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('action') && (
                        <TableRowColumn rowSpan={enrolmentPlanRowSpan}>
                          {!noActions && doesEnrolmentPlanMembersNeedApproval && (
                            <React.Fragment>
                              {canEnrolmentPlanMembersBeApproved(
                                enrolmentPlan,
                                rt,
                              ) && (
                                <ApproveButton
                                  searchFormId={searchFormId}
                                  node={enrolmentPlan}
                                  user={user}
                                  requestSuccessful={
                                    this.handleUserRelationshipChange
                                  }
                                />
                              )}
                              {canEnrolmentPlanMembersBeRejected(
                                enrolmentPlan,
                                rt,
                              ) && (
                                <RejectButton
                                  searchFormId={searchFormId}
                                  node={enrolmentPlan}
                                  user={user}
                                  requestSuccessful={
                                    this.handleUserRelationshipChange
                                  }
                                />
                              )}
                            </React.Fragment>
                          )}
                          {isEnrolmentPlanExecuted(enrolmentPlan) && (
                            <DetailOnDialog
                              dialogKey={`ep_${lodashGet(
                                enrolmentPlan,
                                'iid',
                              )}_${lodashGet(user, 'iid')}_progress`}
                              renderPreview={({ showFull }) => (
                                <Icon
                                  title={t1('learner_progress')}
                                  className="action"
                                  icon={'preview'}
                                  onClick={showFull}
                                />
                              )}
                              renderFull={() => (
                                <LearnerProgress
                                  formid={`ep_${lodashGet(
                                    enrolmentPlan,
                                    'iid',
                                  )}_${lodashGet(user, 'iid')}_progress`}
                                  node={enrolmentPlan}
                                  hiddenFields={{
                                    enrolment_plan_iid: lodashGet(
                                      enrolmentPlan,
                                      'iid',
                                    ),
                                    user_iid: lodashGet(user, 'iid'),
                                  }}
                                  paginationProps={{
                                    onlyShowIfTotalBigEnough: true,
                                  }}
                                  noSearchForm
                                />
                              )}
                              dialogOptionsProperties={{
                                title: t1('progress_of_%s', [user.name]),
                              }}
                            />
                          )}
                        </TableRowColumn>
                      )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

const mapStateToProps = createSelector(
  confSelector,
  (conf) => ({
    doesEnrolmentPlanMembersNeedApproval: doesEnrolmentPlanMembersNeedApprovalGivenConf(
      conf,
    ),
  }),
);

export default connect(mapStateToProps)(reduxForm({})(Results));
