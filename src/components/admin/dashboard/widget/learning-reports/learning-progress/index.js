import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import Loading from 'components/common/loading';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class LearningProgressChart extends React.Component {
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
          keyState: 'organizations_learning_progress',
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
        name: 'has_not_started',
        label: t1('has_not_started'),
        stack: '1',
      },
      {
        name: 'is_studying',
        label: t1('is_studying'),
        stack: '1',
      },
      {
        name: 'completed',
        label: t1('completed'),
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
            colors: chartColorsPallete.LEARNING_PROGRESS,
            yAxisWidth: 200,
          }}
        />
      </div>
    );
  }
}

export default LearningProgressChart;
