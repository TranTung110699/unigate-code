import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lGet from 'lodash.get';
import { getConf } from 'utils/selectors/index';
import {
  allCreditSyllabusesAreOnlineOnly,
  creditSyllabusHasTags,
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  enableScorm,
} from 'common/conf';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import ProgramResultsOld from './ProgramResults-old';
import ProgramResultsNew from './ProgramResults-new';

class Results extends Component {
  render() {
    const { isFeatureEnabled } = this.props;

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return <ProgramResultsNew {...this.props} />;
    }

    return <ProgramResultsOld {...this.props} />;
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
  ntypesDeepCloneEnable:
    lGet(state, 'domainInfo.conf.ntypes_deep_clone_enable') || [],
  enableScormConfig: enableScorm(state.domainInfo),
  allCreditSyllabusesAreOnlineOnlyConfig: allCreditSyllabusesAreOnlineOnly(
    state.domainInfo,
  ),
  creditSyllabusHasTopEquivalentPositionCodeConfig: creditSyllabusHasTopEquivalentPositionCode(
    state.domainInfo,
  ),
  creditSyllabusLevelsConfig: creditSyllabusLevels(state.domainInfo),
  creditSyllabusHasTagsConfig: creditSyllabusHasTags(state.domainInfo),
  isRoot: lGet(state, 'domainInfo.isRoot'),
  academicCategoriesEnabled: getConf(state).academic_categories_enabled,
});

export default connect(mapStateToProps)(withFeatureFlags()(Results));
