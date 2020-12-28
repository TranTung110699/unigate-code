import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';

class Button extends Component {
  renderFull = ({ closeModal }) => {
    const { learningItems } = this.props;
    return <Form learningItems={learningItems} />;
  };

  render() {
    const { renderPreview } = this.props;
    return (
      <DetailOnDialog
        renderPreview={renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default Button;
