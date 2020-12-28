import React from 'react';
import PropTypes from 'prop-types';
import Search from './search';

class CreditOverallProgress extends React.Component {
  columnsNotToShow = ['enrolment_plan'];

  render() {
    const { node, trainingPlan } = this.props;
    return (
      <Search
        formid={`enrolment_plan_credit_overall_progress_${node &&
          node.iid}_${trainingPlan && trainingPlan.iid}`}
        node={node}
        columnsNotToShow={this.columnsNotToShow}
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
