import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import get from 'lodash.get';
import { getTimeName } from 'components/timetable_v2/utils/DailyUnixTimestamp';
import { withRouter } from 'react-router';
import { getUrl } from 'routes/links/common';
import './styleheet.scss';

const getColumns = (position) => [
  {
    title: t1('stt'),
    key: 'stt',
    render: (text, row, index) => index + position + 1,
    width: 20,
  },
  {
    title: t1('date'),
    key: 'date',
    width: 70,
    render: (text, row) =>
      timestampToDateString(get(row, 'scheduled.date_time')),
  },
  {
    title: t1('course'),
    key: 'course',
    width: 180,
    render: (text, row) => (
      <div>
        {get(row, 'course.name')}
        <br />
        {t1('syllabus: ')}
        {get(row, 'syllabus.name')}
      </div>
    ),
  },
  {
    title: t1('session'),
    key: 'session',
    width: 70,
    render: (text, row) => (
      <div>
        {get(row, 'name')}
        <div className="text-muted">
          {getTimeName(get(row, 'scheduled.start_time'))} -{' '}
          {getTimeName(get(row, 'scheduled.end_time'))}{' '}
        </div>
      </div>
    ),
  },
  {
    title: t1('room'),
    key: 'room',
    width: 50,
    render: (text, row) => get(row, 'room.name'),
  },
  {
    title: t1('total_hour'),
    key: 'total_hour',
    width: 50,
    render: (text, row) => {
      const hour =
        (parseInt(get(row, 'scheduled.end_time')) -
          parseInt(get(row, 'scheduled.start_time'))) /
        60;
      return hour;
    },
  },
  {
    title: t1('total_student'),
    key: 'total_student',
    width: 40,
    render: (text, row) => get(row, 'total_student', 0),
  },
  {
    title: t1('attendance'),
    key: 'attendance',
    width: 40,
    render: (text, row) =>
      get(row, 'status') !== 'studied' ? (
        '-'
      ) : (
        <span className="attended">
          {get(row, 'total_student_attendance', 0)}
        </span>
      ),
  },
  {
    title: t1('absent'),
    key: 'absent',
    width: 40,
    render: (text, row) =>
      get(row, 'status') !== 'studied' ? (
        '-'
      ) : (
        <span className="absented">
          {get(row, 'total_student_absent', 0) ||
            get(row, 'total_student', 0) -
              get(row, 'total_student_attendance', 0) ||
            0}
        </span>
      ),
  },
  {
    title: t1('status'),
    key: 'status',
    width: 50,
    render: (text, row) =>
      get(row, 'status') === 'studied' ? t1('attended') : t1('not_attended'),
  },
  {
    title: t1('teachers'),
    key: 'teachers',
    width: 100,
    render: (text, row) => {
      const teachers = get(row, 'teachers', []);
      return teachers.map((teacher) => (
        <div>
          <div>{teacher.name}</div>
          <div className="text-muted">{teacher.phone}</div>
        </div>
      ));
    },
  },
];

const getWidgetColumn = () => [
  {
    title: t1('date'),
    key: 'date',
    width: 100,
    render: (text, row) =>
      timestampToDateString(get(row, 'scheduled.date_time')),
  },
  {
    title: t1('course'),
    key: 'course',
    width: 200,
    render: (text, row) => get(row, 'course.name'),
  },
  {
    title: t1('session'),
    key: 'date',
    width: 100,
    render: (text, row) => (
      <div>
        {get(row, 'name')}
        <div className="text-muted">
          {getTimeName(get(row, 'scheduled.start_time'))} -{' '}
          {getTimeName(get(row, 'scheduled.end_time'))}{' '}
        </div>
      </div>
    ),
  },
  {
    title: t1('summary'),
    key: 'summary',
    width: 100,
    render: (text, row) => {
      const totalStudent = get(row, 'total_student', 0);
      const attended = get(row, 'status') === 'studied';
      const totalStudentAttendance = attended
        ? get(row, 'total_student_attendance', 0)
        : '-';
      const totalStudentAbsent = attended
        ? get(row, 'total_student_absent', 0) ||
          totalStudent - totalStudentAttendance
        : '-';
      return (
        <div>
          <div>
            {get(row, 'status') === 'studied'
              ? t1('attended')
              : t1('not_attended')}
          </div>
          <div className="summary">
            <span className="detail" title={t1('total')}>
              {' '}
              {totalStudent || '0'}
            </span>
            <span className="detail">|</span>
            <span className="detail attended" title={t1('attended')}>
              {totalStudentAttendance || '0'}
            </span>
            <span className="detail">|</span>
            <span className="detail absented" title={t1('absented')}>
              {totalStudentAbsent || '0'}
            </span>
          </div>
        </div>
      );
    },
  },
];

class Results extends React.PureComponent {
  handleGoToCourse = (item) => {
    const { history } = this.props;
    history.push(
      getUrl('node_edit', {
        ntype: 'course',
        iid: get(item, 'course.iid'),
        step: 'session',
      }),
    );
  };

  render() {
    const { items, index, isWidget } = this.props;
    return (
      <div className="learning-course-container">
        <AntdTable
          columns={isWidget ? getWidgetColumn(index) : getColumns(index)}
          dataSource={items}
          pagination={false}
          bordered
          size="middle"
          onRow={(record) => ({
            onClick: () => {
              this.handleGoToCourse(record);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    );
  }
}

export default withRouter(Results);
