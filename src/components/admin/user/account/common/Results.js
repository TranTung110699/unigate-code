import React, { Component } from 'react';
import ResultsOld from './Results-old';
import ResultsNew from './Results-new';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import AntdSearchResult from './AntdSearchResult';
import { connect } from 'react-redux';
import AntDateTimePicker from '../../../../../schema-form/elements/ant-date-time-picker';

class Results extends Component {
  render() {
    if (this.props.isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      const { searchFormId } = this.props;
      if (searchFormId === 'abnormal_account_search') {
        return <ResultsNew {...this.props} />;
      }
      return <AntdSearchResult {...this.props} />;
    }
    return <ResultsOld {...this.props} />;
  }
}

export default connect()(withFeatureFlags()(Results));
