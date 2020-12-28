import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Toggle from 'material-ui/Toggle';
import Icon from 'components/common/Icon';
import sagaActions from 'actions/node/saga-creators';
import ReactStars from 'react-stars';
import FeedbackUser from 'components/admin/feedback';
import actions from 'actions/node/creators';
import {
  getRoundTimestampOfDayByDate,
  timestampToDateString,
} from 'common/utils/Date';
import AntdTable from 'antd/lib/table';
import DisplayHtml from 'components/common/html';
import { attendanceTypes, attenStatus } from 'configs/constants';
import StudentInfo from '../common/student-info';
import { getHistoryOfUser } from '../common/Util';
import get from 'lodash.get';
import { CourseActions } from 'configs/constants/permission';
import { commentTypes } from 'configs/constants/comment';

const styles = {
  divStyle: { margin: '20px 0px 0px 20px' },
  divStyle1: { display: 'flex' },
  tableHeaderColumnStyle: { width: 60 },
  tableHeaderColumnStyle1: { maxWidth: 200, minWidth: 100 },
  tableHeaderColumnStyle2: { width: 100 },
  spanStyle: { display: 'inline-block', position: 'relative' },
  iconStyle: { fontSize: 20, color: '#00C0DB' },
  iconStyle1: { fontSize: 15 },
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
    };
  }

  cssClass = 'table-session-attendance';

  rateTeacher = (session, user) => {
    const { dispatch } = this.props;

    const hiddenFields = {
      object: {
        iid: session && session.iid,
        id: session && session.id,
        ntype: 'session',
      },
      target: {
        id: user && user.id,
        iid: user && user.iid,
        name: user && user.name,
        avatar: user && user.avatar,
      },
      type: commentTypes.FEEDBACK_USER_FOR_SESSION,
    };

    const feedback = user && user.feedback;
    const node = {
      result__rating: feedback && feedback.rating,
      result__content: feedback && feedback.content,
    };

    const contentDialog = (
      <FeedbackUser
        node={node}
        hiddenFields={hiddenFields}
        requestSuccessful={() => {
          this.fetchSessions();
        }}
        searchFormId="session_search_user"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('feedback'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  addNewAttendance = (order) => {
    // const { session, dispatch } = this.props;
    this.submitAttendance([], order);
  };

  /**
   * Điểm danh 1 user
   * @param user
   * @param order
   * @param enrol
   */
  setAttendanceTheUser = (user, order, enrol = false) => {
    if (!user) return;

    const attendance = [
      {
        user_iid: user.iid,
        attended: enrol ? 1 : 0,
      },
    ];
    this.submitAttendance(
      attendance,
      order,
      attendanceTypes.ATTENDANCE_SESSION_FOR_USER_TYPE,
    );
  };

  /**
   * Điểm danh tất cả user
   * @param enrol
   * @param order
   */
  submitAttendanceForAllStudent = (enrol, order) => {
    const attendance = {
      attended: enrol
        ? attenStatus.ATTENDANCE_ATTENDED_STATUS
        : attenStatus.ATTENDANCE_ABSENTED_STATUS,
    };

    this.submitAttendance(
      attendance,
      order,
      attendanceTypes.ATTENDANCE_SESSION_FOR_ALL_USER_TYPE,
    );
  };

  /**
   *
   * @param attendance
   * @param order
   * @param type all || one
   */
  submitAttendance(attendance, order, type) {
    const { session, dispatch } = this.props;
    dispatch(
      sagaActions.updateNodeRequest({
        step: 'attendance',
        iid: session.iid,
        data: {
          ...session,
          ntype: 'session',
          order,
          attendance,
          attendance_type: type,
        },
      }),
    );
  }

  displayMessageLeaveOfAbsence = (message) => {
    const { dispatch } = this.props;

    const contentDialog = <DisplayHtml content={message} />;
    const optionsProperties = {
      handleClose: true,

      title: t1('message'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  hasPermissionUpdate = () => {
    const { hasPermission, permissions, session, node } = this.props;
    const hasPermissionSupperUpdate =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE_SUPER_ATTENDANCE,
        node && node.iid,
        permissions,
      );
    const hasPermissionUpdate =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE_ATTENDANCE,
        node && node.iid,
        permissions,
      );
    const roundCurrentDate = getRoundTimestampOfDayByDate();
    const dateTime = get(session, 'scheduled.date_time');

    return (
      hasPermissionSupperUpdate ||
      (hasPermissionUpdate &&
        dateTime >= roundCurrentDate.startTime &&
        dateTime <= roundCurrentDate.endTime)
    );
  };

  render() {
    const { items, session } = this.props;

    const hasPermUpdate = this.hasPermissionUpdate();

    if (!items || !items.length) {
      return <div />;
    }
    const histories = (session && session.histories) || [];
    if (!histories.length) {
      histories.push([]);
    }

    const columns = [
      {
        title: t1('student'),
        key: 'iid',
        fixed: 'left',
        width: 200,
        render: (text, row) => <StudentInfo user={row} />,
      },
      {
        title: t1('birthday'),
        key: 'birthday',
        fixed: 'left',
        width: 100,
        render: (text, row) => (
          <div>
            {row && row.birthday
              ? timestampToDateString(row.birthday)
              : '--/--/--'}
          </div>
        ),
      },
      {
        title: t1('note'),
        key: 'note',
        fixed: 'left',
        width: 200,
        render: (text, row) => {
          if (!get(row, 'leave_of_absence')) return null;

          return (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.displayMessageLeaveOfAbsence(
                  get(row, 'leave_of_absence.request_data.note'),
                );
              }}
            >
              {t1('absence')}{' '}
              <Icon
                icon="view"
                className="action"
                title={t1('remove_order_attendance')}
                style={styles.iconStyle1}
              />
              <li>
                {t1('status')}: {get(row, 'leave_of_absence.status')}
              </li>
            </div>
          );
        },
      },
      {
        title: t1('feedback'),
        key: 'iid',
        fixed: 'left',
        width: 150,
        render: (text, row) => (
          <div>
            <span
              style={styles.spanStyle}
              onClick={() => {
                if (hasPermUpdate) {
                  this.rateTeacher(session, row);
                }
              }}
            >
              <ReactStars
                count={5}
                size={24}
                value={(row.feedback && row.feedback.rating) || 0}
                edit={false}
                color2={'#ffd700'}
              />
            </span>
          </div>
        ),
      },
    ].concat(
      histories.map((history, order) => ({
        title: (
          <div>
            <div className="pull-left">{t1('order_%s', [order + 1])}</div>
            <div className="pull-right" style={{ display: 'flex' }}>
              {histories.length === order + 1 && (
                <Toggle
                  title={t1('set_all')}
                  onToggle={(event, isInputChecked) => {
                    this.submitAttendanceForAllStudent(
                      isInputChecked ? 1 : 0,
                      order,
                    );
                  }}
                  disabled={!hasPermUpdate}
                />
              )}
              {histories.length === order + 1 &&
                get(
                  histories,
                  `[${get(histories, 'length') - 1}].attendance.length`,
                ) > 0 && (
                  <span className="m-l-5">
                    <Icon
                      icon="plus"
                      className="action"
                      title={t1('add_new_attendance')}
                      style={styles.iconStyle}
                      onClick={() => this.addNewAttendance(histories.length)}
                    />
                  </span>
                )}
            </div>
          </div>
        ),
        render: (text, row) => {
          const his = getHistoryOfUser(session, row, order);
          const toggled =
            attenStatus.ATTENDANCE_ATTENDED_STATUS == get(his, 'attended');

          const debit =
            get(his, 'status') == attenStatus.ATTENDANCE_DEBIT_STATUS;

          return (
            <div style={{ display: 'flex' }}>
              <Toggle
                style={{ width: 47 }}
                toggled={toggled}
                onToggle={(object, isInputChecked) => {
                  if (histories.length !== order + 1) {
                    return;
                  }
                  this.setAttendanceTheUser(row, order, isInputChecked);
                }}
                disabled={!hasPermUpdate}
              />
              {debit ? t1('debit') : null}
            </div>
          );
        },
      })),
    );

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        style={{ background: 'white' }}
        scroll={{ x: 1300 }}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const sessionIid = props.sessionIid || null;
  return {
    session: state.tree[sessionIid],
  };
}

export default connect(mapStateToProps)(Results);
