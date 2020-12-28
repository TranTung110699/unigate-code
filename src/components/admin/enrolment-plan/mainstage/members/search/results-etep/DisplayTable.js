import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkIfNeeded from 'components/common/router/LinkIfNeeded';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import apiUrls from 'api-endpoints';
import PassFailIcon from 'components/admin/course/mainstage/score-and-marking/score-by-rubric/PassFailIcon';
import { isEnrolmentPlan } from 'components/admin/node/utils';

import routes from 'routes';
import { t1 } from 'translate';
import { isOnlineCourse } from 'utils/Util';
import Icon from 'antd/lib/icon';
import {
  canEnrolmentPlanMembersBeApproved,
  canEnrolmentPlanMembersBeRejected,
  doesEnrolmentPlanMembersNeedApprovalGivenConf,
  isEnrolmentPlanExecuted,
} from 'components/admin/enrolment-plan/common';
import ApproveButton from 'components/admin/enrolment-plan/common/members/approve/Button';
import RejectButton from 'components/admin/enrolment-plan/common/members/reject/Button';
import LearnerProgress from 'components/admin/enrolment-plan/mainstage/members/search/learner-progress';
import { createSelector } from 'reselect';
import { confSelector } from 'common/selectors';
import fetchData from 'components/common/fetchData';

import {
  isEmptyArray,
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';

import { getActiveRelationR } from 'components/admin/enrolment-plan/mainstage/members/search/common';
import Avatar from 'antd/lib/avatar';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import OpenEndedTake from 'components/common/open-ended-take';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

import AntdTable from 'antd/lib/table';

const getRubricColumnRender = (row, rubric, getDataFromRow) => {
  const { userRowSpan } = getDataFromRow(row);
  const progress = getRubricProgressToRender(row, lodashGet(rubric, 'iid'));
  const passed = lodashGet(progress, 'passed');

  return {
    props: {
      rowSpan: userRowSpan,
      className: 'text-center',
    },
    children: <PassFailIcon passed={passed} />,
  };
};

const getRubricProgressToRender = (row, rubricIid) => {
  const arr = lodashGet(row, 'learning_progress.score_by_rubrik');
  if (Array.isArray(arr)) return arr.find((el) => el.iid == rubricIid);
  return {};
  // return lodashGet(row, `learning_progress.score_by_rubrik.${rubricIid}`);
};

const columnsToRenderRubrics = (rubrics = [], getDataFromRow) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }

  return rubrics
    .map(({ children, sub_type, name, learning_items, ...rubric } = {}) => {
      let childrenToRender = [];
      if (Array.isArray(children) && children.length) {
        childrenToRender = columnsToRenderRubrics(children, getDataFromRow);
      }

      const result = {
        title: name,
        className: 'text-center',
        width: '5%',
      };

      if (childrenToRender.length) {
        result.children = childrenToRender;
      } else {
        result.render = (row) => {
          return getRubricColumnRender(row, rubric, getDataFromRow);
        };
      }

      return result;
    })
    .filter(Boolean);
};

const width = {
  checkBox: '3%',
  name: '10%',
  mail: '10%',
  organization: '10%',
  aca: 'auto',
  position: '8%',
  ep: 'auto',
  // course: 'auto',
  // status: '5%',
  // reason: '10%',
  action: '7%',
  passed: '5%',
  progress: '5%',
  // experience: '5%',
  // method: '5%',
};

class Results extends Component {
  handleUserRelationshipChange = () => {
    const { onUserRelationshipChange } = this.props;
    if (typeof onUserRelationshipChange === 'function') {
      onUserRelationshipChange();
    }
  };

  render() {
    const {
      items,
      node,
      searchFormId,
      noActions,
      noLink,
      doesEnrolmentPlanMembersNeedApproval,
      actionAllows,
      rootRubric,
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

    const getDataFromRow = (item) => {
      const user = lodashGet(item, 'user');
      let course = lodashGet(item, 'relations_with_groups.courses');
      course = isEmptyArray(course) ? null : course;

      const enrolmentPlan = isEnrolmentPlan(node)
        ? node
        : lodashGet(item, 'relations_with_groups.enrolment_plan');

      const relations = lodashGet(item, 'relations_with_groups.relations');

      const userRowSpan = lodashGet(item, `rowSpans["${groupKeyUserIid}"]`);

      const enrolmentPlanRowSpan = lodashGet(
        item,
        `rowSpans["${groupKeyGroupIid}"]`,
      );

      const r = getActiveRelationR(relations);
      const rt = lodashGet(r, 'rt');
      const userAvatar = lodashGet(item, 'user.avatar') ? (
        <Avatar src={lodashGet(item, 'user.avatar')} className="m-r-5" />
      ) : null;

      return {
        userRowSpan,
        userAvatar,
        user,
        enrolmentPlanRowSpan,
        enrolmentPlan,
        course,
        rt,
      };
    };

    const columns = [
      ...(!(columnsNotToShow || []).includes('name')
        ? [
            {
              title: t1('name'),
              render: (row) => {
                const { userRowSpan, userAvatar, user } = getDataFromRow(row);
                return {
                  props: {
                    rowSpan: userRowSpan,
                  },
                  children: (
                    <LinkIfNeeded
                      to={routes.url(
                        'admin_view_student',
                        user /* dialog */,
                        /*'small' */
                      )}
                    >
                      <div>
                        {userAvatar}
                        <strong>
                          {lodashGet(user, 'name') || lodashGet(user, 'lname')}
                        </strong>
                      </div>
                    </LinkIfNeeded>
                  ),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('mail')
        ? [
            {
              title: t1('contact'),
              render: (row) => {
                const { userRowSpan, user } = getDataFromRow(row);
                return {
                  props: {
                    rowSpan: userRowSpan,
                  },
                  children: (
                    <>
                      <div>{lodashGet(user, 'phone', '')}</div>
                      {lodashGet(user, 'mail', '')}
                    </>
                  ),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('organizations')
        ? [
            {
              title: t1('organizations'),
              render: (row) => {
                const { userRowSpan, user } = getDataFromRow(row);
                return {
                  props: {
                    rowSpan: userRowSpan,
                  },
                  children: (
                    <OrganizationsOrPhongBan
                      item={user}
                      attr={'user_organizations'}
                      showParentsInfo
                    />
                  ),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('enrolment_plan')
        ? [
            {
              width: width.name,
              title: t1('enrolment_plan'),
              render: (row) => {
                const { enrolmentPlanRowSpan, enrolmentPlan } = getDataFromRow(
                  row,
                );
                return {
                  props: {
                    rowSpan: enrolmentPlanRowSpan,
                  },
                  children: (
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
                  ),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('from_to_date')
        ? [
            {
              title: t1('time'),
              render: (row) => {
                const { course } = getDataFromRow(row);
                if (!course) {
                  return null;
                }

                const startDate = lodashGet(course, 'start_date');
                const endDate = lodashGet(course, 'end_date');

                return (
                  <React.Fragment>
                    {startDate && (
                      <div title={timestampToDateTimeString(startDate)}>
                        {t1('from:_%s', [timestampToDateString(startDate)])}
                      </div>
                    )}
                    {endDate && (
                      <div title={timestampToDateTimeString(endDate)}>
                        {t1('to:_%s', [timestampToDateString(endDate)])}
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
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('location')
        ? [
            {
              title: t1('location'),
              render: (row) => {
                const { course } = getDataFromRow(row);
                return {
                  children: (
                    <ul>
                      {(lodashGet(course, '__expand.campus_iids') || []).map(
                        (campus) => (
                          <li>{lodashGet(campus, 'name')}</li>
                        ),
                      )}
                    </ul>
                  ),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('cp')
        ? [
            {
              title: t1('completed_percent'),
              render: (row) => {
                const { course } = getDataFromRow(row);
                return {
                  children: lodashGet(course, 'user_progress.cp'),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('p')
        ? [
            {
              title: t1('score'),
              render: (row) => {
                const { course } = getDataFromRow(row);
                return {
                  children: lodashGet(course, 'user_progress.p'),
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('oe_question')
        ? [
            {
              title: t1('oe_question'),
              render: (row) => {
                const { course } = getDataFromRow(row);
                return {
                  children: lodashGet(course, 'open_ended_takes')
                    ? lodashGet(course, 'open_ended_takes').map(
                        (take, index) => (
                          <OpenEndedTake take={take} index={index} />
                        ),
                      )
                    : null,
                };
              },
            },
          ]
        : []),
      ...(!(columnsNotToShow || []).includes('passed')
        ? [
            {
              title: t1('passed'),
              className: 'text-center',
              render: (row) => {
                return getRubricColumnRender(row, rootRubric, getDataFromRow);
              },
            },
          ]
        : []),
      ...columnsToRenderRubrics(
        lodashGet(rootRubric, 'children') || [],
        getDataFromRow,
      ),
      ...(!(columnsNotToShow || []).includes('progress')
        ? [
            {
              width: width.progress,
              title: t1('progress'),
              className: 'text-center',
              render: (row) => {
                const {
                  enrolmentPlanRowSpan,
                  user,
                  enrolmentPlan,
                } = getDataFromRow(row);
                return {
                  props: {
                    rowSpan: enrolmentPlanRowSpan,
                  },
                  children: isEnrolmentPlanExecuted(enrolmentPlan) && (
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
                        handleClose: true,
                        width: '80%',
                      }}
                    />
                  ),
                };
              },
            },
          ]
        : []),
      {
        title: t1('added_time'),
        key: 'added_time',
        render: (record) =>
          timestampToDateTimeString(
            lodashGet(record, 'relations_with_groups.relations.start_ts', ''),
          ),
      },
      {
        title: t1('expired_time'),
        key: 'expired_time',
        render: (record) =>
          timestampToDateTimeString(
            lodashGet(record, 'relations_with_groups.relations.expire_ts', ''),
          ),
      },
      ...(!(columnsNotToShow || []).includes('action')
        ? [
            {
              width: width.action,
              title: t1('action'),
              render: (row) => {
                const {
                  enrolmentPlanRowSpan,
                  user,
                  enrolmentPlan,
                  rt,
                } = getDataFromRow(row);
                return {
                  props: {
                    rowSpan: enrolmentPlanRowSpan,
                  },
                  children: !noActions && doesEnrolmentPlanMembersNeedApproval && (
                    <React.Fragment>
                      {canEnrolmentPlanMembersBeApproved(enrolmentPlan, rt) &&
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
                      {canEnrolmentPlanMembersBeRejected(enrolmentPlan, rt) &&
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
                  ),
                };
              },
            },
          ]
        : []),
    ];

    const { value, onChange } = this.props;

    let currentSelectedRowKeys = [];
    (modifiedItems || []).forEach((row, index) => {
      const rowId = lodashGet(row, 'id');
      if ((value || []).findIndex((v) => lodashGet(v, 'id') === rowId) !== -1) {
        currentSelectedRowKeys = currentSelectedRowKeys.concat([rowId]);
      }
    });

    return (
      <div>
        <AntdTable
          className="white-background"
          columns={columns}
          dataSource={modifiedItems}
          pagination={false}
          bordered
          size="middle"
          rowKey="id"
          rowSelection={{
            selectedRowKeys: currentSelectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              // TODO: edit so this can be use when search results have more than one page
              onChange(selectedRows);
            },
            columnWidth: width.checkBox,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  confSelector,
  (conf) => ({
    doesEnrolmentPlanMembersNeedApproval: doesEnrolmentPlanMembersNeedApprovalGivenConf(
      conf,
    ),
  }),
);

const fetchRubric = fetchData((props) => {
  const { node } = props;
  const rubricIid = lodashGet(node, 'rubric_iid');

  return {
    baseUrl: apiUrls.fetch_node,
    params: {
      iid: rubricIid,
      ntype: 'skill',
      depth: -1,
    },
    propKey: 'rootRubric',
    fetchCondition: rubricIid,
  };
});

export default makeReduxFormCompatible({})(
  connect(mapStateToProps)(fetchRubric(Results)),
);
