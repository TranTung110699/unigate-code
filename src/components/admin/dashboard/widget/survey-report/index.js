import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints/index';
import sApiUrls from 'components/admin/survey/endpoints';
import Report from 'components/admin/survey/mainstage/dashboard/widget/survey-statistics/views/Report';
import sagaActions from 'actions/node/saga-creators';
import Rating from 'schema-form/elements/rating';
import get from 'lodash.get';
import ButtonView from './button/ButtonView';

class SurveyReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const params = {};
    const url = sApiUrls.global_survey_report_search;
    const keyState = 'global_survey_report_search';

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
    const { data: surveyReport } = this.state;
    if (!surveyReport) return <div />;
    let reportResult = <div />;
    let ratingStar = <div />;
    let enableStar = true;

    if (surveyReport.report) {
      reportResult = <Report surveyReport={surveyReport} />;
      if (surveyReport.enable_star) {
        ratingStar = (
          <Rating
            className="rating"
            styleContainer={{ width: 359 }}
            count={5}
            size={50}
            color2="#ffd700"
            half={true}
            value={get(surveyReport, 'avg_rating', 0)}
            edit={false}
          />
        );
      } else enableStar = false;
    }

    return (
      <div id="container">
        <div className="star">{ratingStar}</div>
        <ButtonView star={enableStar} />
        <div className="chart">{reportResult}</div>
      </div>
    );
  }
}

export default connect()(SurveyReport);
