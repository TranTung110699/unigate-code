import React from 'react';
import { findDOMNode } from 'react-dom';
import { t1 } from 'translate/index';
import Avatar from 'components/common/avatar/index';
import {
  timestampToDateTimeString,
  displayDurationSinceEpochTime,
} from 'common/utils/Date';
import FlatButton from 'components/common/mui/FlatButton';
import './stylesheet.scss';
import Icon from '../../Icon';
import lodashGet from 'lodash.get';
import Comment from 'antd/lib/comment';
import Tooltip from 'antd/lib/tooltip';
import styled from 'styled-components';
import DetailOnDialog from '../../detail-on-dialog';
import Card from 'antd/lib/card';

const styles = {
  pointerCursor: {
    cursor: 'pointer',
  },
};

const CommentStyled = styled(Comment)`
  .ant-comment-inner {
    padding: 5px 0;
  }
`;

const ProfileCard = ({ user, type }) => {
  const size = 300;
  const renderFull = ({}) => (
    <Card
      style={{ width: size }}
      cover={
        <Avatar className="avatar" user={user} shape="square" size={size - 2} />
      }
    >
      <Card.Meta
        title={user && user.name}
        description={lodashGet(user, 'organization_name')}
      />
    </Card>
  );

  const renderPreview = ({ showFull }) => {
    return (
      <span onClick={showFull}>
        {type === 'avatar' ? (
          <Avatar className="avatar" user={user} />
        ) : (
          <span style={styles.pointerCursor}>{user && user.name}</span>
        )}
      </span>
    );
  };

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey="profile_card"
      dialogOptionsProperties={{
        handleClose: true,
        modal: true,
        width: size + 48,
      }}
    />
  );
};

const AntComment = ({
  item,
  onResolveComment,
  displayInAdmin,
  handleShowReplyComment,
  canResolveComment,
  children,
}) => {
  const { user, comment } = item;
  const { content } = comment;
  const isResolved = comment.is_resolved;

  return (
    <CommentStyled
      actions={[
        <span className="reply-comment">
          <Icon
            icon="reply"
            className="action"
            onClick={handleShowReplyComment}
          >
            &nbsp;{t1('reply')}
          </Icon>
        </span>,
        ...(canResolveComment
          ? [
              !isResolved ? (
                <FlatButton
                  label={t1('resolve')}
                  className="resolve"
                  style={styles.pointerCursor}
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
              ),
            ]
          : []),
      ]}
      author={ProfileCard({ user })}
      avatar={ProfileCard({ user, type: 'avatar' })}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={timestampToDateTimeString(item.ts)}>
          {t1('%s_ago', [displayDurationSinceEpochTime(item.ts)])}
        </Tooltip>
      }
    >
      {children}
    </CommentStyled>
  );
};

const ShowDetail = ({
  elementReplyComment,
  item,
  onResolveComment,
  displayInAdmin,
  handleShowReplyComment,
  canResolveComment,
}) => {
  const { replies } = item;
  return (
    <AntComment
      elementReplyComment={elementReplyComment}
      item={item}
      onResolveComment={onResolveComment}
      displayInAdmin={displayInAdmin}
      handleShowReplyComment={handleShowReplyComment}
      canResolveComment={canResolveComment}
    >
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
    </AntComment>
  );
};

class AntCommentDetail extends React.PureComponent {
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

export default AntCommentDetail;
