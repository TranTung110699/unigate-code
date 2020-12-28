import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/lib/icon';
import Avatar from 'antd/lib/avatar';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import timetableAction from 'actions/timetable/TimetableV2';

import ClassPopup from './ClassPopup';
import TeacherPopup from './TeacherPopup';
import ScheduleSettingPopup from './ScheduleSettingPopup';
import { getTeacherAvatar, teacherIconStyle } from './utils/index';
import CellInfoToolTip from './CellInfoToolTip';

const getClassAvatar = (course) => {
  const style = { color: '#f56a00', backgroundColor: '#fde3cf' };
  let name = (course && course.name) || '';
  let code = (course && course.code) || '';

  return (
    <Tooltip title={`${code ? `${code} - ` : ''} ${name}`}>
      <Avatar icon="table" shape="square" size="small" style={style}>
        {code}{' '}
      </Avatar>
    </Tooltip>
  );
};

class ScheduleOfSessionBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openTeacherBox: false,
      openClassBox: false,
      openTimetableSettings: false,
    };
  }

  getTimetable = () => {
    const cell = this.props.cell || {};
    return cell.timetable || {};
  };

  switchStateOfClassPopupBox = () => {
    this.setState({ openClassBox: !this.state.openClassBox });
  };

  switchStateOfTimetableSettings = () => {
    this.setState({ openTimetableSettings: !this.state.openTimetableSettings });
  };

  switchStateOfTeacherPopupBox = () => {
    this.setState({ openTeacherBox: !this.state.openTeacherBox });
  };

  onConfirmDeleteOnDay = () => {
    this.removeTimetableParams();
  };

  onConfirmDeleteTimetable = () => {
    this.removeTimetableParams(true);
  };

  /**
   * hàm này sẽ call đến saga rồi xóa timetable vừa chọn. Nếu isAllOfTimetable === fail, sẽ chỉ xóa ngày hiển tại nên param phải có unixTimestamp
   * @param isAllOfTimetable
   */
  removeTimetableParams = (isAllOfTimetable) => {
    const { cell, course, dispatch } = this.props;
    const { date, timetable } = cell;

    const params = {
      timetable_iid: timetable.iid,
      course_iid: course.iid,
    };
    if (!isAllOfTimetable) {
      params.unixTimestamp = date.getTime() / 1000;
    }
    dispatch(timetableAction.removeTimetable(params, { course }));
  };

  getCourseLink = () => {
    const { class_iids } = this.getTimetable();
    const { history } = this.props;
    history.push(getUrl('timetable_link', { iid: class_iids[0] }));
  };

  getSession = () => {
    const { sessions, cell } = this.props;
    if (
      !Array.isArray(sessions) ||
      !sessions.length ||
      !cell ||
      !cell.scheduled ||
      cell.scheduled.length === 0
    ) {
      return null;
    }
    const { session_iids } = cell.scheduled;

    if (!Array.isArray(session_iids) || !session_iids.length) {
      return null;
    }

    return sessions.find((session) => {
      return session_iids.includes(session.iid);
    });
  };

  isEditableBox = (course, timetable) => {
    const courseIidsInTimetable = timetable.class_iids;

    if (
      !Array.isArray(courseIidsInTimetable) ||
      !courseIidsInTimetable.includes(course.iid)
    ) {
      return false;
    }

    const session = this.getSession();
    return !session || session.status !== 'studied';
  };

  render() {
    const { cell, course } = this.props;
    const timetable = this.getTimetable();
    const { timeslot } = cell;
    const { teachers, classes, class_iids } = timetable;

    const editable = this.isEditableBox(course, timetable);

    const isCurrentCourse = class_iids
      .map((iid) => parseInt(iid, 10))
      .includes(parseInt(course.iid, 10));
    const box = (
      <div
        className={`timetable-slot-cell ${
          isCurrentCourse ? '' : 'inactive-cell'
        }`}
        style={cell.style}
        onDoubleClick={this.switchStateOfTimetableSettings}
      >
        {editable && (
          <Popconfirm
            placement="right"
            title={t1('you_are_trying_to_delete_some_kind_of_timetable!!!')}
            okText={t1('delete_this_day')}
            cancelText={t1('delete_this_timetable')}
            onCancel={this.onConfirmDeleteTimetable}
            onConfirm={this.onConfirmDeleteOnDay}
          >
            <Icon className="remove-icon" type="delete" theme="outlined" />
          </Popconfirm>
        )}

        <div className="credit-syllabus-code">
          {timetable.credit_syllabus && (
            <Tooltip title={timetable.credit_syllabus.name}>
              {timetable.credit_syllabus.code}
            </Tooltip>
          )}
        </div>
        <div className="footer-slot-box">
          <div className="class-panel">
            {classes &&
              classes.length > 0 &&
              classes.map((course, i) => {
                const key = `teacher-${course.iid}-${timetable.iid}-${i}`;
                return (
                  <span key={key} onClick={this.switchStateOfClassPopupBox}>
                    {' '}
                    {getClassAvatar(course)}{' '}
                  </span>
                );
              })}
          </div>
          <div>
            {teachers &&
              teachers.length > 0 &&
              teachers.map((teacher, i) => {
                const key = `teacher-${teacher.iid}-${timetable.iid}-${i}`;
                return (
                  <span onClick={this.switchStateOfTeacherPopupBox} key={key}>
                    {' '}
                    {getTeacherAvatar(teacher)}{' '}
                  </span>
                );
              })}
            {(!teachers || teachers.length === 0) && (
              <Tooltip title={t1('add_new_teacher_for_class_or_teaching_day')}>
                <span
                  key="addNewTeachers"
                  onClick={this.switchStateOfTeacherPopupBox}
                >
                  <Avatar size="small" style={teacherIconStyle}>
                    +
                  </Avatar>
                </span>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <CellInfoToolTip cell={cell}>
        {!isCurrentCourse && (
          <Popconfirm
            placement="right"
            title={t1('do_you_want_to_view_timetable_of_this_course!!!')}
            okText={t1('go_to_this_course')}
            cancelText={t1('cancel')}
            onConfirm={this.getCourseLink}
          >
            {box}
          </Popconfirm>
        )}

        {isCurrentCourse && box}

        <ClassPopup
          onSwitchState={this.switchStateOfClassPopupBox}
          open={this.state.openClassBox}
          cell={cell}
          editable={editable}
          course={course}
        />
        <TeacherPopup
          open={this.state.openTeacherBox}
          course={course}
          cell={cell}
          editable={editable}
          onSwitchState={this.switchStateOfTeacherPopupBox}
        />
        <ScheduleSettingPopup
          start_date={timetable.start_date}
          end_date={timetable.end_date}
          start_time={timetable.start_time}
          timetable={timetable}
          course={course}
          editable={editable}
          room_iid={timetable.room_iid}
          days_of_week={timetable.days_of_week}
          open={this.state.openTimetableSettings}
          onSwitchState={this.switchStateOfTimetableSettings}
        />
      </CellInfoToolTip>
    );
  }
}

export default withRouter(connect()(ScheduleOfSessionBox));
