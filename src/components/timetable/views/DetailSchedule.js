/* eslint-disable jsx-a11y/anchor-is-valid,no-undef,react/prop-types */
import React, { Component } from 'react';
import { t1 } from 'translate';
import Avatar from 'components/common/avatar';
import get from 'lodash.get';
import routes from 'routes';

class DetailSchedule extends Component {
  style = {
    teacher: { display: 'flex', flexDirection: 'row' },
    avatar: { width: 24, height: 24, borderRadius: 12, fontSize: '13px' },
    courseName: { fontWeight: 'bold' },
    time: { fontWeight: 'bold', fontStyle: 'italic' },
    place: { fontStyle: 'italic' },
  };
  handleOnclick = () => {
    const { schedule, onCloseDialog, history, place } = this.props;
    let { linkTo } = schedule;

    onCloseDialog();

    if (place !== 'frontend') {
      linkTo = routes.url('edit_item', {
        base: '',
        item: { ntype: 'credit', iid: get(schedule, 'course.credit_syllabus') },
      });
    }

    history.push(linkTo);
  };

  render() {
    const { schedule } = this.props;

    return (
      <div
        className="teacher-schedule"
        style={{ color: 'black', fontSize: '14px' }}
      >
        <div style={this.style.courseName}>
          {t1('subject')}: {get(schedule, 'course.name')}
        </div>
        <div style={this.style.courseName}>
          {t1('subject_code')}: {get(schedule, 'course.code')}
        </div>
        <div className="room" style={this.style.place}>
          {t1('venue')}: {get(schedule, 'room.venue.name')}
        </div>
        <div className="room" style={this.style.place}>
          {t1('room')}: {get(schedule, 'room.name')}
        </div>
        <div className="time_from" style={this.style.time}>
          {schedule && schedule.timeFrom} - {schedule && schedule.timeTo} (
          {schedule && schedule.desc}
          &apos;)
        </div>
        {schedule && schedule.teachers && (
          <div style={this.style.teacher}>
            {schedule &&
              schedule.teachers.map(
                (teacher) =>
                  teacher && (
                    <Avatar
                      className="avatar"
                      user={teacher}
                      style={this.style.avatar}
                      alt={teacher.name}
                    />
                  ),
              )}
          </div>
        )}
        <div> </div>
        <button onClick={this.handleOnclick}>{t1('syllabus_content')}</button>
      </div>
    );
  }
}

export default DetailSchedule;
