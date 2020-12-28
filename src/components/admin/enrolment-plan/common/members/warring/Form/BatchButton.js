import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NewButton from 'components/common/primary-button';
import Form from './Form';
import lodashGet from 'lodash.get';

class BatchButton extends Component {
  renderPreview = ({ showFull }) => {
    const {
      items,
      className,
      primary,
      secondary,
      label,
      totalResult,
    } = this.props;

    return (
      <NewButton
        disabled={!lodashGet(items, 'length') && !totalResult}
        onClick={showFull}
        primary={primary}
        className={className}
        label={label}
        {...this.props}
      />
    );
  };
  getDialogKey = () =>
    this.props.formid || 'enrolment_plan_members_batch_action';
  renderFull = ({ closeDialog }) => {
    const { items, searchFormId, requestSuccessful } = this.props;
    return (
      <Form
        {...this.props}
        dialogKey={this.getDialogKey()}
        items={items}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
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
