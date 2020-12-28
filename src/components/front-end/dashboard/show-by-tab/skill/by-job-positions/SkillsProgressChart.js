import React from 'react';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import lodashGet from 'lodash.get';

class SkillsProgressChart extends React.Component {
  render() {
    const { skills } = this.props;

    const skillsSummary = {
      hasNotStartedCount: skills.filter((skill) =>
        lodashGet(skill, 'p.notStarted'),
      ).length,
      isLearningCount: skills.filter((skill) =>
        lodashGet(skill, 'p.isLearning'),
      ).length,
      completedCount: skills.filter((skill) =>
        lodashGet(skill, 'p.isCompleted'),
      ).length,
    };

    const chartData = [
      {
        name: t1('has_not_started'),
        value: skillsSummary.hasNotStartedCount,
      },
      {
        name: t1('is_learning'),
        value: skillsSummary.isLearningCount,
      },
      {
        name: t1('completed'),
        value: skillsSummary.completedCount,
      },
    ];

    if (
      skillsSummary.hasNotStartedCount ||
      skillsSummary.isLearningCount ||
      skillsSummary.completedCount
    ) {
      return (
        <div className="skills-progress-chart">
          <PieChart
            data={chartData}
            options={{
              outerRadius: '60%',
              innerRadius: '50%',
              colors: ['#C62828', '#FDD835', '#4CAF50'],
            }}
          />
        </div>
      );
    } else return null;
  }
}

SkillsProgressChart.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape()),
};

SkillsProgressChart.defaultProps = {
  skills: [],
};

export default SkillsProgressChart;
