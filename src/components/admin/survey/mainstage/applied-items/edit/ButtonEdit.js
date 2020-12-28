import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonUpdate extends Component {
  renderFull = ({}) => {
    const { node, step, searchFormId } = this.props;
    return (
      <NewForm
        mode="edit"
        searchFormId={searchFormId}
        step={step}
        node={node}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    return <Icon icon="edit" onClick={showFull} />;
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

export default ButtonUpdate;
