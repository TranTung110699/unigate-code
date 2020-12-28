import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconInsertComment from 'material-ui/svg-icons/editor/insert-comment';
import IconEditComment from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import Attachments from './Attachments';

const CommentsContent = (props) => {
  const { handleCommentTake, item, index } = props;

  return (
    <div>
      {item.comments.map((comment, cIndex) => (
        <Paper
          className="take-comments"
          key={`${item.takeId || index}-comments-${cIndex}`}
        >
          <div className="account-comment">
            By <b>{comment.u && comment.u.name}</b>
            <IconEditComment
              style={{ float: 'right' }}
              onClick={() => {
                handleCommentTake({ ...item, cIndex });
              }}
            />
          </div>

          <div className="content-comment">
            {comment.content && (
              <div>
                <p>{comment.content}</p>
              </div>
            )}
            {comment.attachments && comment.attachments.length && (
              <Attachments attachments={comment.attachments} />
            )}
          </div>
        </Paper>
      ))}
    </div>
  );
};

class Comments extends Component {
  handleOpenDialog() {
    const contentDialog = CommentsContent(this.props);
    const title = t1('answer_comments');
    const optionsProperties = {
      handleClose: true,

      title,
    };
    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  }

  render() {
    const { handleCommentTake, item, index } = this.props;
    return (
      <div>
        <IconInsertComment
          title={t1('add_comment')}
          onClick={() => {
            handleCommentTake(item);
          }}
        />

        {item.comments && (
          <a
            onClick={() => {
              this.handleOpenDialog();
            }}
          >
            {item.comments.length} {t1('comments')}
          </a>
        )}
      </div>
    );
  }
}

export default connect()(Comments);
