import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateForm from '../../new/Form';

class TrainingPlanInfo extends React.Component {
  render() {
    const { className, node } = this.props;
    return (
      <div className={className}>
        <UpdateForm
          mode="edit"
          node={node}
          formid="edit_training_plan_enrolment_plan"
        />
      </div>
    );
  }
}

TrainingPlanInfo.propTypes = {
  className: PropTypes.string,
};

TrainingPlanInfo.defaultProps = {
  className: '',
};

export default connect()(TrainingPlanInfo);
