import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';

import NewTrainingPlan from '../new/index';

class ButtonNew extends Component {
  dialogOptionsProperties = {
    handleClose: true,

    modal: true,
  };

  renderPreview = ({ showFull }) => (
    <RaisedButton
      name="submit"
      type="submit"
      label={t1('create_new_training_plan')}
      primary
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => {
    // TODO: find out the search params & parent component elemnt
    return <NewTrainingPlan mode="new" {...this.props} />;
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
