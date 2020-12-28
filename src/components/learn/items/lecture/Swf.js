import React from 'react';
import { getAttachment } from 'components/learn/items/lecture/common';

const Swf = ({ node, className }) => {
  const attachment = getAttachment(node);
  return (
    <div className={`${className || ''} lecture-swf`}>
      {node && attachment && attachment.link && (
        <embed
          src={attachment.link}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default Swf;
