import React from 'react';
import PropTypes from 'prop-types';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Form from './Form';
import topMenuSchema from '../menu/teacher-menus';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Form mode="new" step="abstract" />
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
