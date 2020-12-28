import React, { Component } from 'react';
import FlatButton from 'components/common/mui/FlatButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import Dropzone from 'react-dropzone';
import { RIEInput } from 'riek';
import Request from 'common/network/http/Request';
import { t1, t3 } from 'translate';
// import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';
import { removeAtIndex } from 'common/utils/Array';
import styled from 'styled-components';
import FileManagerPopupButton from 'components/common/file-manager/FileManagerPopupButton';
import { getStagedItems } from 'selectors/file-manager';
import { itemsStaged } from 'actions/file-manager';
import { connect } from 'react-redux';
import nodeActions from 'actions/node/creators';
import filter from 'lodash.filter';
import unionBy from 'lodash.unionby';
import lodashGet from 'lodash.get';
import Progress from 'antd/lib/progress';
import Button from 'antd/lib/button';
import Result from 'antd/lib/result';
import List from 'antd/lib/list';
import PrimaryButton from 'components/common/primary-button';
import './stylesheet.scss';

const ButtonGroup = Button.Group;

const AttachmentInfoPart = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorText = styled.div`
  font-size: 13px;
  color: rgb(244, 67, 54);
`;

const style = {
  left: '-10px',
};

const ChooseFileButton = styled.div`
  display: flex;
  width: ${({ noFileManager }) => (noFileManager ? 100 : 50)}%;
  padding: 0 5px;
  &:first-child {
    justify-content: ${({ noFileManager }) =>
      noFileManager ? 'center' : 'flex-end'};
  }
`;

/**
 * Filter file accept file size
 * @param files
 * @param maxSize maxFile size pass in props shemal
 * if maxSize is undefined then not vertify size file
 * @returns {{fileAccepts: array, isOverSize: boolean}}
 */
function filterSize(files, maxSize) {
  const maxSizeByte = convertToByte(maxSize);
  let isOverSize = false;
  if (typeof maxSizeByte !== 'undefined') {
    const fileAccepts = filter(files, (el) => {
      if (el.size <= maxSizeByte) return true;
      isOverSize = true;
      return false;
    });
    return {
      fileAccepts,
      isOverSize,
    };
  }
  return {
    fileAccepts: files,
    isOverSize,
  };
}

/**
 * Conver maxSize from MB to Byte
 * @param maxFileSize
 * @returns {number}
 */
function convertToByte(maxFileSize) {
  return maxFileSize && maxFileSize * 1024 * 1024;
}

class AttachmentsInput extends Component {
  state = {
    progress: -1, // default value: no active file upload
  };

  componentDidMount() {
    const { value, onChange } = this.props;
    if (onChange) {
      onChange(value || []);
    }
  }

  handleFileUpload = (event) => {
    const acceptedFiles = event.target.files;
    const { saveFileAsValueInsteadOfUrl } = this.props;
    let { value } = this.props;
    value = value || [];
    if (saveFileAsValueInsteadOfUrl) {
      if (acceptedFiles && acceptedFiles.length) {
        this.handleChange([...acceptedFiles, ...value]);
      }
    } else {
      Request.post(fileApiUrls.upload_file, {
        files: acceptedFiles,
      }).then((data) => {
        if (
          data.success &&
          data.result &&
          data.result.attachments &&
          data.result.attachments.length
        ) {
          value = [...data.result.attachments, ...value];
          this.handleChange(value);
        }
      });
    }
  };

  handleFileUploadV2 = (files, rejectFiles) => {
    const { saveFileAsValueInsteadOfUrl, snackbarAction } = this.props;
    if (rejectFiles.length) {
      // Only return if all file upload is reject
      // else notify have file upload over file size
      snackbarAction(
        `${rejectFiles.length} ${t1('file_type_or_size_not_accepted')}`,
      );
      if (!files.length) return;
    }

    this.setState({ progress: 0 });

    const acceptedFiles = files;

    let value = this.props.value || [];

    if (saveFileAsValueInsteadOfUrl) {
      if (acceptedFiles && acceptedFiles.length) {
        this.handleChange([...acceptedFiles, ...value]);
      }
    } else {
      const seft = this;
      // Reset create cacel new token for request
      Request.source = Request.cancelToken.source();
      // Config event on progress request upload
      const config = {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          seft.setState({ progress: percentCompleted });
        },
        cancelToken: Request.source.token, // Send token cancel to server
      };

      const url = this.props.uploadUrl || fileApiUrls.upload_file;

      Request.post(
        url,
        {
          files: acceptedFiles,
        },
        config,
      ).then((data) => {
        if (typeof data !== 'undefined') {
          if (
            data.success &&
            data.result &&
            data.result.attachments &&
            data.result.attachments.length
          ) {
            value = [...data.result.attachments, ...value];
            this.handleChange(value);
          } else {
            snackbarAction(data.message || t1('error'));
          }
        }
        // Hidden progressbar and reset progress state
        this.setState({ progress: -1 });
      });
    }
  };

  // Action cancel when half-way uploading the file
  handleActionCancelRequest = () => {
    Request.actionCancel();
    this.setState({ progress: -1 });
  };

  /*
   *   Action select file in file manager
   *   case limit == 1 then file is object file
   *   case limit != 1 then file is array files
   * */
  setValue = (file) => {
    let { value, stageItems, snackbarAction, maxFileSize } = this.props;
    /*
     * reset stagedItems
     * */
    if (typeof stageItems === 'function') {
      stageItems([], true);
    }
    value = value || [];
    let tmp2 = [];
    if (file instanceof Array) {
      const { fileAccepts, isOverSize } = filterSize(file, maxFileSize);
      if (isOverSize) {
        snackbarAction(
          `${file.length - fileAccepts.length} ${t1(
            'file_is_reject_because_file_size_over_%d_MB',
            maxFileSize,
          )}`,
        );
      }
      tmp2 = fileAccepts.map((el) => ({
        ext: el.ext,
        id: el.id,
        link: el.url,
        name: el.name,
      }));
    } else {
      if (file.size > convertToByte(maxFileSize) && maxFileSize) {
        snackbarAction(
          `${t1('file_is_reject_because_file_size_over_%d_MB', maxFileSize)} `,
        );
        return;
      }
      tmp2 = [
        {
          ext: file.ext,
          id: file.id,
          link: file.url,
          name: file.name,
        },
      ];
    }

    value = [...tmp2, ...value];
    /*
     *   filter duplicate file
     * */
    value = unionBy(value, 'id');
    this.handleChange(value);
  };

  onEditDescription = (data, index) => {
    const { value } = this.props;
    this.handleChange(
      value &&
        value.map((attachment, indexInArray) => {
          if (indexInArray === index) {
            // have to mutate attachment here because attachment may be a file (not object)
            attachment.desc = data.message;
            return attachment;
          }
          return attachment;
        }),
    );
  };

  remove = (index) => {
    const { value } = this.props;
    this.handleChange(removeAtIndex(value || [], index));
  };

  handleChange = (value) => {
    const { onChange, limit } = this.props;
    if (onChange && typeof onChange === 'function') {
      let valueToSave = value;
      if (limit && value && value.length > limit) {
        valueToSave = value.slice(0, limit);
      }
      onChange(valueToSave);
    }
  };

  renderAttachment = ({
    attachment,
    index,
    allowDownload,
    disabled,
    readOnly,
    ActionRenderer,
    compactMode,
  }) => {
    const { saveFileAsValueInsteadOfUrl, formid } = this.props;
    const attachmentDesc = attachment.desc || attachment.name || '--------';

    if (compactMode && !ActionRenderer && !(readOnly || disabled)) {
      return [
        <RIEInput
          change={(data) => {
            this.onEditDescription(data, index);
          }}
          classEditing="editing"
          value={attachmentDesc}
          propName="message"
          className="rieinput-attachment"
          defaultProps={{
            style: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            },
          }}
          editProps={{
            style: {
              width: '100%',
            },
          }}
        />,
      ];
    }

    return [
      <AttachmentInfoPart className="col-md-6 attachment-sub-item">
        {attachment.name}
        {attachment.ext && `.${attachment.ext}`}
      </AttachmentInfoPart>,
      <AttachmentInfoPart
        className="col-md-5 attachment-sub-item"
        style={style}
      >
        {ActionRenderer ? (
          <ActionRenderer attachment={attachment} formid={formid} />
        ) : null}
        {ActionRenderer ? null : readOnly || disabled ? (
          attachmentDesc
        ) : (
          <RIEInput
            change={(data) => {
              this.onEditDescription(data, index);
            }}
            classEditing="editing"
            value={attachmentDesc}
            propName="message"
            className="rieinput-attachment"
          />
        )}
      </AttachmentInfoPart>,
    ];
  };

  render() {
    const {
      allowDownload,
      label,
      value,
      disabled,
      accept,
      limit,
      errorText,
      readOnly,
      ActionRenderer,
      maxFileSize,
      saveFileAsValueInsteadOfUrl,
      compactMode,
      compactModeButtonNoIcon,
      compactModeButtonIconOnly,
      className,
      classWrapper,
      title,
    } = this.props;

    let disabledInput = disabled || readOnly;
    disabledInput = disabledInput || (limit && value && value.length >= limit);
    const multiple = limit !== 1;
    const heading = multiple
      ? t1('drag_files_here_to_upload')
      : t1('drag_file_here_to_upload');
    const chooseFileLabel = multiple
      ? t1('choose_files_from_your_computer')
      : t1('choose_file_from_your_computer');
    const progress = parseInt(this.state.progress);
    let subHeading = Array.isArray(accept)
      ? `<p>${t1('acceptable_files')}: <b>${accept.join(', ')}</b></p>`
      : typeof accept === 'string'
      ? `<p>${t1('acceptable_files')}: <b>${accept}</b></p>`
      : '';
    if (typeof maxFileSize !== 'undefined') {
      subHeading = `${subHeading} <p>${t1(
        'max_file_size_is_%s',
        maxFileSize,
      )} MB</p>`;
    }
    const height = this.props.height || '100px';
    const cssClass = 'attachment-container';
    return (
      <div className={`${cssClass} ${className} ${classWrapper}`}>
        {/* Button upload version 1 */}
        {/* <FlatButton
          label={label || t2('add_value')}
          labelPosition="after"
          icon={<AttachmentsIcon />}
          containerElement="label"
          disabled={disabledInput}
        >
          <input
            disabled={disabledInput}
            type="file"
            accept={accept}
            style={{ display: 'none' }}
            multiple={limit !== 1}
            onChange={this.handleFileUpload}
          />
        </FlatButton> */}
        {/* Button upload version 2 */}
        <div>
          {label}
          {!disabledInput && (
            <Dropzone
              accept={accept}
              style={{
                width: '100%',
                minHeight: compactMode ? 'initial' : height,
                border: '2px dashed #ddd',
                textAlign: 'center',
                transition: 'border .3s ease-in-out',
              }}
              maxSize={maxFileSize && convertToByte(maxFileSize)}
              multiple={multiple}
              onDrop={this.handleFileUploadV2}
              activeStyle={{
                border: '2px solid #40A9F3',
              }}
              disabledStyle={{
                border: '2px solid #40A9F3',
              }}
              rejectStyle={{
                border: '2px solid red',
              }}
              disabled={!!(disabledInput || progress !== -1)}
              disableClick={!!(progress !== -1 || disabledInput)}
              className={`${cssClass}-dropzone ${compactMode ? 'p-b-5' : ''}`}
            >
              {({ isDragActive, isDragReject }) => {
                // When drag active, color text changed
                if (isDragReject) {
                  return (
                    <Result
                      status="error"
                      title={t1('file_type_not_accepted')}
                    />
                  );
                }
                if (isDragActive) {
                  return (
                    <div className={`${cssClass}-dropzone__drag`}>
                      <div
                        className={`text-muted ${cssClass}-dropzone__drag__title`}
                      >
                        {heading}
                      </div>
                      <FlatButton
                        label={chooseFileLabel}
                        labelPosition="after"
                        icon={<CloudUpload />}
                        containerElement="label"
                        disabled={disabledInput}
                        className={`text-muted ${cssClass}-dropzone__drag__button`}
                      />
                    </div>
                  );
                }
                // When requesting then show progress bar and change text from "drag_file_to_here" to "Uploading ..."
                if (progress !== -1) {
                  if (compactMode) {
                    return (
                      <div style={{ textAlign: 'center' }}>
                        <span>
                          {progress === 100
                            ? `${t1('saving')}...`
                            : `${t1('uploading')}...`}
                        </span>
                        <div className="d-flex p-l-5 p-r-5">
                          <Progress
                            style={{
                              width: '80%',
                              margin: 'auto',
                            }}
                            strokeColor="#3B7BBE"
                            status={progress === 100 ? 'null' : 'active'}
                            percent={this.state.progress}
                          />

                          {progress !== 100 && (
                            <Button
                              onClick={this.handleActionCancelRequest}
                              type="danger"
                              shape="round"
                              icon="close-circle"
                              className="p-l-10 p-r-10"
                            />
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <p>
                        {progress === 100
                          ? t1('saving_file')
                          : `${t1('uploading_file')}...`}
                      </p>
                      <Progress
                        style={{
                          width: '80%',
                          margin: 'auto',
                          marginTop: '5px',
                        }}
                        strokeColor="#3B7BBE"
                        status={progress === 100 ? 'null' : 'active'}
                        percent={this.state.progress}
                      />

                      {progress !== 100 && (
                        <Button
                          className="m-10"
                          onClick={this.handleActionCancelRequest}
                          type="danger"
                          shape="round"
                        >
                          {t1('cancel_file_upload')}
                        </Button>
                      )}
                    </div>
                  );
                }
                // Default and When upload successfully then change icon and change text

                if (compactMode) {
                  return (
                    <ButtonGroup>
                      <Button
                        disabled={disabledInput}
                        icon={compactModeButtonNoIcon ? '' : 'upload'}
                        title={chooseFileLabel}
                      >
                        {compactModeButtonIconOnly
                          ? ''
                          : !disabledInput
                          ? chooseFileLabel
                          : t1('upload_successful')}
                      </Button>

                      {!this.props.noFileManager && (
                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <FileManagerPopupButton
                            onSelect={this.setValue}
                            accept={accept}
                            getFile
                            multiple={multiple}
                            maxSize={convertToByte(maxFileSize)}
                            Component={(props) => (
                              <Button
                                disabled={disabledInput}
                                {...props}
                                icon={compactModeButtonNoIcon ? '' : 'cloud'}
                              >
                                {!disabledInput
                                  ? t1('choose_from_file_manager')
                                  : t1('upload_successful')}
                              </Button>
                            )}
                            {...this.props}
                          />
                        </span>
                      )}
                    </ButtonGroup>
                  );
                }

                return (
                  <div
                    className={`${cssClass}-dropzone__drag`}
                    style={{ textAlign: 'center' }}
                  >
                    {!!title && (
                      <div className={`${cssClass}-title`}>{title}</div>
                    )}

                    <div
                      className={`text-muted ${cssClass}-dropzone__drag__title`}
                    >
                      {!disabledInput ? heading : t1('')}
                      <br />
                      {t3('or')}
                    </div>
                    <div className="d-flex justify-content-center">
                      <ChooseFileButton
                        noFileManager={this.props.noFileManager}
                      >
                        <PrimaryButton
                          buttonType="dashed"
                          disabled={disabledInput}
                          label={
                            !disabledInput
                              ? chooseFileLabel
                              : t1('upload_successful')
                          }
                        />
                      </ChooseFileButton>
                      {!this.props.noFileManager && (
                        <ChooseFileButton
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <FileManagerPopupButton
                            onSelect={this.setValue}
                            accept={accept}
                            getFile
                            multiple={multiple}
                            maxSize={convertToByte(maxFileSize)}
                            Component={(props) => (
                              <PrimaryButton
                                disabled={disabledInput}
                                {...props}
                                buttonType="dashed"
                                label={
                                  !disabledInput
                                    ? t1('choose_from_file_manager')
                                    : t1('upload_successful')
                                }
                              />
                            )}
                            {...this.props}
                          />
                        </ChooseFileButton>
                      )}
                    </div>

                    <div className={`${cssClass}-dropzone__footer`}>
                      <span
                        className="text-muted"
                        dangerouslySetInnerHTML={{ __html: subHeading }}
                      />
                    </div>
                  </div>
                );
              }}
            </Dropzone>
          )}
        </div>

        {errorText && <ErrorText>{errorText}</ErrorText>}

        {value && value.length > 0 && (
          <List
            className="m-t-10 attachment-list"
            bordered
            size={compactMode ? 'small' : 'default'}
          >
            {value.map((attachment, index) => (
              <List.Item
                key={`attachment-${index}`}
                className={`attachment-item ${
                  compactMode
                    ? 'd-flex justify-content-between attachment-item-compact'
                    : ''
                }`}
                actions={[
                  !saveFileAsValueInsteadOfUrl && allowDownload && (
                    <a
                      href={attachment.link || attachment.path}
                      target="_blank"
                    >
                      <i className="mi mi-file-download" />
                    </a>
                  ),
                  !disabled && !readOnly && (
                    <i
                      className="mi mi-close"
                      onClick={() => {
                        this.remove(index);
                      }}
                    />
                  ),
                ]}
              >
                {this.renderAttachment({
                  attachment,
                  index,
                  allowDownload,
                  disabled,
                  readOnly,
                  ActionRenderer,
                  compactMode,
                })}
              </List.Item>
            ))}
          </List>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { maxFileSize }) => ({
  stagedItems: getStagedItems(state),
  maxFileSize:
    maxFileSize || lodashGet(state, 'domainInfo.conf.limit_file_size'),
});

const mapDispatchToProps = (dispatch) => ({
  stageItems: (items, reset) => dispatch(itemsStaged(items, reset)),
  snackbarAction: (msg) => dispatch(nodeActions.snackbar('error', msg)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsInput);
