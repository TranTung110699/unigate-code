import React, { Component } from 'react';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

const dialogKey = 'new_training_plan';

class ButtonNew extends Component {
  renderFull = ({}) => <NewForm mode="new" dialogKey={dialogKey} />;

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <PrimaryButton
        icon={<Icon icon="plus" />}
        label={label || t1('new_training_plan')}
        onClick={showFull}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogKey={dialogKey}
      />
    );
  }
}

export default ButtonNew;
