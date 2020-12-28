import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import SurveyResult from '../common/SurveyResult';

class CreditSyllabusSurveyResult extends React.Component {
  getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey = (
    surveyIid,
    creditSyllabusIid,
    questionIid,
  ) => {
    const { data } = this.props;
    const surveyAvgScores = lodashGet(data, 'survey_avg_scores');

    const avgScoresOfThisSurvey = lodashGet(
      (surveyAvgScores || []).find(
        (sac) => String(lodashGet(sac, 'survey_iid')) === String(surveyIid),
      ),
      'avg_scores',
    );

    let avgScoreOfThisQuestionOfCs = lodashGet(
      (avgScoresOfThisSurvey || []).find(
        (item) =>
          String(lodashGet(item, 'credit_iid')) === String(creditSyllabusIid) &&
          String(lodashGet(item, 'question_iid')) === String(questionIid),
      ),
      'avg_score',
    );

    return avgScoreOfThisQuestionOfCs;
  };

  render() {
    const { data } = this.props;

    const creditSyllabuses = lodashGet(data, 'credit_syllabuses');
    const surveys = lodashGet(data, 'surveys');

    return (
      <SurveyResult
        surveys={surveys}
        surveyTargetItems={creditSyllabuses}
        getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey={
          this.getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey
        }
      />
    );
  }
}

CreditSyllabusSurveyResult.propTypes = {
  data: PropTypes.shape(),
};

CreditSyllabusSurveyResult.defaultProps = {};

export default fetchData((props) => ({
  baseUrl: apiUrls.enrolment_plan_credit_syllabus_survey_report,
  params: {
    enrolment_plan_iid: lodashGet(props, 'node.iid'),
    training_plan_iid: lodashGet(props, 'trainingPlan.iid'),
  },
  keyState: `enrolment_plan_credit_syllabus_survey_report_${lodashGet(
    props,
    'node.iid',
  )}`,
  propKey: 'data',
  fetchCondition:
    lodashGet(props, 'node.iid') || lodashGet(props, 'trainingPlan.iid'),
}))(CreditSyllabusSurveyResult);
