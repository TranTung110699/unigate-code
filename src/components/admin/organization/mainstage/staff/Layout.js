import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';
import { getSearchFormId } from './common/utils';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class OrganizationStaffList extends React.Component {
  cssClass = 'admin-department-staff';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />
        <Search formid={getSearchFormId(node)} node={node} />
      </div>
    );
  }
}

OrganizationStaffList.propTypes = {
  className: PropTypes.string,
};

OrganizationStaffList.defaultProps = {
  className: '',
};

export default connect()(OrganizationStaffList);
