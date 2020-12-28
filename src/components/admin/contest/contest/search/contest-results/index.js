import React, { Component } from 'react';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import ContestResultNew from './Results-new';
import ContestResultOld from './Results';

class Results extends Component {
  render() {
    const { isFeatureEnabled } = this.props;

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return <ContestResultNew {...this.props} />;
    }

    return <ContestResultOld {...this.props} />;
  }
}

export default withFeatureFlags()(Results);
