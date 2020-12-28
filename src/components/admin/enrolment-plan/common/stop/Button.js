import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { isEnrolmentPlanExecuted } from 'components/admin/enrolment-plan/common';
import Form from './Form';
import { t1 } from 'translate';

class EnrolmentStopButton extends React.PureComponent {
  renderPreview = ({ showFull }) => (
    <RaisedButton
      disabled={!isEnrolmentPlanExecuted(this.props.node)}
      icon={<Icon icon="reject" />}
      label={t1('stop_enrolment_plan')}
      onClick={showFull}
      secondary
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

EnrolmentStopButton.propTypes = {
  className: PropTypes.string,
};

EnrolmentStopButton.defaultProps = {
  className: '',
};

export default EnrolmentStopButton;
