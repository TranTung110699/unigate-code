import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Main from './Main';

/**
 * fileType is string
 * 'image' => 'image/*'
 * @param fileType
 */
const getAcceptFileTypesFromFileLiteral = (fileType) => {
  if (fileType === 'image') return 'image/*';
  else if (fileType === 'audio') return 'audio/*';
};

class FileManagerPopupButton extends React.PureComponent {
  renderFull = ({ closeDialog }) => {
    const { onSelect, getFile, fileType, multiple } = this.props;
    const accept =
      this.props.accept || getAcceptFileTypesFromFileLiteral(fileType);

    return (
      <Main
        fileTypes={accept}
        multiple={multiple}
        getFile={getFile}
        onFileSelect={(file) => {
          getFile ? onSelect(file) : onSelect(file.url);
          closeDialog();
        }}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { className, Component } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass || ''}`;
    return <Component className={componentClassName} onClick={showFull} />;
  };

  dialogOptionsProperties = {
    width: '1350px',
    handleClose: true,
  };

  render() {
    return (
      <DetailOnDialog
        value={this.props.value}
        renderFull={this.renderFull}
        renderPreview={this.renderPreview}
        dialogKey="file_manager"
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

FileManagerPopupButton.propTypes = {
  className: PropTypes.string,
};

FileManagerPopupButton.defaultProps = {
  className: '',
  Component: (props) => <button {...props} />,
};

export default FileManagerPopupButton;
