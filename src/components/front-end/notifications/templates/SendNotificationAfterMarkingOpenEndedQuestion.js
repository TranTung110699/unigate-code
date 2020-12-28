import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import Link from 'components/common/router/Link';
import { removeHostname } from 'common/utils/url';

const linkStyle = {
  width: '100%',
};

class SendNotificationAfterMarkingOpenEndedQuestion extends Component {
  render() {
    const { item } = this.props;

    let linkToViewScore = lodashGet(item, 'params.link_to_view_score');
    linkToViewScore = linkToViewScore && removeHostname(linkToViewScore);
    linkToViewScore = linkToViewScore || '#';

    return (
      <Link to={linkToViewScore} style={linkStyle}>
        {t1('you_answer_for_exercise_%s_of_course_%s_has_been_marked', [
          lodashGet(item, 'params.exercise.name'),
          lodashGet(item, 'params.course.name'),
        ])}
      </Link>
    );
  }
}

SendNotificationAfterMarkingOpenEndedQuestion.propTypes = {};

export default SendNotificationAfterMarkingOpenEndedQuestion;
