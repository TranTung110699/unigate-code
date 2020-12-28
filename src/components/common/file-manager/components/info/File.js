import React from 'react';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import { getDisplayFileSize, getFileKeyForElement } from 'common/utils/File';
import { sum } from 'common/utils/Array';
import { t1 } from 'translate';
import Audio from 'components/common/media-player/audio';
import Label from './Label';

const Preview = ({ file, ...rest }) =>
  file &&
  file.mime_type &&
  ((file.mime_type.indexOf('image') !== -1 && (
    <img {...rest} src={file.url} />
  )) ||
    (file.mime_type.indexOf('audio') !== -1 && (
      <Audio {...rest} src={file.url} />
    )));

class File extends React.Component {
  previewStyle = {
    // width: '100%',
    maxHeight: '200px',
    width: 'auto',
  };

  render() {
    const { className, files } = this.props;
    if (!Array.isArray(files)) {
      return null;
    }
    if (files.length > 1) {
      return (
        <div className={className}>
          <div>{t1('%s_files_selected', [files.length])}</div>
          <div>
            <Label>{t1('size')}: </Label>
            <span>
              {getDisplayFileSize(
                sum(files, (file) => (file && file.size) || 0),
              )}
            </span>
          </div>
        </div>
      );
    }
    const file = files[0];
    return (
      <div className={className}>
        <Preview
          key={getFileKeyForElement(file)}
          style={this.previewStyle}
          file={file}
        />
        <div>
          <Label>{t1('name')}: </Label>
          <span>{file.name}</span>
        </div>
        <div>
          <Label>{t1('type')}: </Label>
          <span>{file.display_type}</span>
        </div>
        <div>
          <Label>URL: </Label>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            title={file.url}
            style={{
              maxWidth: 200,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {file.url}
          </a>
        </div>
        <div>
          <Label>{t1('created_at')}: </Label>
          <span>{timestampToDateTimeString(file.ts)}</span>
        </div>
        {file.updated_ts && (
          <div>
            <Label>{t1('modified_at')}: </Label>
            <span>{timestampToDateTimeString(file.updated_ts)}</span>
          </div>
        )}
        <div>
          <Label>{t1('size')}: </Label>
          <span>{getDisplayFileSize(file.size)}</span>
        </div>
      </div>
    );
  }
}

File.propTypes = {
  className: PropTypes.string,
};

File.defaultProps = {
  className: '',
};

export default File;
