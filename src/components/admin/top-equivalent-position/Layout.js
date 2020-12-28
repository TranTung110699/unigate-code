/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from './search/Layout';
import topMenuSchema from './menu/menuTop';
import { t1 } from 'translate';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('top_equivalent_position')}
          description={t1('top_equivalent_position_description')}
        />
        <Search formid="top-equivalent-position" />
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
