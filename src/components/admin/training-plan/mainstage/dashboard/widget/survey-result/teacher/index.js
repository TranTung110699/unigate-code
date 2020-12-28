import React from 'react';
import PropTypes from 'prop-types';
import EnrolmentPlanReportTeacherSurveyResult from 'components/admin/enrolment-plan/mainstage/dashboard/reports/survey-result/teacher';

class SurveyResult extends React.Component {
  render() {
    const { node } = this.props;

    return <EnrolmentPlanReportTeacherSurveyResult trainingPlan={node} />;
  }
}

SurveyResult.propTypes = {
  node: PropTypes.shape(),
};

SurveyResult.defaultProps = {
  node: {},
};

export default SurveyResult;
