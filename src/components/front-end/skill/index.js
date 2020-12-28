import React, { Component } from 'react';
import { connect } from 'react-redux';
import { schoolTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import AdaptiveSkillForTesting from './adaptive-skill-for-testing';
import UserGoalSkills from './user-goal-skills';

class Index extends Component {
  render() {
    const { themeConfig, node } = this.props;

    if (themeConfig.types && schoolTypes.TESTING === themeConfig.types) {
      return <AdaptiveSkillForTesting />;
    } else {
      return <UserGoalSkills node={node} />;
    }
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(Index);
