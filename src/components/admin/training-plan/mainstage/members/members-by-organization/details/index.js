import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import fetchNodes from 'components/common/fetchNodes';
import { getTitle } from './common';
import CheckPermission from 'components/common/CheckPermission';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import lodashGet from 'lodash.get';

class Detail extends Component {
  renderContentWithActions = () => {
    const { trainingPlan, organization } = this.props;
    return (
      trainingPlan &&
      organization && <Search node={trainingPlan} organization={organization} />
    );
  };

  renderContentDisableAllActions = () => {
    const { trainingPlan, organization } = this.props;
    return (
      trainingPlan &&
      organization && (
        <Search
          noLink
          noActions
          columnsNotToShow={['action']}
          node={trainingPlan}
          organization={organization}
        />
      )
    );
  };

  render() {
    const {
      trainingPlan,
      organization,
      areAllEnrolmentPlansOfTrainingPlanExecuted,
    } = this.props;
    return (
      <div style={{ padding: 20 }}>
        <h1>{getTitle(trainingPlan, organization)}</h1>
        {areAllEnrolmentPlansOfTrainingPlanExecuted ? (
          this.renderContentDisableAllActions()
        ) : (
          <CheckPermission
            renderOnSuccess={this.renderContentWithActions}
            renderOnFailure={this.renderContentDisableAllActions}
            actions={['staff']}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { training_plan_iid, organization_iid },
    },
  } = props;

  return {
    trainingPlan: {
      iid: training_plan_iid,
      ntype: 'training_plan',
    },
    organization: {
      iid: organization_iid,
      ntype: 'category',
    },
  };
};

const fetchNodeConfig = [
  {
    nodePropName: 'trainingPlan',
    depth: -1,
    fullNodePropName: 'trainingPlan',
  },
  {
    nodePropName: 'organization',
    depth: -1,
    fullNodePropName: 'organization',
  },
];

const fetchIfAllEnrolmentPlansOfTrianingPlanAreExecutedConfig = (props) => ({
  baseUrl: tpApiUrls.are_all_enrolment_plans_of_training_plan_executed,
  fetchCondition: lodashGet(props, 'trainingPlan.iid'),
  params: {
    training_plan_iid: lodashGet(props, 'trainingPlan.iid'),
  },
  propKey: 'areAllEnrolmentPlansOfTrainingPlanExecuted',
  keyState: `are_all_enrolment_plans_of_training_plan_executed_${lodashGet(
    props,
    'trainingPlan.iid',
  )}`,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
});

export default connect(mapStateToProps)(
  fetchNodes(fetchNodeConfig)(
    fetchData(fetchIfAllEnrolmentPlansOfTrianingPlanAreExecutedConfig)(Detail),
  ),
);
