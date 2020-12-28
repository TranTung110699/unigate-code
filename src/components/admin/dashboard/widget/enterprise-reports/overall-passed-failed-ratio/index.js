import React from 'react';
import apiUrls from 'api-endpoints/index';
import { t1 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import { chartColorsPallete } from 'configs/constants';
import Loading from 'components/common/loading';
import withUserOrganizations from 'common/hoc/withUserOrganizations';

class OverallPassedFailedRatio extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { dispatch, orgIids } = this.props;
    const params = {
      group_type: 'user.ancestor_organizations',
      user_organizations: orgIids,
    };

    const url = apiUrls.enterprise_dashboard_reports;
    const keyState = 'enterprise_report_passed_failed';

    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          keyState,
          executeOnSuccess: (res) => {
            this.setState({ data: res });
          },
        },
        params,
      ),
    );
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <Loading />;
    }

    const passedFailedRatio = data.overall_passed_failed_ratio;
    const chartData = [
      {
        name: t1('passed'),
        value: passedFailedRatio.passed,
      },
      {
        name: t1('failed'),
        value: passedFailedRatio.failed,
      },
    ];

    const style = {
      height: '300px',
    };

    return (
      <div style={style}>
        <CustomActiveShapePieChart
          data={chartData}
          options={{
            outerRadius: '60%',
            innerRadius: '50%',
            colors: chartColorsPallete.PASSED_FAILED,
          }}
        />
      </div>
    );
  }
}

export default withUserOrganizations(OverallPassedFailedRatio);
