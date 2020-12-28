import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class PassedFailedRatioChart extends React.Component {
  render() {
    const { data } = this.props;
    const dataKeys = [
      {
        name: 'passed',
        label: t1('passed'),
        stack: '1',
      },
      {
        name: 'failed',
        label: t1('failed'),
        stack: '1',
      },
    ];

    return (
      <Card title={t2('passed/failed_ratio')}>
        <StackedBarChart
          data={data}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.PASSED_FAILED,
          }}
        />
      </Card>
    );
  }
}

export default PassedFailedRatioChart;
