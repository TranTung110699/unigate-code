import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getSearchFormId } from './common/utils';
import Search from '../../search/Layout';
import childrenTopMenuSchema from './sub-top-menu';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class DepartmentChildren extends React.Component {
  cssClass = 'admin-department-children';

  render() {
    const { action, className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          schema={childrenTopMenuSchema(
            this.props.node,
            this.props.location.pathname,
          )}
          isSmallSize
        />
        <Search parent={node} formid={getSearchFormId(node)} />
      </div>
    );
  }
}

DepartmentChildren.propTypes = {
  className: PropTypes.string,
};

DepartmentChildren.defaultProps = {
  className: '',
};

export default withRouter(DepartmentChildren);
