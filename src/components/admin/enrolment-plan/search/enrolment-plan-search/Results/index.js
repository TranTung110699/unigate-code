import React, { Component } from 'react';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import EnrolmentPlanResultsOld from './Results-old';
import EnrolmentPlanResultsNew from './Results-new';

class Results extends Component {
  render() {
    const { isFeatureEnabled } = this.props;

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return <EnrolmentPlanResultsNew {...this.props} />;
    }

    return <EnrolmentPlanResultsOld {...this.props} />;
  }
}

export default withFeatureFlags()(Results);
