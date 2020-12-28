import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';
import { getSearchFormId } from './common/utils';
import SubTopMenuContext from '../../../../../common/context/menu/SubMenuTop';

class OrganizationMembers extends React.Component {
  cssClass = 'admin-department-students';

  render() {
    const { className, node, action } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />
        <Search formid={getSearchFormId(node)} node={node} action={action} />
      </div>
    );
  }
}

OrganizationMembers.propTypes = {
  className: PropTypes.string,
};

OrganizationMembers.defaultProps = {
  className: '',
};

export default connect()(OrganizationMembers);
