import React from 'react';
import Icon from 'components/common/Icon';
import defaultImage from './upload.svg';
import Audio from 'components/common/media-player/audio';
import { t1 } from 'translate';

function InputFilePreviewer(props) {
  const { value, fileType, maxSize, defaultImageStyle, imageStyle } = props;

  const style = {
    maxWidth: maxSize || '100px',
    width: maxSize || '100px',
  };

  if (fileType === 'image')
    return (
      <div onClick={props.onClick} title={t1('click_to_upload')}>
        <img
          src={value || defaultImage}
          style={Object.assign(
            {},
            style,
            value ? { width: imageStyle } : { width: defaultImageStyle },
          )}
        />
      </div>
    );
  else if (fileType === 'audio') {
    return (
      <div>
        {value && <Audio src={value} />}{' '}
        <span onClick={props.onClick}>
          {!value && (
            <img
              src={defaultImage}
              style={Object.assign(
                {},
                style,
                value ? { width: imageStyle } : { width: defaultImageStyle },
              )}
            />
          )}
          {value && (
            <Icon icon="upload" title={t1('replace_with_another_file')} />
          )}
        </span>
      </div>
    );
  }

  return (
    <div onClick={props.onClick} title={t1('click_to_upload')}>
      <Icon style={props.iconStyle} icon="fileUpload" className="icon-upload" />
    </div>
  );
}

export default InputFilePreviewer;
