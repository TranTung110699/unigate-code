import React from 'react';
import { findDOMNode } from 'react-dom';
import { t1 } from 'translate/index';
import Avatar from 'components/common/avatar/index';
import { timestampToDateTimeString } from 'common/utils/Date';
import FlatButton from 'components/common/mui/FlatButton';
import './stylesheet.scss';
import Icon from '../../Icon';
import lodashGet from 'lodash.get';

const styles = {
  enableResolveButton: {
    cursor: 'pointer',
  },
};

const ShowDetail = ({
  elementReplyComment,
  item,
  onResolveComment,
  displayInAdmin,
  handleShowReplyComment,
  canResolveComment,
}) => {
  const { user, comment, replies } = item;
  const { content } = comment;
  const isResolved = comment.is_resolved;

  return (
    <div className="detail-a-comment">
      <Avatar className="avatar" user={user} size={40} />
      <div className="content-wrapper">
        <div className="bar">
          <span className={`name ${isResolved ? 'style-resolved' : ''}`}>
            {user && user.name}
          </span>
          <span className="date-time text-muted">
            {timestampToDateTimeString(item.ts)}
          </span>
          <span className="reply-comment">
            <Icon
              icon="reply"
              className="action"
              onClick={handleShowReplyComment}
            >
              {' '}
              {t1('reply')}{' '}
            </Icon>
          </span>
          {canResolveComment ? (
            !isResolved ? (
              <FlatButton
                label={t1('resolve')}
                className="resolve"
                style={styles.enableResolveButton}
                onClick={() => {
                  onResolveComment(item);
                }}
              />
            ) : (
              <div
                className={`resolve-button ${
                  displayInAdmin ? 'resolved-admin' : 'resolved'
                }`}
              >
                {t1('resolved')}
              </div>
            )
          ) : null}
        </div>
        <span className={`content ${isResolved ? 'style-resolved' : ''}`}>
          {content}
        </span>
        {Array.isArray(replies) &&
          replies.length > 0 &&
          replies.map((reply) => (
            <ShowDetail
              key={lodashGet(reply, 'id')}
              onResolveComment={onResolveComment}
              displayInAdmin={displayInAdmin}
              handleShowReplyComment={handleShowReplyComment}
              item={reply}
              canResolveComment={canResolveComment}
            />
          ))}
        {elementReplyComment}
      </div>
    </div>
  );
};

class Index extends React.PureComponent {
  componentDidUpdate(prevProps, prevState) {
    const { item, replyCommentItem } = this.props;
    if (item.id === replyCommentItem) {
      const tesNode = findDOMNode(this.myRef);
      if (tesNode) {
        const h = (Array.isArray(item.replies) && item.replies.length) || 1;
        window.scrollTo(0, tesNode.offsetTop + h * 70);
      }
    }
  }

  render() {
    const {
      item,
      displayInAdmin,
      elementReplyComment,
      handleShowReplyComment,
      onResolveComment,
      canResolveComment,
      withRef,
    } = this.props;

    return (
      <div
        ref={(el) => {
          if (typeof withRef === 'function') {
            withRef(el);
          }
          this.myRef = el;
        }}
      >
        <ShowDetail
          item={item}
          displayInAdmin={displayInAdmin}
          elementReplyComment={elementReplyComment}
          handleShowReplyComment={handleShowReplyComment}
          onResolveComment={onResolveComment}
          canResolveComment={canResolveComment}
        />
      </div>
    );
  }
}

export default Index;
