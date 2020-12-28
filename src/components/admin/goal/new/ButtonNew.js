import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  dialogOptionsProperties = {
    handleClose: true,

    title: t1('new_goal'),
    modal: true,
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      name="submit"
      type="submit"
      icon={<Icon icon="plus" />}
      label={t1('new_goal')}
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => <NewForm mode="new" />;

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
