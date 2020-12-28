/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import NodeNew from 'components/admin/node/new';
import fetchData from 'components/common/fetchData';
import { abacRoleTypes, getOrgTypes } from 'configs/constants';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import abacRoleSchema from 'components/admin/abac-role/schema/form';
import '../../abac-role/concrete-role/style/new.scss';

class Form extends Component {
  componentDidMount() {
    const { dispatch, formid } = this.props;
    dispatch(change(formid, 'update_applied_roles_permission', 0));
  }

  render() {
    const {
      mode,
      step,
      node,
      params,
      searchFormId,
      allPermissionModules,
      formid,
      orgTypes,
    } = this.props;
    const alternativeApi = this.props.alternativeApi;

    return (
      <NodeNew
        ntype={'abac_role'}
        schema={abacRoleSchema}
        mode={mode}
        step={step}
        node={node}
        closeModal
        alternativeApi={alternativeApi}
        formid={formid}
        searchFormId={searchFormId}
        params={{
          ...params,
          type: abacRoleTypes.ABSTRACT,
          allPermissionModules,
          orgTypes,
        }}
        className="abstract_role"
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const formid = props.formid || 'new_abstract_role';
  const selector = formValueSelector(formid);
  let appliedScope = selector(state, 'applied_scope');

  const { node } = props;
  if (!appliedScope && node) {
    appliedScope = node.applied_scope;
  }

  return {
    formid,
    appliedScope,
    orgTypes: getOrgTypes(state),
  };
};

const fetchDataConfig = (props) => ({
  baseUrl: aApiUrls.get_permission_modules_to_create_role,
  fetchCondition: props.appliedScope,
  params: {
    create_abstract_role: 1,
    applied_scope: props.appliedScope,
  },
  propKey: 'allPermissionModules',
  keyState: 'abstract_role_all_permission_modules',
});

export default connect(mapStateToProps)(fetchData(fetchDataConfig)(Form));
