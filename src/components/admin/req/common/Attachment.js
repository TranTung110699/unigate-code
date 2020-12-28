import React from 'react';
import Icon from 'components/common/Icon/index';

export default ({ attachments }) => {
  if (!attachments) {
    return null;
  }
  return attachments.map((attachment) => (
    <a href={attachment && attachment.link} className="download-template">
      <Icon
        icon="fileDownload"
        style={{
          fontSize: 20,
          top: 4,
        }}
      />{' '}
      {attachment && attachment.name}
    </a>
  ));
};
