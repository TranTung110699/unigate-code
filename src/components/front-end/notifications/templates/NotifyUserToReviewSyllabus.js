import React, { Component } from 'react';
import { t1 } from 'translate';

class NotifyUserToReviewSyllabus extends Component {
  render() {
    const { item } = this.props;

    return (
      <a href={item && item.params && item.params.link}>
        {t1('you_are_invited_to_review_syllabus')}:{' '}
        <b>{item && item.params && item.params.learning_item_text}</b>
      </a>
    );
  }
}

NotifyUserToReviewSyllabus.propTypes = {};

export default NotifyUserToReviewSyllabus;
