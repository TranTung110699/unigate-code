import React from 'react';
import { t, t1 } from 'translate';
import lodashGet from 'lodash.get';
import Avatar from 'components/common/avatar/index';
import Link from 'components/common/router/Link';

const replyComment = ({ item }) => {
  return (
    <Link
      to={`${lodashGet(
        item,
        'params.comment.link_to_item',
      )}?reply_comment_item=${lodashGet(item, 'params.reply_comment_item')}`}
    >
      <Avatar user={lodashGet(item, 'params.who_reply')} size={20} />
      {` ${t1('reply_to_your_comment')}`}
    </Link>
  );
};

export default replyComment;
