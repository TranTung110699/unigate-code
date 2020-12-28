import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NewDirDialog from './NewDirDialog';

class NewDir extends React.PureComponent {
  newDirDialogKey = 'new_dir_dialog';

  renderNewDirDialog = ({ closeDialog }) => {
    const { currentDirCode, searchFormId } = this.props;
    return (
      <NewDirDialog
        dialogKey={this.newDirDialogKey}
        parentDirCode={currentDirCode}
        searchFormId={searchFormId}
      />
    );
  };

  handleNewDirDialogOpen = () => {
    const { onNewDirDialogOpen } = this.props;
    if (typeof onNewDirDialogOpen === 'function') {
      onNewDirDialogOpen();
    }
  };

  renderPreview = ({ showFull }) => {
    const { Component, componentProps } = this.props;
    return <Component onClick={showFull} {...componentProps} />;
  };

  render() {
    const { currentDirCode } = this.props;
    return (
      <DetailOnDialog
        currentDirCode={currentDirCode}
        renderPreview={this.renderPreview}
        renderFull={this.renderNewDirDialog}
        dialogKey={this.newDirDialogKey}
        onShowFull={this.handleNewDirDialogOpen}
      />
    );
  }
}

NewDir.propTypes = {
  className: PropTypes.string,
};

NewDir.defaultProps = {
  className: '',
};

export default NewDir;
