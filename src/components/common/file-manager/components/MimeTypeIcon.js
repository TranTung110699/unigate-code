import React from 'react';

const getIconClassForMimeType = (mimeType) => {
  // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
  const icon_classes = {
    // Media
    image: 'icon ti ti-image',
    audio: 'icon ti ti-music-alt',
    video: 'icon ti ti-control-play',
    // Documents
    'application/pdf': 'icon ti ti-file',
    'application/msword': 'icon ti ti-file',
    'application/vnd.ms-word': 'icon ti ti-file',
    'application/vnd.oasis.opendocument.text': 'icon ti ti-file',
    'application/vnd.openxmlformats-officedocument.wordprocessingml':
      'icon ti ti-file',
    'application/vnd.ms-excel': 'icon ti ti-file',
    'application/vnd.openxmlformats-officedocument.spreadsheetml':
      'icon ti ti-file',
    'application/vnd.oasis.opendocument.spreadsheet': 'icon ti ti-file',
    'application/vnd.ms-powerpoint': 'icon ti ti-file',
    'application/vnd.openxmlformats-officedocument.presentationml':
      'icon ti ti-file',
    'application/vnd.oasis.opendocument.presentation': 'icon ti ti-file',
    'text/plain': 'icon ti ti-file',
    'text/html': 'icon ti ti-html5 ',
    'application/json': 'icon ti ti-file',
    // Archives
    'application/gzip': 'icon ti ti-zip',
    'application/zip': 'icon ti ti-zip',
  };

  const keys = Object.keys(icon_classes);
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    if (mimeType && mimeType.indexOf(k) !== -1) {
      return `${icon_classes[k]}`;
    }
  }
  return 'icon ti ti-file';
};

const MimeTypeIcon = ({ className, mimeType }) => (
  <i className={`${className || ''} ${getIconClassForMimeType(mimeType)}`} />
);

export default MimeTypeIcon;
