/* eslint-disable jsx-a11y/anchor-is-valid,no-undef,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/abac-role/concrete-role/search';
import { abacRoleTypes } from 'configs/constants';
import New from './new';
import { getSearchFormId } from './common/utils';

class ContestRole extends React.Component {
  cssClass = 'admin-course-role';

  render() {
    const {
      className,
      node,
      action,
      location,
      hasPermission,
      permissions,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        {action === 'new' ? (
          <New node={node} />
        ) : (
          <Search
            step={'course'}
            type={abacRoleTypes.COURSE}
            formid={getSearchFormId(node)}
            appliedScope={'course'}
            node={node}
            location={location}
            hasPermission={hasPermission}
            permissions={permissions}
          />
        )}
      </div>
    );
  }
}

ContestRole.propTypes = {
  className: PropTypes.string,
};

ContestRole.defaultProps = {
  className: '',
};

export default connect()(ContestRole);
