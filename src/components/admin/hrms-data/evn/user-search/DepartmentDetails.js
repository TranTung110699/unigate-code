import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';

class DepartmentDetails extends Component {
  render() {
    const { orgs, deptId } = this.props;
    const { parentOrgsByDeptIdOnSharedDb, currentUserOrgs } = orgs || {};

    return (
      <div>
        <div>
          <h1>Đơn vị của user trên Shared DB</h1>
          {deptId}
        </div>
        <h1>Thông tin về đơn vị này trên Elearning</h1>
        {Array.isArray(parentOrgsByDeptIdOnSharedDb) &&
          parentOrgsByDeptIdOnSharedDb.length &&
          parentOrgsByDeptIdOnSharedDb
            .reverse()
            .map((org) => <div>{org.name}</div>)}

        <div>
          <h1>Đơn vị của user trên Elearning </h1>
        </div>
        <div>
          {Array.isArray(currentUserOrgs) &&
            currentUserOrgs.length &&
            currentUserOrgs.reverse().map((org) => <div>{org.name}</div>)}
        </div>
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: '/organization/api/get-department',
  params: {
    id: getLodash(props, 'deptId'),
    ns_id: getLodash(props, 'nsId'),
  },
  propKey: 'orgs',
  fetchCondition: getLodash(props, 'deptId'),
  refetchCondition: (prevProps) => {
    return getLodash(props, 'deptId') != getLodash(prevProps, 'deptId');
  },
}))(DepartmentDetails);
