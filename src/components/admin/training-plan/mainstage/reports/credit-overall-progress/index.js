import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/admin/enrolment-plan/mainstage/credit-overall-progress/search/index';

class CreditOverallProgress extends React.Component {
  render() {
    const { node, trainingPlan } = this.props;
    return (
      <Search
        formid={`enrolment_plan_credit_overall_progress_${node &&
          node.iid}_${trainingPlan && trainingPlan.iid}`}
        node={node}
        trainingPlan={trainingPlan}
      />
    );
  }
}

CreditOverallProgress.propTypes = {
  node: PropTypes.shape(),
};

CreditOverallProgress.defaultProps = {
  node: {},
};

export default CreditOverallProgress;
