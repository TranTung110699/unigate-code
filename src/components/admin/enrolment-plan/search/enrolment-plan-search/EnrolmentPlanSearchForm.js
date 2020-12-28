import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import {
  enrolmentPlanHasLocation,
  hasOrganization,
  hasTrainingPlan as hasTrainingPlanFunc,
} from 'common/conf';
import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { defaultStatuses } from '../common';
import Results from './Results/index';
import schema from '../schema';
import schemaAdvance from '../schema-advance';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class EnrolmentPlanSearchForm extends Component {
  getFormId = () => this.props.formid || 'enrolment_plan_search';

  renderResultComponent = (items, props) => {
    return <Results {...props} items={items} />;
  };

  render() {
    const {
      trainingPlan,
      noSearchForm,
      isFeatureEnabled,
      hiddenFields,
      searchSubOrganization,
    } = this.props;

    return (
      <SearchWrapper
        schema={
          noSearchForm
            ? undefined
            : isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? schemaAdvance
            : schema
        }
        defaultValues={{
          status: defaultStatuses,
        }}
        showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
        formid={this.getFormId()}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.enrolment_plan_search}
        destroyOnUnmount
        noResultText={t1('no_enrolment_plans')}
        searchSubOrganization={searchSubOrganization}
      />
    );
  }
}

const mapStateToProps = createSelector(
  (state) => enrolmentPlanHasLocation(state.domainInfo),
  (state) => hasTrainingPlanFunc(state.domainInfo),
  (state) => hasOrganization(state.domainInfo),
  (hasLocation, hasTrainingPlan, isOrganization) => ({
    hasLocation,
    hasTrainingPlan,
    isOrganization,
  }),
);

export default withSchoolConfigs(
  connect(mapStateToProps)(withFeatureFlags()(EnrolmentPlanSearchForm)),
);
