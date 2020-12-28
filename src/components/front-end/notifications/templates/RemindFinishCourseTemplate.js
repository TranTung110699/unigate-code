import React, { Component } from 'react';
import Link from 'components/common/router/Link';
import { ListItem } from 'material-ui/List';
import Avatar from 'components/common/avatar/index';
import { t, t1 } from 'translate';
import Links from 'routes/links';
import { timestampToDateString } from '../../../../common/utils/Date';

const style = {
  float: 'left',
  marginRight: '10px',
};

const linkStyle = {
  width: '100%',
};

class RemindFinishCourseTemplate extends Component {
  render() {
    const { item } = this.props;

    return (
      <ListItem key={`notification-${item.receiver.iid}`}>
        <Link
          to={Links.overViewCourse(
            item && item.params && item.params.course,
            false,
          )}
          style={linkStyle}
        >
          <span className="profile-icon-panel" style={style}>
            <Avatar user={item.receiver} />
          </span>
          <div className="signined">
            <p className="nav-link">
              {t1('you_need_to_finish_course')}{' '}
              <b>
                {item &&
                  item.params &&
                  item.params.course &&
                  item.params.course.name}
              </b>{' '}
              {t('before')}{' '}
              <b className="warning-text">
                {timestampToDateString(
                  item &&
                    item.params &&
                    item.params.course &&
                    item.params.course.end_date,
                )}
              </b>
            </p>
          </div>
        </Link>
      </ListItem>
    );
  }
}

RemindFinishCourseTemplate.propTypes = {};

export default RemindFinishCourseTemplate;
