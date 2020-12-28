import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import SurveyResult from '../common/SurveyResult';

class TeacherSurveyResult extends React.Component {
  getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey = (
    surveyIid,
    teacherIid,
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

    let avgScoreOfThisQuestionOfTeacher = lodashGet(
      (avgScoresOfThisSurvey || []).find(
        (item) =>
          String(lodashGet(item, 'teacher_iid')) === String(teacherIid) &&
          String(lodashGet(item, 'question_iid')) === String(questionIid),
      ),
      'avg_score',
    );

    return avgScoreOfThisQuestionOfTeacher;
  };

  render() {
    const { data } = this.props;

    const teachers = (lodashGet(data, 'teachers') || []).map((item) =>
      lodashGet(item, 'teacher'),
    );
    const surveys = lodashGet(data, 'surveys');

    return (
      <SurveyResult
        surveys={surveys}
        surveyTargetItems={teachers}
        getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey={
          this.getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey
        }
      />
    );
  }
}

TeacherSurveyResult.propTypes = {
  data: PropTypes.shape(),
};

TeacherSurveyResult.defaultProps = {};

export default fetchData((props) => ({
  baseUrl: apiUrls.enrolment_plan_teacher_survey_report,
  params: {
    enrolment_plan_iid: lodashGet(props, 'node.iid'),
    training_plan_iid: lodashGet(props, 'trainingPlan.iid'),
  },
  keyState: `enrolment_plan_teacher_survey_report_${lodashGet(
    props,
    'node.iid',
  )}`,
  propKey: 'data',
  fetchCondition:
    lodashGet(props, 'node.iid') || lodashGet(props, 'trainingPlan.iid'),
}))(TeacherSurveyResult);
