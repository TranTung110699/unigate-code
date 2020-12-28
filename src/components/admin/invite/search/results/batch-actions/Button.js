import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Form from './Form';
import lodashGet from 'lodash.get';

class BatchButton extends Component {
  renderPreview = ({ showFull }) => {
    const {
      items,
      searchValues,
      className,
      primary,
      secondary,
      label,
      buttonType,
      icon,
    } = this.props;

    return (
      <RaisedButton
        disabled={!lodashGet(items, 'length') && !searchValues}
        onClick={showFull}
        primary={primary}
        secondary={secondary}
        className={className}
        label={label}
        buttonType={buttonType}
        icon={icon}
      />
    );
  };

  getDialogKey = () => this.props.formid || 'invite_batch_action';

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
