import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  dialogKey = 'new_survey';

  renderFull = ({}) => (
    <NewForm
      searchFormId={this.props.searchFormId}
      mode="new"
      dialogKey={this.dialogKey}
    />
  );

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <FlatButton
        icon={<Icon icon="plus" />}
        label={label || t1('new_survey')}
        onClick={showFull}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogKey={this.dialogKey}
      />
    );
  }
}

export default ButtonNew;
