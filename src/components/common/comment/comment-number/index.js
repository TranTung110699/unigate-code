import React, { Component } from 'react';
import './stylesheet.scss';
import CommentGray from './comment_gray.png';
import CommentWhite from './comment_white.png';
import { t1 } from 'translate';
import Badge from 'antd/lib/badge';
import Icon from 'antd/lib/icon';

class Index extends Component {
  render() {
    const { resolveCount, resolvedCount, displayInAdmin, onClick } = this.props;
    if (!resolveCount && !resolvedCount && !displayInAdmin) return '';

    const resolveNumber = parseInt(resolveCount, 10);
    const resolvedNumber = parseInt(resolvedCount, 10);
    const isResolved = resolveNumber <= 0;
    const commentCount = isResolved ? resolvedNumber : resolveNumber;

    const CommentIcon = (
      <Badge
        count={commentCount || 0}
        overflowCount={9999}
        style={{ padding: '0 5px', fontSize: 10 }}
      >
        <Icon
          type="message"
          style={{ fontSize: 20, paddingTop: 5, cursor: 'pointer' }}
        />
      </Badge>
    );

    if (displayInAdmin) {
      return <div onClick={onClick}>{CommentIcon}</div>;
    }
    if (isResolved) return null;

    return (
      <div
        className="comment-number"
        title={t1('collaborators_comments_on_this_item')}
      >
        {/*<img src={CommentWhite} className="comment-background" alt="" />
        <div className={'text-comment-number text-comment-number-resolve'}>
          {commentCount || '0'}
        </div>*/}
        {CommentIcon}
      </div>
    );
  }
}

export default Index;
