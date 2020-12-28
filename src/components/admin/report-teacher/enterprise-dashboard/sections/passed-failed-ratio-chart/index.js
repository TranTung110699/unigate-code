import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class PassedFailedRatioChart extends React.Component {
  render() {
    const { data } = this.props;
    const chartData = [
      {
        name: t1('passed'),
        value: data.passed,
      },
      {
        name: t1('failed'),
        value: data.failed,
      },
    ];

    const style = {
      height: '300px',
    };

    return (
      <Card title={t2('passed/failed_ratio')}>
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

export default PassedFailedRatioChart;
