import React, { Component } from 'react';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewTimeSheetForm from 'components/admin/time-sheet/specialized-work/new/Form';
import { timeSheetTypes } from 'configs/constants/timesheet';

/**
 * Button that user click when they want to edit user time sheet
 */
class EditTimeSheetButtonForSpecializedWork extends Component {
  renderFull = ({ closeDialog }) => {
    const { searchFormId, node } = this.props;
    return (
      <NewTimeSheetForm
        mode="edit"
        type={timeSheetTypes.SPECIALIZED_WORK}
        node={node}
        searchFormId={searchFormId}
        requestSuccessful={closeDialog}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <a onClick={showFull} title={label || t1('edit_user_specialized_work')}>
        <Icon icon="edit" />
      </a>
    );
  };

  dialogOptionsProperties = () => ({
    title: t1('edit_user_specialized_work'),
  });

  render() {
    const { node } = this.props;
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogKey={`edit_time_sheet_${node && node.id}`}
        dialogOptionsProperties={this.dialogOptionsProperties()}
      />
    );
  }
}

export default EditTimeSheetButtonForSpecializedWork;
