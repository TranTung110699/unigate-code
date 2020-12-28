/* eslint-disable no-undef,jsx-a11y/anchor-is-valid,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/user-abac-role/staff/search/Layout';
import { getSearchFormId } from 'components/admin/user-abac-role/staff/common/utils';

class ResourceStaff extends React.Component {
  cssClass = 'admin-resource-staff';

  render() {
    const { className, node, hasPermission, permissions } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search
          formid={getSearchFormId(node)}
          node={node}
          appliedScope={'course'}
          hasPermission={hasPermission}
          permissions={permissions}
        />
      </div>
    );
  }
}

ResourceStaff.propTypes = {
  className: PropTypes.string,
};

ResourceStaff.defaultProps = {
  className: '',
};

export default connect()(ResourceStaff);
