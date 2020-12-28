import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

class TeachingExperienceNew extends Component {
  render() {
    const { teacher } = this.props;

    return <Form teacher={teacher} />;
  }
}

TeachingExperienceNew.propTypes = {
  teacher: PropTypes.shape(),
};

TeachingExperienceNew.defaultProps = {
  teacher: {},
};

export default TeachingExperienceNew;
