import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { userOrganizationsSelector } from 'common/selectors';
import { abacRoleTypes } from 'configs/constants';
import fetchData from 'components/common/fetchData';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import routes from 'routes';

class UserOrganizations extends Component {
  renderRolesOfUserInOrganization = (rolesOfUser, organizationIid) => {
    const rolesInOrganizations = (rolesOfUser || []).filter(
      (role) =>
        String(lodashGet(role, 'applied_target.iid')) ===
        String(organizationIid),
    );
    if (rolesInOrganizations.length === 0) {
      return null;
    }

    if (rolesInOrganizations.length === 1) {
      return (
        <div>
          {t1('with_role')}: {rolesInOrganizations[0].name}
        </div>
      );
    }

    return (
      <div>
        {t1('with_roles')}:
        <ul>
          {rolesInOrganizations &&
            rolesInOrganizations.map((role) => <li>{role.name}</li>)}
        </ul>
      </div>
    );
  };

  renderUserOrganizationsAndRoles = (organizations, rolesOfUser) => {
    return (
      <div>
        {t1('organizations')}:
        <ul style={{ listStyleType: 'none' }}>
          {Array.isArray(organizations) &&
            organizations.filter(Boolean).map((item) => (
              <li key={item.iid}>
                <Link
                  className={`${this.cssClass}__node-name`}
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, item, { ntype: 'category' }),
                  )}
                >
                  {item.name}{' '}
                  <span className="text-muted">
                    {' '}
                    ({item.code} {item.org_id && `(id #${item.org_id})`})
                  </span>
                </Link>
                {this.renderRolesOfUserInOrganization(rolesOfUser, item.iid)}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  renderRolesAppliedToAllSchool = (rolesOfUser) => {
    const rolesAppliedToAllSchool = rolesOfUser.filter(
      (role) => role.type === abacRoleTypes.SCHOOL && role.all_organizations,
    );

    if (rolesAppliedToAllSchool.length === 0) {
      return null;
    }

    if (rolesAppliedToAllSchool.length === 1) {
      return (
        <div>
          {t1('school_role')}: {rolesAppliedToAllSchool[0].name}
        </div>
      );
    }

    return (
      <div>
        {t1('school_roles')}:
        <ul>
          {rolesAppliedToAllSchool.map((role) => (
            <li>{role.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { organizations } = this.props;
    let rolesOfUser = (this.props.rolesOfUser || []).filter(Boolean);

    return (
      <div className="menu_widget" style={{ padding: 0 }}>
        <div className="list_blocks">
          {this.renderUserOrganizationsAndRoles(organizations, rolesOfUser)}
          {this.renderRolesAppliedToAllSchool(rolesOfUser)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  userOrganizationsSelector,
  (organizations) => ({
    organizations,
  }),
);

const fetchDataConfig = {
  baseUrl: aApiUrls.get_roles_of_user,
  params: {
    type: abacRoleTypes.SCHOOL,
  },
  keyState: 'user_organization_widget_roles_of_user',
  propKey: 'rolesOfUser',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
};

export default withRouter(
  connect(mapStateToProps)(fetchData(fetchDataConfig)(UserOrganizations)),
);
