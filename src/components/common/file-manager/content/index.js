import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentDirCode,
  getDirCodeToSubmit,
  getStagedItems,
  getViewMode,
  shouldShowFileInfo as shouldShowFileInfoSelector,
} from 'selectors/file-manager';
import { dirSelected, itemsStaged, itemsUnstaged } from 'actions/file-manager';
import DirViewer from '../components/DirViewer';
import Info from '../components/info';
import Delete from '../components/Delete';
import IconButton from 'material-ui/IconButton';
import LinkIcon from 'material-ui/svg-icons/content/link';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
// import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';
import nodeActions from 'actions/node/creators';
import Request from 'common/network/http/Request';
import LinearProgress from 'material-ui/LinearProgress';
import { t1 } from 'translate';
import AddFileBtn from '../components/Submit';
import { push } from 'react-router-redux';
import qs from 'query-string';

const Wrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  border-left: solid 1px rgba(224, 224, 224, 1);
  padding: 10px;
  width: 250px;
  flex-shrink: 0;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

const StyledInfo = styled(Info)`
  flex-grow: 1;
`;

const StyledAddFileBtn = styled(AddFileBtn)`
  margin: auto;
`;

const DirViewerWrapper = styled.div`
  flex-grow: 1;
  padding-bottom: 10px;
`;

class Content extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: -1,
    };
  }

  handleDirectorySelect = (dirCode) => {
    const { selectDir } = this.props;
    if (typeof selectDir === 'function') {
      selectDir(dirCode);
    }
  };

  handleFileSelect = (file) => {
    const { onFileSelect } = this.props;
    if (typeof onFileSelect === 'function') {
      onFileSelect(file);
    }
  };

  handleFileDoubleClick = (item) => {
    if (!item) {
      return;
    }
    if (item.type === 'directory' && item.code) {
      this.handleDirectorySelect(item.code);
    }
    if (item.type === 'file' && item.url) {
      this.handleFileSelect(item);
    }
  };

  handleFileClick = (item) => {
    if (!item) {
      return;
    }
    const { stageItems, stagedItems } = this.props;

    if (typeof stageItems === 'function') {
      if (!Array.isArray(stagedItems)) {
        stageItems([item], true);
      } else if (stagedItems.length === 0 || stagedItems.length > 1) {
        stageItems([item], true);
      } else if (!stagedItems.find((elem) => elem && elem.code === item.code)) {
        stageItems([item], true);
      } else {
        stageItems([], true);
      }
    }
  };

  handleStagedItemsChange = (items) => {
    if (!Array.isArray(items)) {
      return;
    }
    const { stageItems } = this.props;
    if (typeof stageItems === 'function') {
      stageItems(items, true);
    }
  };

  handleDeleteSuccess = () => {
    const { stageItems } = this.props;
    if (typeof stageItems === 'function') {
      stageItems([], true);
    }
  };
  handleDropFile = (acceptFile, rejectFile) => {
    let seft = this;
    //Show progress
    this.setState({ progress: 0 });
    const { currentDirCode, snackbarAction } = this.props;
    //when file reject then not do anything, hiden progress
    if (rejectFile.length) {
      snackbarAction('File type not accept');
      seft.setState({ progress: -1 });
      return;
    }

    //Call action request post. if success then call action-saga formidToSubmitOnSuccess
    let config = {
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        seft.setState({ progress: percentCompleted });
      },
      // cancelToken: Request.source.token, //Send token cancel to server
    };

    Request.post(
      fileApiUrls.upload_file,
      {
        files: acceptFile,
        dir_code: currentDirCode,
      },
      config,
    ).then((data) => {
      seft.setState({ progress: -1 });
    });
  };
  //Handle when click add file button
  handleAddFile = (items) => {
    const { onFileSelect } = this.props;
    if (typeof onFileSelect === 'function') {
      onFileSelect(items);
    }
  };

  render() {
    const {
      className,
      currentDirCode,
      viewMode,
      searchFormId,
      stagedItems,
      shouldShowFileInfo,
      fileTypes,
      multiple,
      getFile,
    } = this.props;
    const componentClassName = `${className || ''}`;
    const progress = parseInt(this.state.progress);
    const height = this.props.height || '300px';
    return (
      <Wrapper className={componentClassName}>
        <DirViewerWrapper>
          <Dropzone
            accept={fileTypes}
            onDrop={this.handleDropFile}
            disableClick={true}
            activeStyle={{ border: '1px solid blue' }}
            rejectStyle={{ border: '1px solid red' }}
            multiple={multiple}
            style={{
              width: 'auto',
              minHeight: height,
            }}
          >
            {({ isDragActive, isDragReject }) => {
              //When drag file type not accept
              //Bug
              // if (isDragReject) {
              //   return (
              //     <ErrorText>
              //       <h1>{t1('file_type_not_accept')}</h1>
              //     </ErrorText>
              //   );
              // }
              //When requesting then show progress bar and change text from "drag_file_to_here" to "Uploading ..."
              if (progress !== -1) {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <LinearProgress
                      style={{
                        width: '80%',
                        margin: 'auto',
                        marginTop: '5px',
                      }}
                      mode="determinate"
                      value={progress}
                    />
                    <h3>
                      {progress === 100
                        ? t1('saving_file')
                        : `${t1('uploading_file')} ${progress}%`}
                    </h3>
                  </div>
                );
              }
              return (
                <DirViewer
                  fileTypes={fileTypes}
                  stagedItems={stagedItems}
                  onFileDoubleClick={this.handleFileDoubleClick}
                  onFileClick={this.handleFileClick}
                  onStagedItemsChange={this.handleStagedItemsChange}
                  dirCode={currentDirCode}
                  viewMode={viewMode}
                  searchFormId={searchFormId}
                  multiple={multiple}
                />
              );
            }}
          </Dropzone>
        </DirViewerWrapper>
        {shouldShowFileInfo && (
          <InfoWrapper>
            <StyledInfo items={stagedItems} />
            <div>
              {Array.isArray(stagedItems) &&
                stagedItems.length === 1 &&
                (stagedItems[0].type === 'directory' ? (
                  <IconButton
                    onClick={() =>
                      this.handleDirectorySelect(stagedItems[0].code)
                    }
                  >
                    <LocationIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => this.handleFileSelect(stagedItems[0])}
                  >
                    <LinkIcon />
                  </IconButton>
                ))}
              {Array.isArray(stagedItems) && stagedItems.length > 0 && (
                <div>
                  <Delete
                    searchFormId={searchFormId}
                    items={stagedItems}
                    executeOnSuccess={this.handleDeleteSuccess}
                  />
                  {/*Only show when use file-mamager with attachement*/}
                  {getFile && (
                    <StyledAddFileBtn
                      items={stagedItems}
                      onAddFile={this.handleAddFile}
                    />
                  )}
                </div>
              )}
            </div>
          </InfoWrapper>
        )}
      </Wrapper>
    );
  }
}

Content.propTypes = {
  className: PropTypes.string,
};

Content.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  currentDirCode: getCurrentDirCode(state),
  viewMode: getViewMode(state),
  stagedItems: getStagedItems(state),
  shouldShowFileInfo: shouldShowFileInfoSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectDir: (code) => {
    dispatch(dirSelected(code));
    getDirCodeToSubmit(code, dispatch);
  },
  stageItems: (items, reset) => dispatch(itemsStaged(items, reset)),
  unstageItems: (codes) => dispatch(itemsUnstaged(codes)),
  snackbarAction: (msg) => dispatch(nodeActions.snackbar(true, msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
