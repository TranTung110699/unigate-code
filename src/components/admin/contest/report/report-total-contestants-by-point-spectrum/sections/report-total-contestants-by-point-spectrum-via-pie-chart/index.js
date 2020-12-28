import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class ReportTotalContestantsByPointSpectrumViaPieChart extends React.Component {
  render() {
    let { data } = this.props;
    const chartData = data.map((item) => ({
      name: item.point_spectrum,
      value: item.total_contestants,
    }));

    const style = {
      height: '300px',
    };

    return (
      <Card
        title={t2('report_total_contestants_by_point_spectrum_via_pie_chart')}
      >
        <div style={style}>
          <CustomActiveShapePieChart
            data={chartData}
            options={{
              outerRadius: '60%',
              innerRadius: '50%',
            }}
          />
        </div>
      </Card>
    );
  }
}

export default ReportTotalContestantsByPointSpectrumViaPieChart;
