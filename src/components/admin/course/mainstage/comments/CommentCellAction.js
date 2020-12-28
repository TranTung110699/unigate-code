import React, { Component } from 'react';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
// import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';
import store from 'store';
import lGet from 'lodash.get';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Icon from 'components/common/Icon';
import Comment from 'components/common/comment/collaborating-item-comment';
import { commentTypes } from 'configs/constants/comment';

const label = {
  preview: t1('preview'),
  delete: t1('delete'),
  edit: t1('edit'),
};

class CommentCellAction extends Component {
  handleShowComments = (item) => {
    const collaboratingItem = lGet(item, 'comment.collaborating_item');
    const syllabusIid = lGet(item, 'comment.syllabus_iid');
    const linkToItem = lGet(item, 'comment.link_to_item');
    const contentDialog = (
      <Comment
        syllabusIid={syllabusIid}
        collaboratingItem={collaboratingItem}
        displayInAdmin
        linkToItem={linkToItem}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    store.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  render() {
    const { item, formid } = this.props;
    const commentType = lGet(item, 'type');
    return (
      <div>
        {/*
          {commentType === commentTypes.COMMENT_COLLABORATING_ITEM && (
            <Icon
              title={t1('comment_preview')}
              icon="preview"
              onClick={() => this.handleShowComments(item)}
            />
          )}{' '} {' '} {' '}
         */}
        <DeleteItem
          title={label.delete}
          textComfirm={label.textConfirm}
          formid={formid}
          itemId={item.id}
          iconButton
          alternativeApi={commentApiUrls.resolve_comment}
          params={{
            status: 'deleted',
          }}
          step={'status'}
          textConfirm={t1('are_you_sure_you_want_to_delete_this_comment?')}
        />
      </div>
    );
  }
}

CommentCellAction.propTypes = {};

export default CommentCellAction;
