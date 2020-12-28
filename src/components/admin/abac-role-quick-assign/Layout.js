/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { connect } from 'react-redux';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import { abacRoleTypes } from 'configs/constants';
import schema from './schema';
import actions from '../../../actions/node/creators';

class Layout extends React.Component {
  render() {
    const { mode, node, params, orgTypes, dispatch } = this.props;
    const formid = 'add_new_multi_roles';
    const abacRoleAppliedScopeOptions = () => [
      {
        value: 'school',
        primaryText: `${t1('school')}`,
        label: `${t1('school')}`,
      },
      {
        value: 'organization',
        primaryText: `${t1('organization')}`,
        label: `${t1('organization')}`,
      },
      {
        value: 'academic_category',
        primaryText: `${t1('academic_category')}`,
        label: `${t1('academic_category')}`,
      },
    ];

    return (
      <NodeNew
        ntype={'abac_role'}
        schema={schema}
        mode={mode}
        step={'quick_assign_roles'}
        node={node}
        alternativeApi={aApiUrls.abac_role_assign_multi_user_as_roles}
        formid={formid}
        params={{
          ...params,
          type: abacRoleTypes.ABSTRACT,
          abacRoleAppliedScopeOptions,
          orgTypes,
        }}
        requestSuccessful={(data) => {
          dispatch(actions.snackbar(data.success, data.message));
        }}
      />
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const allOrgTypes = getLodash(state, 'domainInfo.school.org_types') || [];
  const orgTypes = allOrgTypes.filter((orgType) => orgType.has_perm);

  return {
    orgTypes,
  };
};

export default connect(mapStateToProps)(Layout);
