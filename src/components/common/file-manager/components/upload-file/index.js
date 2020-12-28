import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';
import Core from './core';

class UploadFile extends React.PureComponent {
  handleChange = (event) => {
    const {
      dispatch,
      currentDirCode,
      searchFormId,
      onUploadFileSuccess,
    } = this.props;
    dispatch(
      sagaActions.submitFormRequest('', {
        extraParams: {
          files: event.target.files,
          dir_code: currentDirCode,
        },
        url: fileApiUrls.upload_file,
        formidToSubmitOnSuccess: searchFormId,
        executeOnSuccess: onUploadFileSuccess,
      }),
    );
  };

  render() {
    const { fileTypes, className, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Core
        fileTypes={fileTypes}
        className={componentClassName}
        {...rest}
        onChange={this.handleChange}
      />
    );
  }
}

UploadFile.propTypes = {
  className: PropTypes.string,
};

UploadFile.defaultProps = {
  className: '',
};

export default connect()(UploadFile);
