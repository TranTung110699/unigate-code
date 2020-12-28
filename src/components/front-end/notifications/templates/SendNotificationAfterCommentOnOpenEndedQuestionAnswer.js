import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import { t } from 'translate';
import Link from 'components/common/router/Link';
import { removeHostname } from 'common/utils/url';

const linkStyle = {
  width: '100%',
};

class SendNotificationAfterCommentOnOpenEndedQuestionAnswer extends Component {
  render() {
    const { item } = this.props;

    const isMarker = lodashGet(item, 'params.receiver.is_marker');
    const isTaker = lodashGet(item, 'params.receiver.is_taker');

    let linkToItem = lodashGet(item, 'params.link_to_item');
    linkToItem = linkToItem && removeHostname(linkToItem);
    linkToItem = linkToItem || '#';

    if (isTaker) {
      return (
        <Link style={linkStyle} to={linkToItem}>
          <b>{lodashGet(item, 'params.who_comment.name')}</b>{' '}
          {t('comment_on_your_open_ended_question_answer')}
        </Link>
      );
    }

    if (isMarker) {
      return (
        <Link style={linkStyle} to={linkToItem}>
          <b>{lodashGet(item, 'params.who_comment.name')}</b>{' '}
          {t('comment_on_the_open_ended_question_answer_that_you_have_marked')}
        </Link>
      );
    }

    return null;
  }
}

SendNotificationAfterCommentOnOpenEndedQuestionAnswer.propTypes = {};

export default SendNotificationAfterCommentOnOpenEndedQuestionAnswer;
