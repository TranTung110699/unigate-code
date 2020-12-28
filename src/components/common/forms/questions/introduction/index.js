import React from 'react';
import PropTypes from 'prop-types';

class Introduction extends React.Component {
  render() {
    return <div />;
  }
}

Introduction.propTypes = {
  question: PropTypes.shape(),
};

Introduction.defaultProps = {
  question: {},
};

export default Introduction;
