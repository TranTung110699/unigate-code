import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { hoursStringify } from 'utils/Util';
import sagaActions from 'actions/node/saga-creators';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import Loading from 'components/common/loading';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class LearningTimeSpentChart extends React.Component {
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
          keyState: 'organizations_learning_time_spent',
          executeOnSuccess: (data = []) => {
            const mappedData = data.map((item) => ({
              name: item.name,
              averageLearningTimeOfLearners: item.no_of_learners
                ? parseFloat((item.spent_time / item.no_of_learners).toFixed(1))
                : 0,
              averageLearningTimeOfAllUsers: item.no_of_users
                ? parseFloat((item.spent_time / item.no_of_users).toFixed(1))
                : 0,
            }));

            this.setState({
              chartData: mappedData,
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
        name: 'averageLearningTimeOfLearners',
        label: t1('average_learning_time_of_learners'),
      },
      {
        name: 'averageLearningTimeOfAllUsers',
        label: t1('average_learning_time_of_all_users'),
      },
    ];
    const convertHoursToDaysMonthsYears = hoursStringify([
      'year',
      'month',
      'day',
      'hour',
    ]);

    if (!chartData) {
      return <Loading />;
    }

    return (
      <div className="bar-chart">
        <StackedBarChart
          data={chartData}
          dataKeys={dataKeys}
          tooltipValueFormatter={convertHoursToDaysMonthsYears}
          options={{
            layout: layoutOrientations.VERTICAL,
            colors: chartColorsPallete.AVERAGE_TIME_SPENT,
            yAxisWidth: 200,
          }}
        />
      </div>
    );
  }
}

export default LearningTimeSpentChart;
