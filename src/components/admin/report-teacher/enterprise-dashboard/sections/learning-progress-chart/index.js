import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class LearningProgressChart extends React.Component {
  render() {
    // Overall learning progress
    const { data } = this.props;
    const chartData = [
      {
        name: t1('has_not_started'),
        value: data.has_not_started,
      },
      {
        name: t1('is_studying'),
        value: data.is_studying,
      },
      {
        name: t1('completed'),
        value: data.completed,
      },
    ];

    const style = {
      height: '300px',
    };

    return (
      <Card title={t2('learning_progress')}>
        <div style={style}>
          <CustomActiveShapePieChart
            data={chartData}
            options={{
              outerRadius: '60%',
              innerRadius: '50%',
              colors: ['#C62828', '#FDD835', '#4CAF50'],
            }}
          />
        </div>
      </Card>
    );
  }
}

export default LearningProgressChart;
