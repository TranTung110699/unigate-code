import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { createSelector } from 'reselect';
import { getDomainInfo } from 'utils/selectors';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import Icon from 'components/common/Icon';
import Link from 'components/common/router/Link';
import StaffList from 'components/common/staff-list';
import routes from 'routes';
import {
  enrolmentPlanStatuses,
  enrolmentPlanStatusToText,
  enrolmentPlanTypeToText,
} from 'configs/constants/enrolmentPlan';
import {
  hasAcademicCategories as checkDomainInfoHasAcademicCategories,
  hasOrganization as checkDomainInfoHasOrganization,
} from 'common/conf';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import lodashGet from 'lodash.get';

import Table from 'antd/lib/table';
import { showInTable } from 'common/utils/antd';
import ShowListMore from 'components/common/show-list-more';

class Results extends Component {
  render() {
    const {
      items,
      formid,
      columnsNotToShow,
      hasOrganization,
      hasAcademicCategories,
    } = this.props;

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, { ntype: 'enrolment_plan' }),
            )}
          >
            {code}
          </Link>
        ),
      },
      {
        title: t1('staff'),
        key: 'staff',
        dataIndex: 'u',
        render: (u) => <StaffList staff={[u]} />,
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
        render: (name, item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, { ntype: 'enrolment_plan' }),
            )}
          >
            {name}
          </Link>
        ),
      },
      {
        title: t1('number_of_members'),
        key: 'number_of_members',
        render: (item) => lodashGet(item, '__expand.number_of_members') || 0,
      },
      {
        title: t1('type'),
        key: 'type',
        dataIndex: 'type',
        render: (type) => enrolmentPlanTypeToText(type),
      },
      {
        title: t1('training_plan'),
        key: 'training_plan',
        render: (item) => lodashGet(item, '__expand.training_plan_iid.name'),
      },
      ...(hasOrganization
        ? [
            {
              title: t1('organizations'),
              key: 'organizations',
              render: (item) => (
                <OrganizationsOrPhongBan item={item} attr={'organizations'} />
              ),
            },
            // {
            //   title: t1('accessible_in_sub_organizations'),
            //   key: 'accessible_in_sub_organizations',
            //   render: (item) =>
            //     lodashGet(item, 'accessible_in_sub_organizations')
            //       ? t1('yes')
            //       : t1('no'),
            // },
          ]
        : []),
      {
        title: t1('location'),
        key: 'location',
        render: (item) => lodashGet(item, 'location'),
      },
      ...(hasAcademicCategories
        ? [
            {
              title: t1('academic_categories'),
              key: 'academic_categories',
              render: (item) => (
                <ShowListMore
                  list={lodashGet(item, '__expand.academic_categories')}
                />
              ),
            },
          ]
        : []),
      {
        title: t1('start_date'),
        key: 'start_date',
        dataIndex: 'start_date',
        render: (startDate) => timestampToDateTimeString(startDate),
      },
      {
        title: t1('end_date'),
        key: 'end_date',
        dataIndex: 'end_date',
        render: (endDate) => timestampToDateTimeString(endDate),
      },
      {
        title: t1('stop_inviting_date'),
        key: 'stop_inviting_date',
        dataIndex: 'stop_inviting_date',
        render: (stopInvitingDate) =>
          timestampToDateTimeString(stopInvitingDate),
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (status) => enrolmentPlanStatusToText(status),
      },
      {
        title: t1('action'),
        key: 'action',
        render: (item) => (
          <React.Fragment>
            <Link
              to={routes.url(
                'node_edit',
                Object.assign({}, item, { ntype: 'enrolment_plan' }),
              )}
            >
              <Icon icon={'edit'} title={t1('edit')} />
            </Link>
          </React.Fragment>
        ),
      },
      {
        title: t1('delete'),
        key: 'delete',
        render: (item) => (
          <React.Fragment>
            {item.status !== enrolmentPlanStatuses.DELETED && (
              <DeleteBtn
                formid={formid}
                ntype={'enrolment_plan'}
                itemId={item.id}
              />
            )}
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={showInTable(columns, columnsNotToShow)}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = createSelector(
  getDomainInfo,
  (domainInfo) => ({
    hasOrganization: checkDomainInfoHasOrganization(domainInfo),
    hasAcademicCategories: checkDomainInfoHasAcademicCategories(domainInfo),
  }),
);

export default connect(mapStateToProps)(Results);
