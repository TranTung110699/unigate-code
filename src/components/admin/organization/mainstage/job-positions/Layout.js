import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JobPositionSearch from 'components/admin/job-position/search/search/Layout';
import { getSearchFormId } from './common/utils';
import jobPositionsTopMenuSchema from './sub-top-menu';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class DepartmentJobPositions extends React.Component {
  cssClass = 'admin-department-job-positions';

  render() {
    const { node, action } = this.props;

    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          schema={jobPositionsTopMenuSchema(null, this.props)}
          isSmallSize
        />

        <JobPositionSearch formid={getSearchFormId(node)} organization={node} />
      </div>
    );
  }
}

DepartmentJobPositions.propTypes = {
  className: PropTypes.string,
};

DepartmentJobPositions.defaultProps = {
  className: '',
};

export default connect()(DepartmentJobPositions);
