import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import { t1 } from 'translate';
import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import SurveyReportQuestion from './Question';
import { getSurveyNumberAnswerDisplayingScale } from 'common/conf';
import Table from './ReportAsTable';
import ReportAsChart from './ReportAsChart';

const responseStyle = {
  fontWeight: 'bold',
  color: 'black',
};

const starStyle = {
  fontStyle: 'italic',
};

class SurveyReport extends React.Component {
  render() {
    const {
      surveyReport,
      surveyNumberAnswerDisplayingScale,
      trainingPlan,
      paramsToFilter,
    } = this.props;

    if (!surveyReport) return <div />;

    const totalResponse = get(surveyReport, 'total_response', 0);
    const avgRating = get(surveyReport, 'avg_rating', 0);

    return (
      <div>
        <h3 style={starStyle}>
          {surveyNumberAnswerDisplayingScale
            ? t1('rating: %s/%s', [
                avgRating,
                surveyNumberAnswerDisplayingScale,
              ])
            : null}{' '}
          {t1('(%s_voters)', [totalResponse])}
        </h3>

        <Table
          items={get(surveyReport, 'report')}
          surveyIid={get(surveyReport, 'survey_iid')}
        />

        {totalResponse > 0 && (
          <ReportAsChart
            questions={surveyReport.report}
            trainingPlan={trainingPlan}
            surveyIid={get(surveyReport, 'survey_iid')}
            paramsToFilter={paramsToFilter}
          />
        )}
      </div>
    );
  }
}

SurveyReport.propTypes = {
  surveyReport: PropTypes.shape(),
};

const mapStateToProps = (state) => {
  const surveyNumberAnswerDisplayingScale = getSurveyNumberAnswerDisplayingScale(
    confSelector(state),
  );

  return {
    surveyNumberAnswerDisplayingScale,
  };
};

export default connect(mapStateToProps)(SurveyReport);
