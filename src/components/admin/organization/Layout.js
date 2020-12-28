import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from './search/Layout';
import topMenuSchema from './menu/teacher-menus';
import get from 'lodash.get';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes } from 'configs/constants';
import { t1 } from 'translate';

class DepartmentLayout extends React.Component {
  render() {
    const { domainInfo, isSIS } = this.props;

    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema({ domainInfo })}
          lastBreadcrumbName={t1('organization')}
          description={t1('organization_description')}
        />
        <Search getOnlyOrganizationWhereUserHasPermission={isSIS ? 0 : 1} />
      </div>
    );
  }
}

DepartmentLayout.propTypes = {
  className: PropTypes.string,
};

DepartmentLayout.defaultProps = {
  className: '',
};

function mapStateToProps(state) {
  return {
    domainInfo: state.domainInfo,
    isSIS: get(getThemeConfig(state), 'type') === schoolTypes.SIS,
  };
}

export default connect(mapStateToProps)(DepartmentLayout);
