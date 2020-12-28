import React from 'react';
import PropTypes from 'prop-types';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from './search/Layout';
import topMenuSchema from './menu/teacher-menus';

class MajorLayout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema} />
        <Search />
      </div>
    );
  }
}

MajorLayout.propTypes = {
  className: PropTypes.string,
};

MajorLayout.defaultProps = {
  className: '',
};

export default MajorLayout;
