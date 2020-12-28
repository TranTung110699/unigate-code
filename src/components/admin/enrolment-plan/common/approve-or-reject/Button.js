import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import Form from './Form';
import {
  isEnrolmentPlanApproved,
  isEnrolmentPlanInStatusThatCanBeApproved,
} from 'components/admin/enrolment-plan/common';
import { t1 } from 'translate';

const dialogKey = 'approve_or_reject_enrolment_plan';

class EnrolmentPlanApproveButton extends React.PureComponent {
  renderPreview = ({ showFull }) => {
    const canBeApproved = isEnrolmentPlanInStatusThatCanBeApproved(
      this.props.node,
    );
    const approved = isEnrolmentPlanApproved(this.props.node);

    return (
      <RaisedButton
        disabled={!(canBeApproved || approved)}
        icon={<Icon icon={!approved ? 'send' : 'reject'} />}
        label={!approved ? t1('approve') : t1('unapprove')}
        onClick={showFull}
        primary={!approved}
        secondary={approved}
      />
    );
  };

  renderFull = () => <Form node={this.props.node} dialogKey={dialogKey} />;

  render() {
    return (
      <DetailOnDialog
        dialogKey={dialogKey}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

EnrolmentPlanApproveButton.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanApproveButton.defaultProps = {
  className: '',
};

export default EnrolmentPlanApproveButton;
