import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class RatingStarsChart extends React.Component {
  render() {
    const { data } = this.props;
    const chartData = [
      {
        name: t1('one_stars'),
        value: data.no_of_one_stars,
      },
      {
        name: t1('two_stars'),
        value: data.no_of_two_stars,
      },
      {
        name: t1('three_stars'),
        value: data.no_of_three_stars,
      },
      {
        name: t1('four_stars'),
        value: data.no_of_four_stars,
      },
      {
        name: t1('five_stars'),
        value: data.no_of_five_stars,
      },
    ];

    const style = {
      height: '300px',
    };

    return (
      <Card title={t2('rating_stars')}>
        <div style={style}>
          <CustomActiveShapePieChart
            data={chartData}
            options={{
              outerRadius: '60%',
              innerRadius: '50%',
              colors: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD'],
            }}
          />
        </div>
      </Card>
    );
  }
}

export default RatingStarsChart;
