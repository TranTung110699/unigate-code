import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import PropTypes from 'prop-types';

import SkillsByJobPositions from './by-job-positions/SkillsByJobPositions';
class StudentSkills extends React.Component {
  render() {
    const { userInfo } = this.props;

    return <SkillsByJobPositions userInfo={userInfo} />;
  }
}

StudentSkills.propTypes = {
  StudentSkills: PropTypes.arrayOf(PropTypes.any),
};

StudentSkills.defaultProps = {
  StudentSkills: [],
};

const mapStateToProps = (state) => {
  const userInfo = state.user.info;
  return {
    userInfo,
  };
};

export default connect(mapStateToProps)(StudentSkills);
