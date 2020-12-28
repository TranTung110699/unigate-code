import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import ButtonNew from 'components/common/primary-button';
import Form from './Form';
import lodashGet from 'lodash.get';

class BatchButton extends Component {
  renderPreview = ({ showFull }) => {
    const { items, className, primary, secondary, label } = this.props;

    return (
      <ButtonNew
        disabled={!lodashGet(items, 'length')}
        onClick={showFull}
        primary={primary}
        className={className}
        label={label}
        {...this.props}
        buttonType="danger"
      />
    );
  };

  getDialogKey = () =>
    this.props.formid || 'enrolment_plan_members_batch_action';

  renderFull = ({ closeDialog }) => {
    const { items, searchFormId, requestSuccessful, label } = this.props;
    return (
      <Form
        {...this.props}
        dialogKey={this.getDialogKey()}
        items={items}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
        submitLabel={label}
      />
    );
  };

  dialogOptionsProperties = () => ({
    title: this.props.dialogTitle,
  });

  render() {
    const { renderPreview } = this.props;

    return (
      <DetailOnDialog
        {...this.props}
        dialogOptionsProperties={this.dialogOptionsProperties()}
        dialogKey={this.getDialogKey()}
        renderPreview={renderPreview || this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default BatchButton;
