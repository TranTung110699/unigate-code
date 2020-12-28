/* eslint-disable no-undef,jsx-a11y/anchor-is-valid,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import routes from 'routes';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import Search from 'components/admin/user-abac-role/staff/search/Layout';
import { getSearchFormId } from 'components/admin/user-abac-role/staff/common/utils';
import StaffHorizontalNav from '../StaffHorizontalNav';
import ButtonNew from 'components/admin/user-abac-role/staff/new-staff/ButtonNew';
import { SyllabusActions } from 'configs/constants/permission';

class SyllabusStaff extends React.Component {
  cssClass = 'admin-resource-staff';

  render() {
    const { className, node, hasPermission, permissions, action } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    const hasPermissionManagerCollaborator =
      hasPermission &&
      hasPermission(
        SyllabusActions.SYLLABUS_ACTION_MANAGE_COLLABORATORS,
        node && node.iid,
        permissions,
      );

    return (
      <div className={componentClassName}>
        <StaffHorizontalNav
          {...this.props}
          content={
            <React.Fragment>
              <Search
                formid={getSearchFormId(node)}
                node={node}
                appliedScope={'syllabus'}
                permissions={permissions}
                hasPermission={hasPermission}
              />

              <hr
                style={{
                  borderTop: '.82px solid #d0c9c9eb',
                }}
              />
              {hasPermissionManagerCollaborator && (
                <ButtonNew
                  searchFormId={getSearchFormId(node)}
                  node={node}
                  ntype={'syllabus'}
                />
              )}
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

SyllabusStaff.propTypes = {
  className: PropTypes.string,
};

SyllabusStaff.defaultProps = {
  className: '',
};

export default withRouter(connect()(SyllabusStaff));
