import React from 'react';
import PropTypes from 'prop-types';
import EnrolmentPlanReportCreditSyllabusSurveyResult from 'components/admin/enrolment-plan/mainstage/dashboard/reports/survey-result/credit-syllabus';

class SurveyResult extends React.Component {
  render() {
    const { node } = this.props;

    return (
      <EnrolmentPlanReportCreditSyllabusSurveyResult trainingPlan={node} />
    );
  }
}

SurveyResult.propTypes = {
  node: PropTypes.shape(),
};

SurveyResult.defaultProps = {
  node: {},
};

export default SurveyResult;
