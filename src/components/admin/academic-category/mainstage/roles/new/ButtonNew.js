import React from 'react';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/NewButton';
import DetailOnDialog from 'components/common/detail-on-dialog';

import NewForm from './index';

class ButtonNew extends React.Component {
  dialogOptionsProperties = {
    handleClose: true,

    title: t1('new_role'),
    modal: true,
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      name="submit"
      type="submit"
      icon={<Icon icon="plus" />}
      label={t1('new_role')}
      onClick={showFull}
    />
  );

  renderFull = () => {
    const { category } = this.props;
    return <NewForm mode="new" category={category} />;
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
