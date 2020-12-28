import React from 'react';
import apiUrls from 'api-endpoints/index';
import { t1 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import { chartColorsPallete } from 'configs/constants';
import Loading from 'components/common/loading';
import withUserOrganizations from 'common/hoc/withUserOrganizations';

class OverallLearningProgress extends React.PureComponent {
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
    const keyState = 'enterprise_report_learning_progress';

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

    const learningProgress = data.overall_learning_progress;
    const chartData = [
      {
        name: t1('has_not_started'),
        value: learningProgress.has_not_started,
      },
      {
        name: t1('is_studying'),
        value: learningProgress.is_studying,
      },
      {
        name: t1('completed'),
        value: learningProgress.completed,
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
            colors: chartColorsPallete.LEARNING_PROGRESS,
          }}
        />
      </div>
    );
  }
}

export default withUserOrganizations(OverallLearningProgress);
