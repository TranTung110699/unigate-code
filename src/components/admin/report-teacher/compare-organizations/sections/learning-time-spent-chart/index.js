import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { hoursStringify, minuteStringify } from 'utils/Util';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class LearningTimeSpentChart extends React.Component {
  render() {
    const { data, maxLearningTime } = this.props;
    const displayAllowHour = maxLearningTime > 1;
    const dataKeys = [
      {
        name: displayAllowHour
          ? 'averageLearningTimeOfLearners'
          : 'averageLearningTimeOfLearnersByMinute',
        label: t1('average_learning_time_of_learners'),
      },
      {
        name: displayAllowHour
          ? 'averageLearningTimeOfAllUsers'
          : 'averageLearningTimeOfAllUsersByMinute',
        label: t1('average_learning_time_of_all_users'),
      },
    ];
    const convertHoursToDaysMonthsYears = displayAllowHour
      ? hoursStringify(['year', 'month', 'day', 'hour', 'minute'])
      : minuteStringify;

    return (
      <Card title={t2('average_learning_time_spent')}>
        <StackedBarChart
          data={data}
          dataKeys={dataKeys}
          tooltipValueFormatter={convertHoursToDaysMonthsYears}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.AVERAGE_TIME_SPENT,
          }}
        />
      </Card>
    );
  }
}

export default LearningTimeSpentChart;
