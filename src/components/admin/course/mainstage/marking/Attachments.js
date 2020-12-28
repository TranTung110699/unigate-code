import React from 'react';

import AttachmentPreview from './AttachmentPreview';

const Attachments = ({ attachments }) => (
  <div>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {attachments.map((attachment, i) => (
        <li key={attachment.id || i}>
          <AttachmentPreview i={i} attachment={attachment} />
        </li>
      ))}
    </ul>
  </div>
);

export default Attachments;
