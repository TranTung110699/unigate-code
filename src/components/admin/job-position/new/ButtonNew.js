import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NewForm from '../new/Form';

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
    const { organization, searchFormId } = this.props;
    let params = {
      type: 'job_position',
    };
    if (organization && organization.iid) {
      params = {
        ...params,
        organizations: [organization.iid],
      };
    }

    return <NewForm searchFormId={searchFormId} mode="new" params={params} />;
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
