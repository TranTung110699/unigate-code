import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import fetchData from 'components/common/fetchData';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class OverallProgress extends React.Component {
  render() {
    const { overallProgress } = this.props;
    const progressSummary = [
      {
        name: t1('has_not_started'),
        value: get(overallProgress, '0.hasNotStartedCount'),
      },
      {
        name: t1('is_learning'),
        value: get(overallProgress, '0.isLearningCount'),
      },
      {
        name: t1('completed'),
        value: get(overallProgress, '0.completedCount'),
      },
    ];

    const containerStyle = {
      width: '100%',
      height: '100%',
      padding: '5px',
    };

    return (
      <div style={containerStyle}>
        <br />
        <br />
        <br />
        <PieChart
          data={progressSummary}
          options={{
            outerRadius: '60%',
            innerRadius: '50%',
            colors: ['#C62828', '#FDD835', '#4CAF50'],
          }}
        />
      </div>
    );
  }
}

OverallProgress.propTypes = {
  overallProgress: PropTypes.shape(),
};

OverallProgress.defaultProps = {
  overallProgress: {},
};

const fetchOverallProgressConfig = (props) => {
  const enrolmentPlanIid = get(props, 'node.iid');

  return {
    baseUrl: apiUrls.enrolment_plan_overall_progress,
    fetchCondition: get(props, 'node.iid') || get(props, 'trainingPlan.iid'),
    params: {
      enrolment_plan_iid: get(props, 'node.iid'),
      training_plan_iid: get(props, 'trainingPlan.iid'),
    },
    propKey: 'overallProgress',
    keyState: `enrolment_plan_overall_progress_${enrolmentPlanIid}`,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  };
};

export default fetchData(fetchOverallProgressConfig)(OverallProgress);
