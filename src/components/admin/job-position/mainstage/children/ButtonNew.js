import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import { getSearchFormId } from './common/utils';

class ButtonNew extends Component {
  dialogOptionsProperties = {
    handleClose: true,

    title: t1('new_job_position'),
    modal: true,
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      name="submit"
      type="submit"
      icon={<Icon icon="plus" />}
      label={t1('new_job_position')}
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => {
    const { node } = this.props;
    return (
      <NodeNew
        mode="new"
        params={{
          type: 'job_position',
          pid: node.id,
        }}
        ntype={'job_position'}
        closeModal
        formid={'new_job_position_children'}
        searchFormId={getSearchFormId(node)}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

export default ButtonNew;
