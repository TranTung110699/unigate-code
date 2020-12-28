import DetailOnDialog from 'components/common/detail-on-dialog';
import React from 'react';
import Comment from 'components/common/comment/collaborating-item-comment';
import CommentView from 'components/common/comment/comment-number/index';

const comment = ({ node = {}, syllabusIid, handleFetchNode }) => (
  <DetailOnDialog
    renderPreview={({ showFull }) => (
      <CommentView
        onClick={showFull}
        displayInAdmin
        resolveCount={node.resolve_count}
        resolvedCount={node.resolved_count}
      />
    )}
    renderFull={() => (
      <Comment
        syllabusIid={syllabusIid}
        collaboratingItem={node}
        displayInAdmin
        linkToItem={window.location.href}
        onSendCommentSuccessfully={handleFetchNode}
        onResolvedCommentSuccessfully={handleFetchNode}
      />
    )}
    dialogOptionsProperties={{
      modal: true,
      handleClose: true,
    }}
  />
);

export default comment;
