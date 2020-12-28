import React from 'react';
import PropTypes from 'prop-types';
import ReportLearningMaterialCreation from 'components/admin/report-teacher/report-learning-material-creation';

class EnrolmentPlanLayout extends React.Component {
  render() {
    return <ReportLearningMaterialCreation />;
  }
}

EnrolmentPlanLayout.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanLayout.defaultProps = {
  className: '',
};

export default EnrolmentPlanLayout;
