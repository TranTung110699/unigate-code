import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t1 } from 'translate';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class NoOfCreditSyllabusesChart extends React.Component {
  render() {
    const { data } = this.props;
    const dataKeys = [
      {
        name: 'no_of_credit_syllabuses',
        label: t1('no_of_credit_syllabuses'),
      },
    ];

    return (
      <Card title={t1('number_of_credit_syllabuses')}>
        <StackedBarChart
          data={data}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.NO_OF_CREDIT_SYLLABUSES,
          }}
        />
      </Card>
    );
  }
}

export default NoOfCreditSyllabusesChart;
