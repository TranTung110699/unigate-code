import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  enrolmentPlanHasLocation,
  hasOrganization,
  hasTrainingPlan as hasTrainingPlanFunc,
} from 'common/conf';
import Results from './enrolment-plan-search/EnrolmentPlanSearchForm';
import { layouts } from 'configs/constants';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

class EnrolmentPlanSearchLayout extends Component {
  getFormId = () => this.props.formid || 'enrolment_plan_search';

  renderResultComponent = (items) => {
    const { hasTrainingPlan, hasLocation, layout } = this.props;

    let cols;
    if (this.props.columnsNotToShow) cols = [...this.props.columnsNotToShow];
    else cols = [];

    if (!hasLocation) {
      cols = [...cols, 'location'];
    }
    if (!hasTrainingPlan) cols = [...cols, 'training_plan'];
    if (layout === layouts.VT) cols = [...cols, 'staff'];

    return (
      <Results
        formid={this.getFormId()}
        items={items}
        columnsNotToShow={cols}
        {...this.props}
      />
    );
  };

  render() {
    const { trainingPlan, items } = this.props;

    let hiddenFields = this.props.hiddenFields || {};
    hiddenFields = {
      _sand_expand: [
        'organizations',
        'academic_categories',
        'training_plan_iid',
        'number_of_members',
      ],
      ...hiddenFields,
    };

    if (trainingPlan) {
      hiddenFields = {
        ...hiddenFields,
        training_plan_iid: trainingPlan.iid,
      };
    }

    return (
      <Results
        formid={this.getFormId()}
        items={items}
        {...this.props}
        hiddenFields={hiddenFields}
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
  connect(mapStateToProps)(EnrolmentPlanSearchLayout),
);
