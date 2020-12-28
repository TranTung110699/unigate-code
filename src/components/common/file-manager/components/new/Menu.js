import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import UploadFileIcon from 'material-ui/svg-icons/file/file-upload';
import CreateDirIcon from 'material-ui/svg-icons/file/create-new-folder';
import NewDir from '../new-dir';
import UploadFile from '../upload-file';
import { t1 } from 'translate';

class NewMenu extends React.PureComponent {
  render() {
    const {
      className,
      currentDirCode,
      onNewDirDialogOpen,
      onUploadFileSuccess,
      searchFormId,
      fileTypes,
    } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Menu className={componentClassName}>
        <UploadFile
          fileTypes={fileTypes}
          multiple
          searchFormId={searchFormId}
          currentDirCode={currentDirCode}
          Component={MenuItem}
          leftIcon={<UploadFileIcon />}
          primaryText={t1('upload_file')}
          onUploadFileSuccess={onUploadFileSuccess}
        />
        <NewDir
          searchFormId={searchFormId}
          currentDirCode={currentDirCode}
          onNewDirDialogOpen={onNewDirDialogOpen}
          Component={MenuItem}
          componentProps={{
            leftIcon: <CreateDirIcon />,
            primaryText: t1('new_folder'),
          }}
        />
      </Menu>
    );
  }
}

NewMenu.propTypes = {
  className: PropTypes.string,
};

NewMenu.defaultProps = {
  className: '',
};

export default NewMenu;
