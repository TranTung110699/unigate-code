import React, { Component } from 'react';

import { Portal } from 'react-portal';
import Card from 'antd/lib/card';

class CommonPortal extends Component {
  render() {
    const { id, insideCard, title, className } = this.props;

    let content;
    if (insideCard)
      content = (
        <Card title={title} className={className}>
          {this.props.children}
        </Card>
      );
    else content = this.props.children;

    return (
      <Portal node={document && document.getElementById(id)}>{content}</Portal>
    );
  }
}

export default CommonPortal;

export const portals = {
  MARKING_ASSESSMENT_RESULT: 'assessment_of_teacher_and_peer_assessment',
  BREADCRUMB_THE_ITEM_IS_LEARNING: 'portals_breadcrumb-the-item-is-learning',
  QUESTION_NAVIGATIONS: 'portals_exercise-question-navigation',
  EXERCISE_TIMER: 'portals_exercise-timer',
  EXERCISE_FINISH_BUTTON: 'portals_exercise-finish-button',
  LEARN_NAV: 'portals_learn_nav',
  VIDEO_TRANSCRIPT: 'portals_video_transcript',
  SP1_QUESTION_NAV_INSIDE_COURSE_LEARN_NAV:
    'sp1-question-nav-inside-course-nav',
  SP1_QUESTION_NAVIGATIONS_RIGHT_BAR: 'sp1-question-nav-right-side',
  questionHeader: (id) => `question-header-${id}`,
  questionAction: (id) => `question-action-${id}`,
  EXERCISE_CONTROL: 'learn-screen-container',
  QUESTION_NAVIGATIONS_NUMBER: 'question_navigations_number',
};
