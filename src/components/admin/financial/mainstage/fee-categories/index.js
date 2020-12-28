import React from 'react';
import PropTypes from 'prop-types';
import Search from './search/Layout';

class FeeCategoryLayout extends React.Component {
  render() {
    return <Search />;
  }
}

FeeCategoryLayout.propTypes = {
  className: PropTypes.string,
};

FeeCategoryLayout.defaultProps = {
  className: '',
};

export default FeeCategoryLayout;
