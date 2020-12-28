import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { searchFormId } from './common';

import Search from './search';
import topMenuSchema from './menu/teacher-menus';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Search formid={searchFormId} />
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
