import React from 'react';
import store from 'store/index';
import Avatar from 'components/common/avatar';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import './stylesheet.scss';

const style = {
  teacher: { display: 'flex', flexDirection: 'row' },
  avatar: { width: 24, height: 24, borderRadius: 12, fontSize: '13px' },
  courseName: { fontWeight: 'bold' },
  time: { fontWeight: 'bold', fontStyle: 'italic' },
  place: { fontStyle: 'italic' },
};

export default (event) => {
  const data = event.event;
  if (!data) return '';

  const state = store.getState();
  if (state && state.event && state.event.viewType === 'day') {
    return (
      <Link
        to={data.linkTo}
        className="teacher-schedule"
        style={{ marginTop: '4px' }}
      >
        {event.title}
      </Link>
    );
  }

  return (
    <div className="teacher-schedule">
      <div style={style.courseName}>{get(data, 'course.name')}</div>
      <div className="room" style={style.place}>
        {get(data, 'room.venue.name')}
      </div>
      <div className="room" style={style.place}>
        {get(data, 'room.name')}
      </div>
      <div className="time_from" style={style.time}>
        {data.timeFrom} - {data.timeTo} ({data.desc}
        &apos;)
      </div>
      {(() => {
        let displayers = get(data, 'course.displayers');

        if (!displayers) {
          displayers = get(data, 'teachers');
        }

        return (
          <div style={style.teacher}>
            {displayers &&
              displayers.map(
                (teacher) =>
                  teacher &&
                  teacher.iid && (
                    <Avatar
                      className="avatar"
                      user={teacher}
                      style={style.avatar}
                      alt={teacher.name}
                    />
                  ),
              )}
          </div>
        );
      })()}
    </div>
  );
};
