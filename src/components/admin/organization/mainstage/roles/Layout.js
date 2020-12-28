/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/abac-role/concrete-role/search';
import { abacRoleTypes } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import New from './new';
import { getSearchFormId } from './common/utils';
import rolesTopMenuSchema from './sub-top-menu';

class DepartmentRole extends React.Component {
  cssClass = 'admin-department-role';

  render() {
    const { className, node, action, location } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          schema={rolesTopMenuSchema(null, this.props)}
          isSmallSize
        />

        {action === 'new' ? (
          <New organization={node} />
        ) : (
          <Search
            step={'school'}
            type={abacRoleTypes.SCHOOL}
            formid={getSearchFormId(node)}
            node={node}
            location={location}
          />
        )}
      </div>
    );
  }
}

DepartmentRole.propTypes = {
  className: PropTypes.string,
};

DepartmentRole.defaultProps = {
  className: '',
};

export default connect()(DepartmentRole);
