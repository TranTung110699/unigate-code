import React from 'react';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { chartColorsPallete, layoutOrientations } from 'configs/constants';
import Loading from 'components/common/loading';
import StackedBarChart from 'components/common/charts/bar/StackedBarChart';

class NoOfCreditSyllabusesChart extends React.Component {
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
          keyState: 'organizations_no_of_credit_syllabuses',
          executeOnSuccess: (data = []) => {
            const mappedData = data.map((item) => ({
              name: item.name,
              no_of_credit_syllabuses: item.no_of_credit_syllabuses || 0,
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
        name: 'no_of_credit_syllabuses',
        label: t1('no_of_credit_syllabuses'),
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
            colors: chartColorsPallete.NO_OF_CREDIT_SYLLABUSES,
            yAxisWidth: 200,
          }}
        />
      </div>
    );
  }
}

export default NoOfCreditSyllabusesChart;
