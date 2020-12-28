import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { isEnrolmentPlanInStatusThatCanTurnIntoReadyToExecute } from 'components/admin/enrolment-plan/common';
import Form from './Form';
import { t1 } from 'translate';

class EnrolmentReadyToExecuteButton extends React.PureComponent {
  renderPreview = ({ showFull }) => (
    <RaisedButton
      disabled={
        !isEnrolmentPlanInStatusThatCanTurnIntoReadyToExecute(this.props.node)
      }
      icon={<Icon icon="send" />}
      label={t1('start_running')}
      onClick={showFull}
      primary
    />
  );

  renderFull = () => <Form node={this.props.node} />;

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

EnrolmentReadyToExecuteButton.propTypes = {
  className: PropTypes.string,
};

EnrolmentReadyToExecuteButton.defaultProps = {
  className: '',
};

export default EnrolmentReadyToExecuteButton;
