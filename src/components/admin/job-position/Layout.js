import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Search from './search/Layout';
import topMenuSchema from './menu/teacher-menus';
import { t1 } from 'translate';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('job_position')}
          description={t1('job_position_description')}
        />
        <Search />
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default Layout;
