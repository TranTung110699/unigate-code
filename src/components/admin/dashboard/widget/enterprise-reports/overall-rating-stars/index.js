import React from 'react';
import apiUrls from 'api-endpoints/index';
import { t1 } from 'translate';
import CustomActiveShapePieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import { chartColorsPallete } from 'configs/constants';
import Loading from 'components/common/loading';
import withUserOrganizations from 'common/hoc/withUserOrganizations';

class OverallRatingStars extends React.PureComponent {
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
    const keyState = 'enterprise_report_rating_stars';

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

    const ratingStars = data.overall_rating_stars;
    const chartData = [
      {
        name: t1('one_stars'),
        value: ratingStars.no_of_one_stars,
      },
      {
        name: t1('two_stars'),
        value: ratingStars.no_of_two_stars,
      },
      {
        name: t1('three_stars'),
        value: ratingStars.no_of_three_stars,
      },
      {
        name: t1('four_stars'),
        value: ratingStars.no_of_four_stars,
      },
      {
        name: t1('five_stars'),
        value: ratingStars.no_of_five_stars,
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
            colors: chartColorsPallete.RATING_STARS,
          }}
        />
      </div>
    );
  }
}

export default withUserOrganizations(OverallRatingStars);
