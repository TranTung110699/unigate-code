import React, { Component } from 'react';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from './Form';

class ButtonNew extends Component {
  renderFull = ({}) => {
    const { survey, searchFormId } = this.props;
    return <NewForm searchFormId={searchFormId} mode="new" survey={survey} />;
  };

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <FlatButton
        icon={<Icon icon="plus" />}
        label={label || t1('add_applied_items')}
        onClick={showFull}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default ButtonNew;
