import React from 'react';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import fetchData from 'components/common/fetchData';

class CreditsProgress extends React.Component {
  render() {
    const { progressOfCredits } = this.props;

    if (!Array.isArray(progressOfCredits) || progressOfCredits.length === 0)
      return null;

    return progressOfCredits.map((item, index) => {
      const creditSyllabus = lodashGet(item, 'credit_syllabus');

      const progressSummary = [
        {
          name: t1('has_not_started'),
          value: lodashGet(item, 'hasNotStartedCount'),
        },
        {
          name: t1('is_learning'),
          value: lodashGet(item, 'isLearningCount'),
        },
        {
          name: t1('completed'),
          value: lodashGet(item, 'completedCount'),
        },
      ];

      return (
        <div
          key={lodashGet(item, 'id')}
          style={{
            width: '100%',
            height: 300,
            padding: '5px',
          }}
        >
          <div>
            {index + 1}. {lodashGet(creditSyllabus, 'name')}
          </div>
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
    });
  }
}

CreditsProgress.propTypes = {};

CreditsProgress.defaultProps = {};

const fetchCreditProgressConfig = (props) => {
  return {
    baseUrl: apiUrls.enrolment_plan_credit_progress,
    fetchCondition: lodashGet(props, 'node.iid'),
    params: {
      enrolment_plan_iid: lodashGet(props, 'node.iid'),
    },
    propKey: 'progressOfCredits',
    keyState: `enrolment_plan_credit_progress_${lodashGet(props, 'node.iid')}`,
  };
};

export default fetchData(fetchCreditProgressConfig)(CreditsProgress);
