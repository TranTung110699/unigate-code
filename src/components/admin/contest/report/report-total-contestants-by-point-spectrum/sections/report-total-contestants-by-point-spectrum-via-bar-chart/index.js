import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class ReportTotalContestantsByPointSpectrumViaBarChart extends React.Component {
  render() {
    let { data } = this.props;
    const dataChart = data.map((item) => ({
      name: item.point_spectrum,
      total_contestants: item.total_contestants,
    }));
    const dataKeys = [
      {
        name: 'total_contestants',
        label: t1('total_contestants'),
        stack: '1',
      },
    ];

    return (
      <Card title={t2('report_total_contestants_by_point_via_bar_chart')}>
        <StackedBarChart
          data={dataChart}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.TOTAL_CONTESTANTS,
          }}
        />
      </Card>
    );
  }
}

export default ReportTotalContestantsByPointSpectrumViaBarChart;
