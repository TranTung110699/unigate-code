import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class RatingStarsChart extends React.Component {
  render() {
    const { data } = this.props;
    const dataKeys = [
      {
        name: 'no_of_one_stars',
        label: t1('1_star'),
        stack: '1',
      },
      {
        name: 'no_of_two_stars',
        label: t1('2_star'),
        stack: '1',
      },
      {
        name: 'no_of_three_stars',
        label: t1('3_star'),
        stack: '1',
      },
      {
        name: 'no_of_four_stars',
        label: t1('4_star'),
        stack: '1',
      },
      {
        name: 'no_of_five_stars',
        label: t1('5_star'),
        stack: '1',
      },
    ];

    return (
      <Card title={t2('rating_stars')}>
        <StackedBarChart
          data={data}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.RATING_STARS,
          }}
        />
      </Card>
    );
  }
}

export default RatingStarsChart;
