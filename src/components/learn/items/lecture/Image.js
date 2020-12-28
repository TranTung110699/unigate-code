import React from 'react';
import { getAttachment } from 'components/learn/items/lecture/common';

const Image = ({ node, className }) => {
  const attachment = getAttachment(node);

  return (
    <div className={`${className || ''} lecture-image`}>
      {node && attachment && attachment.link && (
        <img src={attachment.link} alt={node.name} />
      )}
    </div>
  );
};
export default Image;
