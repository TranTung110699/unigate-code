import React from 'react';
import VideoPlayer from 'components/common/media-player/video';
import HtmlContent from 'components/common/html';
import AttachmentViewer from '../attachment-viewer';

const ViewAnswer = ({ answer, showHeader = true }) => {
  return [
    answer.youtube && (
      <VideoPlayer
        controls
        youTubeId={answer.youtube}
        autoPlay="true"
        width="100%"
      />
    ),
    answer.content && <HtmlContent content={answer.content} />,
    answer.attachments && (
      <div>
        <AttachmentViewer
          attachments={answer.attachments}
          showHeader={showHeader}
        />
      </div>
    ),
  ];
};

export default ViewAnswer;
