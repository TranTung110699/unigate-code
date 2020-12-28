import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import Loading from 'components/common/loading';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class PassedFailedRatioChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: null,
    };
  }

  componentWillMount() {
    const { dispatch, orgIids } = this.props;

    dispatch(
      sagaActions.getDataRequest(
        {
          // config
          url: apiUrls.organizations_learning_reports,
          keyState: 'organizations_passed_failed_ratio',
          executeOnSuccess: (data = []) => {
            this.setState({
              chartData: data,
            });
          },
        },
        {
          // params
          user_organizations: orgIids,
          user_organization_get_children_level_one: true,
        },
      ),
    );
  }

  render() {
    const { chartData } = this.state;
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

    if (!chartData) {
      return <Loading />;
    }

    return (
      <div className="bar-chart">
        <StackedBarChart
          data={chartData}
          dataKeys={dataKeys}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.PASSED_FAILED,
            yAxisWidth: 200,
          }}
        />
      </div>
    );
  }
}

export default PassedFailedRatioChart;
