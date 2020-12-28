/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import userAbacRoleSchema from 'components/admin/user-abac-role/schema/form';

class RoleEditorForm extends Component {
  render() {
    const {
      type,
      appliedTarget,
      user,
      searchFormId,
      userRolesInAppliedTarget,
    } = this.props;

    const alternativeApi = this.props.alternativeApi;
    const appliedTargetIid = appliedTarget && appliedTarget.iid;
    const formid = this.props.formid || `edit_user_roles_${appliedTargetIid}`;

    return (
      <NodeNew
        ntype={'user_abac_role'}
        schema={userAbacRoleSchema}
        mode={'edit'}
        step={type}
        node={Object.assign({
          role_iids: Array.isArray(userRolesInAppliedTarget)
            ? userRolesInAppliedTarget.map((role) => role && role.iid)
            : [],
        })}
        closeModal
        alternativeApi={alternativeApi}
        formid={formid}
        searchFormId={searchFormId}
        params={{
          user_iid: user && user.iid,
          applied_target_iid: appliedTargetIid,
          fetchRoleOptionParams: {
            type,
            applied_target_iid: appliedTargetIid,
          },
        }}
        requestSuccessful={this.props.requestSuccessful}
      />
    );
  }
}

export default fetchData((props) => ({
  baseUrl: aApiUrls.get_roles_of_user_in_applied_target,
  params: {
    applied_target_iid: props.appliedTarget && props.appliedTarget.iid,
    user_iid: props.user && props.user.iid,
  },
  keyState: 'edit_user_roles_list',
  propKey: 'userRolesInAppliedTarget',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(RoleEditorForm);
