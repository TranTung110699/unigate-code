/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid,quotes,no-useless-constructor,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { abacRoleTypes, approvalFlowDefault1 } from 'configs/constants/index';
import { t1 } from 'translate/index';
import lodashGet from 'lodash.get';
import Permission from 'components/common/permission/Permission';
import { SyllabusActions } from 'configs/constants/permission';
// import apiUrls from 'api-endpoints/index';
import aApiUrls from 'components/admin/abac-role/endpoints';
import fetchData from 'components/common/fetchData';
import ApprovalStepper from './ApprovalStepper1';
import ApprovedHistory from './approved-history/Layout';
import Widget from 'components/common/Widget';
import WhatsNext from '../help/WhatsNext';

class ApprovalFlow extends Component {
  constructor(props) {
    super(props);
  }

  getParamsForCheckPermission = (props) => {
    const { node } = props;

    return {
      actions: SyllabusActions,
      resourceIids: node && [node.iid],
      type: abacRoleTypes.SYLLABUS,
    };
  };

  render() {
    const {
      node,
      approvalFlow,
      location,
      dispatch,
      orgIids,
      parentDepartmentIids,
      rolesSyllabusFlow,
      permissions,
      hasPermission,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Widget title={t1('approval_flow')}>
              <ApprovalStepper
                approvalFlow={approvalFlow}
                node={node}
                orgIids={orgIids}
                rolesSyllabusFlow={rolesSyllabusFlow}
                parentDepartmentIids={parentDepartmentIids}
                permissions={permissions}
                hasPermission={hasPermission}
                location={location}
                dispatch={dispatch}
              />
            </Widget>

            {node.status === 'approved' && (
              <Widget title={t1("what's_next")}>
                <WhatsNext node={node} />
              </Widget>
            )}
          </div>

          <div className="col-md-6">
            <Widget title={t1('approval_and_comment_history')}>
              <ApprovedHistory node={node} />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

const fetchRolesSyllabusFlow = (props) => ({
  baseUrl: aApiUrls.get_abac_roles_for_syllabus_flow,
  params: {
    iid: props.node.iid,
  },
  propKey: 'rolesSyllabusFlow',
  keyState: 'roles_syllabus_flow',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
});

const mapStateToProps = (state) => {
  const orgs = lodashGet(state, 'user.info.organizations'); // || [];
  const orgIids = lodashGet(state, 'user.info.user_organizations'); // || [];

  let parentDepartmentIids =
    orgs && orgs.length
      ? orgs.map((org) => {
          const ancestorIids = org.ancestor_iids || [];

          return ancestorIids.length > 0 ? ancestorIids[0] : 0;
        })
      : [];

  parentDepartmentIids = parentDepartmentIids.filter(
    (parentDepartmentIid) => parentDepartmentIid > 0,
  );

  return {
    approvalFlow:
      lodashGet(state, 'domainInfo.school.approval_flow') ||
      approvalFlowDefault1,
    orgIids,
    parentDepartmentIids,
  };
};

export default connect(mapStateToProps)(
  fetchData(fetchRolesSyllabusFlow)(Permission(ApprovalFlow)),
);
