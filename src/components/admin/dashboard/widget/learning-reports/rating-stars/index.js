import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import Loading from 'components/common/loading';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class RatingStarsChart extends React.Component {
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
          keyState: 'organizations_rating_stars',
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
            colors: chartColorsPallete.RATING_STARS,
            yAxisWidth: 200,
          }}
        />
      </div>
    );
  }
}

export default RatingStarsChart;
