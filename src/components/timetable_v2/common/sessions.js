import React from 'react';
import Drawer from 'antd/lib/drawer';
import Form from 'antd/lib/form';
import { t1 } from 'translate';
import { getTeacherAvatar } from '../utils/index';
import moment from 'moment';
import Avatar from 'antd/lib/avatar';
import List from 'antd/lib/list';
import { getTimeName } from '../utils/DailyUnixTimestamp';
import datetimeFormat from '../configs';
import { timestampToDateString } from 'common/utils/Date';
import get from 'lodash.get';

import 'antd/lib/list/style';
import 'antd/lib/avatar/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/time-picker/style';
import 'antd/lib/drawer/style';
import '../stylesheet.scss';
import {
  ILT_BBB,
  ROOM_TYPE_VIRTUAL_ROOM,
} from '../../admin/session/common/constants';

class TimetableSetting extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { open, onSwitchState } = this.props;
    const sessions = this.props.sessions || [];
    return (
      <Drawer
        title={t1('session_of_timetable')}
        placement="right"
        closable={false}
        width={520}
        onClose={() => {
          onSwitchState();
        }}
        visible={open}
      >
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={sessions}
          renderItem={(session) => (
            <List.Item actions={getDateOfScheduledInfo(session)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={getBgColorStyle(session)}
                    icon={
                      session.status === 'init'
                        ? 'question-circle'
                        : 'check-circle'
                    }
                  />
                }
                title={
                  <span style={getColorStyle(session)}>
                    {session.name}
                    {session.status === 'studied' ? (
                      <span style={{ color: '#cccccc' }}>
                        ({t1(session.status)})
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                }
                description={getSessionDescription(session)}
              />
            </List.Item>
          )}
        />
      </Drawer>
    );
  }
}

export default Form.create()(TimetableSetting);

const INIT_STATUS = 'init';
const activeColorStyle = { color: '#87d068' };
const activeBgStyle = { backgroundColor: '#87d068' };

export const getDateOfScheduledInfo = (session, action = true) => {
  if (session.scheduled) {
    if (!action) {
      return (
        <div>
          {session.scheduled.date_time &&
            timestampToDateString(session.scheduled.date_time)}
          <div>{`${getTimeName(session.scheduled.start_time)} -> ${getTimeName(
            session.scheduled.end_time,
          )}`}</div>
        </div>
      );
    }
    return [
      <span>{getTimeName(session.scheduled.start_time)}</span>,
      <span>{getTimeName(session.scheduled.end_time)}</span>,
    ];
  }
  return t1('session_not_yet_scheduled');
};

export const getSessionDescription = (session) => (
  <div className="session-des">
    <div className="first" />
    <div>
      {session.teachers &&
        session.teachers.map((teacher) => getTeacherAvatar(teacher))}{' '}
      {getSessionDate(session)}{' '}
      {` ${t1('room')}: ${getSessionRoomName(session)}`}
    </div>
  </div>
);

export const getSessionRoomName = (session) => {
  return get(session, 'room.name') || '';
};

export const getSessionDate = (session) => {
  if (session.status === INIT_STATUS) {
    return;
  }

  if (session.scheduled && session.scheduled.date_time) {
    return moment(session.scheduled.date_time * 1000).format(
      datetimeFormat.DATE_FORMAT,
    );
  }
};

const getColorStyle = (session) => {
  if (session.status === INIT_STATUS) {
    return {};
  }

  return activeColorStyle;
};

const getBgColorStyle = (session) => {
  if (session.status === INIT_STATUS) {
    return {};
  }

  return activeBgStyle;
};
