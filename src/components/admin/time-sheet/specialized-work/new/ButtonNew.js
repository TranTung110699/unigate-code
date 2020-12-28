import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewTimeSheetForm from './Form';
import { timeSheetTypes } from 'configs/constants/timesheet';

/**
 * Button that user click when they want to log user time sheet
 */
class NewTimeSheetButtonForSpecializedWork extends Component {
  dialogKey = 'new_time_sheet';

  renderFull = ({ closeDialog }) => {
    const { searchFormId } = this.props;
    return (
      <NewTimeSheetForm
        mode="new"
        type={timeSheetTypes.SPECIALIZED_WORK}
        searchFormId={searchFormId}
        requestSuccessful={closeDialog}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <FlatButton
        icon={<Icon icon="plus" />}
        label={label || t1('log_user_specialized_work')}
        onClick={showFull}
      />
    );
  };

  dialogOptionsProperties = () => ({
    title: t1('log_user_specialized_work'),
  });

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogKey={this.dialogKey}
        dialogOptionsProperties={this.dialogOptionsProperties()}
      />
    );
  }
}

export default NewTimeSheetButtonForSpecializedWork;
