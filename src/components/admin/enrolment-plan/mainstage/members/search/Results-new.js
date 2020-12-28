import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import LinkIfNeeded from 'components/common/router/LinkIfNeeded';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';

import routes from 'routes';
import { t, t1, t3 } from 'translate';
import { hoursStringify, isOnlineCourse } from 'utils/Util';
import Icon from 'antd/lib/icon';
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
import LearnerProgress from 'components/admin/enrolment-plan/mainstage/members/search/learner-progress';
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
import './style.scss';
import Avatar from 'antd/lib/avatar';
import allUserRts from 'configs/constants/group-members-relationship-types';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import OpenEndedTake from 'components/common/open-ended-take';

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
      actionAllows,
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
      cp: 'auto',
      p: 'auto',
      name: '7%',
      mail: '8%',
      organization: '8%',
      aca: 'auto',
      position: '8%',
      ep: 'auto',
      course: 'auto',
      status: '5%',
      reason: '10%',
      action: '7%',
      progress: '5%',
      experience: '5%',
      method: '5%',
    };

    return (
      <div className="EP-member-table-result">
        <Table
          height={resultTableHeight}
          fixedHeader
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
            className="EP-member-table-result-header"
          >
            <TableRow>
              {!(columnsNotToShow || []).includes('name') && (
                <TableHeaderColumn style={{ width: width.name }}>
                  {t1('name')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('mail') && (
                <TableHeaderColumn style={{ width: width.mail }}>
                  {t1('mail')}
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
                <TableHeaderColumn style={{ width: width.experience }}>
                  {t1('experience')}
                </TableHeaderColumn>
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
                  style={{ width: width.method }}
                >
                  {t1('method')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('status') && (
                <TableHeaderColumn style={{ width: width.status }}>
                  {t1('status')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('reason') && (
                <TableHeaderColumn style={{ width: width.reason }}>
                  {t1('reason')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('progress') && (
                <TableHeaderColumn style={{ width: width.progress }}>
                  {t1('progress')}
                </TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('action') && (
                <TableHeaderColumn style={{ width: width.action }}>
                  {t1('action')}
                </TableHeaderColumn>
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
                const userAvatar = lodashGet(item, 'user.avatar') ? (
                  <Avatar
                    src={lodashGet(item, 'user.avatar')}
                    className="m-r-5"
                  />
                ) : null;
                let cssClass = 'EP-member-';
                switch (lodashGet(r, 'rt')) {
                  case allUserRts.USER_RT_CURRENT:
                    cssClass += 'approved';
                    break;
                  case allUserRts.USER_RT_PENDING:
                    cssClass += 'pending';
                    break;
                  case allUserRts.USER_RT_REJECTED:
                    cssClass += 'reject';
                    break;
                }

                return (
                  <TableRow key={item.id}>
                    {userRowSpan && !(columnsNotToShow || []).includes('name') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        style={{ width: width.name }}
                      >
                        <LinkIfNeeded
                          to={routes.url(
                            'admin_view_student',
                            user /* dialog */,
                            /*'small' */
                          )}
                        >
                          <div>
                            {userAvatar}
                            <strong>{user.name}</strong>
                          </div>
                        </LinkIfNeeded>
                      </TableRowColumn>
                    )}
                    {userRowSpan && !(columnsNotToShow || []).includes('mail') && (
                      <TableRowColumn
                        rowSpan={userRowSpan}
                        style={{ width: width.mail }}
                      >
                        {user.mail}
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
                        <TableRowColumn
                          style={{ width: width.experience }}
                          rowSpan={userRowSpan}
                        >
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
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.method }}
                        >
                          <DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData
                            relations={relations}
                          />
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('status') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.status }}
                        >
                          <EnrolmentPlanMemberStatusGivenRelationsWithExpandedData
                            relations={relations}
                          />
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('reason') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.reason }}
                        >
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
                      !(columnsNotToShow || []).includes('progress') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.progress }}
                        >
                          {isEnrolmentPlanExecuted(enrolmentPlan) && (
                            <DetailOnDialog
                              dialogKey={`ep_${lodashGet(
                                enrolmentPlan,
                                'iid',
                              )}_${lodashGet(user, 'iid')}_progress`}
                              renderPreview={({ showFull }) => (
                                <Icon
                                  type="eye"
                                  theme="twoTone"
                                  onClick={showFull}
                                  title={t1('learner_progress')}
                                  style={{ fontSize: '24px' }}
                                  twoToneColor="#2089E2"
                                />
                              )}
                              renderFull={() => (
                                <LearnerProgress
                                  enrolmentPlan={enrolmentPlan}
                                  user_iid={lodashGet(user, 'iid')}
                                />
                              )}
                              dialogOptionsProperties={{
                                title: t1('progress_of_%s', [user.name]),
                              }}
                            />
                          )}
                        </TableRowColumn>
                      )}
                    {enrolmentPlanRowSpan &&
                      !(columnsNotToShow || []).includes('action') && (
                        <TableRowColumn
                          rowSpan={enrolmentPlanRowSpan}
                          style={{ width: width.action }}
                        >
                          {!noActions && doesEnrolmentPlanMembersNeedApproval && (
                            <React.Fragment>
                              {canEnrolmentPlanMembersBeApproved(
                                enrolmentPlan,
                                rt,
                              ) &&
                                actionAllows.includes('approve') && (
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
                              ) &&
                                actionAllows.includes('reject') && (
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
