import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import ButtonNew from 'components/common/primary-button';
import Icon from 'components/common/Icon';
import Form from './Form';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class EnrolmentPlanMembersSubmitForApprovalButton extends React.PureComponent {
  renderPreview = ({ showFull }) => (
    <ButtonNew
      className={this.props.className}
      icon={<Icon icon="submit" />}
      label={t1('notify_staff_to_approve_enrolment_plan_members')}
      // because right now this button is only used to notify users, we may need to change this text in the future
      onClick={showFull}
      primary={this.props.primary}
      disabled={!lodashGet(this.props, 'node.number_of_members')}
    />
  );

  renderFull = () => (
    <div>
      <div>
        {t1(
          'by_submitting_this_button_the_members_seniors_will_receive_an_email_of_the_list_of_the_learners_and_then_can_approve_their_learning_plan',
        )}
      </div>
      <Form
        node={this.props.node}
        executeOnSuccess={this.props.executeOnSuccess}
        formidToSubmitOnSuccess={this.props.formidToSubmitOnSuccess}
      />
    </div>
  );

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={{
          title: t1('submit_for_approval'),
        }}
      />
    );
  }
}

EnrolmentPlanMembersSubmitForApprovalButton.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanMembersSubmitForApprovalButton.defaultProps = {
  className: '',
};

export default EnrolmentPlanMembersSubmitForApprovalButton;
