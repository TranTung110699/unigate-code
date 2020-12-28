import React, { Component } from 'react';
import Link from 'components/common/router/Link';
import { ListItem } from 'material-ui/List';
import Avatar from 'components/common/avatar/index';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import RemindFinishCourseTemplate from './templates/RemindFinishCourseTemplate';
import NotifyUserWhenSyllabusStatusChange from './templates/NotifyUserWhenSyllabusStatusChange';
import NotifyUserToReviewSyllabus from './templates/NotifyUserToReviewSyllabus';
import InviteEnrolmentPlanMembersToCourses from './templates/InviteEnrolmentPlanMembersToCourses';
import ReplyComment from './templates/ReplyComment';
import AddSyllabusStaff from './templates/AddSyllabusStaff';
import SendNotificationAfterMarkingOpenEndedQuestion from './templates/SendNotificationAfterMarkingOpenEndedQuestion';
import SendNotificationAfterCommentOnOpenEndedQuestionAnswer from './templates/SendNotificationAfterCommentOnOpenEndedQuestionAnswer';

const style = {
  float: 'left',
  marginRight: '10px',
};

const linkStyle = {
  width: '100%',
};

class NotificationItem extends Component {
  render() {
    const { item } = this.props;
    switch (lodashGet(item, 'template')) {
      case 'add_syllabus_staff': {
        return <AddSyllabusStaff item={item} />;
      }
      case 'remind_finish_course':
        return <RemindFinishCourseTemplate item={item} />;
      case 'notify_user_when_syllabus_status_change':
        return <NotifyUserWhenSyllabusStatusChange item={item} />;
      case 'invite_to_review':
        return <NotifyUserToReviewSyllabus item={item} />;
      case 'invite_enrolment_plan_members_to_courses':
        return <InviteEnrolmentPlanMembersToCourses item={item} />;
      case 'reply_comment': {
        return <ReplyComment item={item} />;
      }
      case 'send_notification_after_marking_open_ended_question':
        return <SendNotificationAfterMarkingOpenEndedQuestion item={item} />;
      case 'send_notification_after_comment_on_open_ended_question_answer':
        return (
          <SendNotificationAfterCommentOnOpenEndedQuestionAnswer item={item} />
        );
      default: {
        return (
          <ListItem key={`notification-${item.receiver.iid}`}>
            <Link to="#" style={linkStyle}>
              <span className="profile-icon-panel" style={style}>
                <Avatar user={item.receiver} />
              </span>
              <div className="signined">
                <p className="nav-link">
                  {t1('template_%s_has_not_defined_yet', [
                    item && item.template,
                  ])}
                </p>
              </div>
            </Link>
          </ListItem>
        );
      }
    }
  }
}

NotificationItem.propTypes = {};

export default NotificationItem;
