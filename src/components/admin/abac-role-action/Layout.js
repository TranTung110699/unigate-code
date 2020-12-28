/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Search from './search/Layout';

class Layout extends React.Component {
  render() {
    return <Search />;
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default Layout;
