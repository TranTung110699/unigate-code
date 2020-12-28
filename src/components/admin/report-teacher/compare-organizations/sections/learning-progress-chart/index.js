import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class LearningProgressChart extends React.Component {
  render() {
    const { data } = this.props;
    const dataKeys = [
      {
        name: 'has_not_started',
        label: t1('has_not_started'),
        stack: '1',
      },
      {
        name: 'is_studying',
        label: t1('is_studying'),
        stack: '1',
      },
      {
        name: 'completed',
        label: t1('completed'),
        stack: '1',
      },
    ];

    return (
      <Card title={t2('learning_progress')}>
        <StackedBarChart
          data={data}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.LEARNING_PROGRESS,
          }}
        />
      </Card>
    );
  }
}

export default LearningProgressChart;
