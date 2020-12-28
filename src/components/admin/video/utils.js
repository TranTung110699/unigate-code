import get from 'lodash.get';
import DurationPreview from 'schema-form/elements/social-video-input/DurationPreview';
import React from 'react';

/**
 * Whether or not the lecture has any video
 * @param node
 * @return {boolean}
 */

export const videoIsPlayable = (node) => {
  if (node.youtube || node.vimeo || node.attachments) return true;
  return false;
};

export const VideoActionRender = (props) => {
  const dt = get(props, 'attachment.dt');
  const formid = get(props, 'formid');

  return (
    <DurationPreview
      className="attachment-video"
      id={get(props, 'attachment.id')}
      max={get(props, 'attachment.dt')}
      st={get(props, 'attachment.st', '00:00')}
      et={get(props, 'attachment.et', dt)}
      link={get(props, 'attachment.link')}
      formid={formid}
      type="attachments"
      defaultValue={get(props, 'attachment')}
    />
  );
};

export const AudioActionRender = (props) => (
  <div>
    <img
      src={get(props, 'attachment.link')}
      alt={get(props, 'attachment.name')}
      style={{
        maxHeight: '150px',
        maxWidth: '150px',
        height: 'auto',
        width: 'auto',
      }}
    />
  </div>
);
