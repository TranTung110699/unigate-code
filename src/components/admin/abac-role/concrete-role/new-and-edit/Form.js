/* eslint-disable react/prop-types,no-unused-vars,jsx-a11y/anchor-is-valid,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { abacRoleTypes, getOrgTypes } from 'configs/constants';
import { getDomain } from 'utils/selectors';
import NodeNew from 'components/admin/node/new';
import fetchData from 'components/common/fetchData';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import abacRoleSchema from 'components/admin/abac-role/schema/form';
import '../style/new.scss';

class NewConcreteRoleForm extends Component {
  constructor(props) {
    super(props);
    this.requestSuccessful = this.requestSuccessful.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      formid,
      dispatch,
      mode,
      abstractRole,
      appliedTarget,
      domain,
    } = this.props;

    if (
      mode === 'new' &&
      prevProps.abstractRole !== abstractRole &&
      abstractRole
    ) {
      [
        'module_permissions',
        'name',
        'description',
        'organizations',
        'freeze_actions',
      ].forEach((key) => {
        dispatch(change(formid, key, abstractRole[key]));
      });

      let roleCodePrefix =
        (appliedTarget && (appliedTarget.code || appliedTarget.iid)) || domain;
      roleCodePrefix = roleCodePrefix ? `${roleCodePrefix}_` : '';

      dispatch(change(formid, 'code', `${roleCodePrefix}${abstractRole.code}`));
    }
  }

  requestSuccessful = () => {
    //
  };

  render() {
    const {
      mode,
      step,
      node,
      params,
      allPermissionModules,
      searchFormId,
      type,
      abstractRole,
      appliedScope,
      appliedTarget,
    } = this.props;

    const formid = this.props.formid;
    const alternativeApi = this.props.alternativeApi;

    const extraParams =
      mode === 'new'
        ? {
            type,
            applied_scope: appliedScope,
            applied_target: appliedTarget,
          }
        : {};

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
          ...extraParams,
          allPermissionModules,
          sub_type: appliedTarget && appliedTarget.sub_type,
          freeze_actions: (abstractRole && abstractRole.freeze_actions) || 0,
        }}
        className="abstract_role"
        requestSuccessful={
          this.props.requestSuccessful || this.requestSuccessful
        }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const formid = props.formid || 'new_department_role';
  const selector = formValueSelector(formid);
  let abstractRoleIid = selector(state, 'abstract_role');

  const { node } = props;
  if (!abstractRoleIid && node) {
    abstractRoleIid = node.abstract_role;
  }

  return {
    domain: getDomain(state),
    formid,
    abstractRoleIid,
    orgTypes: getOrgTypes(state),
  };
};

const fetchAbstractRoleConfig = (props) => ({
  params: {
    iid: props.abstractRoleIid,
    type: abacRoleTypes.ABSTRACT,
    ntype: 'abac_role',
    editing_syllabus: 1,
  },
  fetchCondition: props.abstractRoleIid,
  propKey: 'abstractRole',
  keyState: 'department_role_abstract_role',
});

const fetchPermissionModulesConfig = (props) => ({
  baseUrl: aApiUrls.get_permission_modules_to_create_role,
  params: {
    abstract_role_iid: props.abstractRoleIid,
  },
  fetchCondition: props.abstractRoleIid,
  propKey: 'allPermissionModules',
  keyState: 'department_role_all_permission_modules',
});

export default connect(mapStateToProps)(
  fetchData(fetchAbstractRoleConfig)(
    fetchData(fetchPermissionModulesConfig)(NewConcreteRoleForm),
  ),
);
