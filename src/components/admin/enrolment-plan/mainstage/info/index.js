import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { canEnrolmentPlanInfoBeEdited } from 'components/admin/enrolment-plan/common';
import UpdateForm from '../../new/Form';
import ReadOnlyInfo from './ReadOnlyInfo';

class EnrolmentPlanInfo extends React.Component {
  cssClass = 'admin-enrolment-plan-info';

  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm
          mode="edit"
          node={node}
          formid="edit_enrolment_plan"
          step={
            canEnrolmentPlanInfoBeEdited(node)
              ? 'info_when_ep_approved'
              : 'info'
          }
          canEnrolmentPlanInfoBeEdited={canEnrolmentPlanInfoBeEdited(node)}
        />

        {canEnrolmentPlanInfoBeEdited(node) && <ReadOnlyInfo node={node} />}
      </div>
    );
  }
}

EnrolmentPlanInfo.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanInfo.defaultProps = {
  className: '',
};

export default connect()(EnrolmentPlanInfo);
