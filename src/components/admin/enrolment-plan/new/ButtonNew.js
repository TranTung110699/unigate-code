import React, { Component } from 'react';
import { t1 } from 'translate';
import NewButton from 'components/common/primary-button';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  dialogKey = 'new_enrolment_plan';

  renderFull = ({}) => (
    <NewForm
      trainingPlan={this.props.trainingPlan}
      searchFormId={this.props.searchFormId}
      mode="new"
      dialogKey={this.dialogKey}
      redirectToEditPage
    />
  );

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <NewButton
        icon={<Icon icon="plus" />}
        label={label || t1('new_enrolment_plan')}
        onClick={showFull}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogKey={this.dialogKey}
        dialogOptionsProperties={{
          title: t1('new_enrolment_plan'),
          handleClose: true,
          modal: true,
        }}
      />
    );
  }
}

export default ButtonNew;
