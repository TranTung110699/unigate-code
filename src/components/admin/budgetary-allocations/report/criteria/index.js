import React, { Component } from 'react';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import CustomActiveChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class Criteria extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { items } = this.props;
    const dataPresent = [
      {
        name: t1('build_new_course'),
        value: lodashGet(items, 'build_new_course', 0),
      },
      {
        name: t1('build_new_bank_test'),
        value: lodashGet(items, 'build_new_bank_test', 0),
      },
      {
        name: t1('bought_asset'),
        value: lodashGet(items, 'bought_asset', 0),
      },
      {
        name: t1('take_care_of_teacher'),
        value: lodashGet(items, 'take_care_of_teacher', 0),
      },
    ];

    return (
      <div style={{ height: '500px' }}>
        <CustomActiveChart
          data={dataPresent}
          options={{
            outerRadius: '60%',
            innerRadius: '50%',
            colors: ['#216fed', '#36e02a', '#ed2020'],
          }}
        />
      </div>
    );
  }
}
export default Criteria;
