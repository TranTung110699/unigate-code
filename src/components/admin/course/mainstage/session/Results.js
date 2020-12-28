import React from 'react';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import { getThemeConfig } from 'utils/selectors';
import { connect } from 'react-redux';
import { attendanceTypes, attenStatus, schoolTypes } from 'configs/constants';
import get from 'lodash.get';
import { createSelector } from 'reselect';
import NodeNew from 'components/admin/node/new';
import Checkbox from 'antd/lib/checkbox';
import StudentInfo from '../common/student-info';
import { getHistoryOfUser } from '../common/Util';
import schema from './attendace-schema';

import sagaActions from 'actions/node/saga-creators';
import Warning from 'components/common/Warning';
import ButtonNew from 'components/admin/invite/new/ButtonNew';
import { CourseActions } from 'configs/constants/permission';
import { getRoundTimestampOfDayByDate } from 'common/utils/Date';
import QuickAttendanctEnterprise from './quick-attendance';
import Popover from 'antd/lib/popover';

const types = {
  ATTENDANCE_BY_GROUP: 'attendance-by-group',
  ATTENDANCE_BY_BUS: 'attendance-by-bus',
};

class Results extends React.PureComponent {
  style = { display: 'flex' };
  spanStyle = { display: 'inline-block', position: 'relative' };
  iconStyle = { fontSize: 26, color: '#3595D9' };
  iconStyle1 = { fontSize: 15, color: 'red' };

  constructor(props) {
    super(props);
    this.state = { enableColumns: { [props.defaultSessionName]: true } };
  }

  handleAttendance = (data, allParams, session) => {
    const { node, dispatch, onAttendanceChanged, attendanceType } = this.props;
    const isAttendanceGroup =
      attendanceType === types.ATTENDANCE_BY_GROUP ||
      attendanceType === types.ATTENDANCE_BY_BUS;
    const dataSubmit = isAttendanceGroup
      ? {
          type: get(allParams, 'type'),
          group_iid: get(node, 'iid'),
          group_type: get(node, 'type'),
          ntype: 'attendance',
          attendance: data,
          iid: get(allParams, 'iid'),
          id: get(allParams, 'id'),
          session,
        }
      : {
          type: get(allParams, 'type'),
          course_iid: get(node, 'iid'),
          ntype: 'session',
          attendance: data,
          iid: get(allParams, 'iid'),
          id: get(allParams, 'id'),
        };

    const step = isAttendanceGroup ? 'group-attendance' : 'attendance';

    dispatch(
      sagaActions.updateNodeRequest({
        step,
        data: dataSubmit,
        requestSuccessful: () => {
          if (onAttendanceChanged) {
            onAttendanceChanged();
          }
        },
      }),
    );
  };

  displayAttendancePopup = (type, user, session) => {
    const { dispatch, absenceResions, attendanceType } = this.props;
    if (attendanceType === types.ATTENDANCE_BY_BUS) {
      const attendances = get(session, 'attendances');
      const status = get(attendances, `[${user && user.iid}].status`);
      const data = {
        status:
          status === attenStatus.ATTENDANCE_ATTENDED_STATUS
            ? attenStatus.ATTENDANCE_ABSENTED_STATUS
            : attenStatus.ATTENDANCE_ATTENDED_STATUS,
        type: 'session_for_user',
        user_iid: user && user.iid,
      };
      const allParams = {
        type: 'session_for_user',
      };
      this.handleAttendance(data, allParams, session);
      return;
    } else if (attendanceType === types.ATTENDANCE_BY_GROUP) {
      return;
    }

    const hiddenFields = {
      type: type,
      user_iid: get(user, 'iid'),
      iid: get(session, 'iid'),
      id: get(session, 'id'),
    };
    const history = getHistoryOfUser(session, user);
    let node = { status: parseInt(get(history, 'status')) };
    if (get(history, 'note.id', null)) {
      node.note = parseInt(get(history, 'note.id', null));
    }

    if (attendanceType === types.ATTENDANCE_BY_GROUP) {
      node = {
        status: get(session, `attendances[${get(user, 'iid')}].status`),
        note: parseInt(get(session, `attendances[${get(user, 'iid')}].reason`)),
      };
    }

    return (
      <NodeNew
        mode="edit"
        schema={schema(absenceResions)}
        node={node}
        onSubmit={(data, allParams) =>
          this.handleAttendance(data, allParams, session)
        }
        hiddenFields={hiddenFields}
      />
    );
  };

  /**
   * render thông tin của sinh viên
   */
  renderStudentInfo = (isSis, row, isAttendanceByGroup) => {
    if (isSis) {
      return <StudentInfo user={row} style={{ flexGrow: 1 }} />;
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StudentInfo user={row} style={{ flexGrow: 1 }} />
        {!isAttendanceByGroup && (
          <Popover
            content={this.displayAttendancePopup(
              attendanceTypes.ATTENDANCE_ALL_SESSION_FOR_USER_TYPE,
              row,
            )}
            title={t1('attendance')}
            trigger="click"
            placement="right"
          >
            <Checkbox
              checked={false}
              style={{ width: 24, height: 24, display: 'flex' }}
            />
          </Popover>
        )}
      </div>
    );
  };

  handleEditingColumn = (columnName) => {
    const { enableColumns } = this.state;
    const enable = enableColumns[columnName] || false;
    this.setState({
      enableColumns: { ...enableColumns, [columnName]: !enable },
    });
  };

  render() {
    const {
      users,
      sessions,
      node,
      themeConfig,
      hasPermission,
      permissions,
      attendanceType,
      absenceResions,
    } = this.props;

    const { enableColumns } = this.state;

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

    const sessionEnterpriseColumnStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const isAttendanceByGroup = attendanceType === types.ATTENDANCE_BY_GROUP;
    const isAttendanceByBus = attendanceType === types.ATTENDANCE_BY_BUS;

    if (!Array.isArray(users) || !users.length) {
      return (
        <div>
          <Warning>{t1('there_are_no_students_enrolled_the_course')}</Warning>
          <ButtonNew type="raised" primary node={node} />
        </div>
      );
    }

    if (!Array.isArray(sessions)) {
      return (
        <div>
          <Warning>{t1('there_are_no_sessions')}</Warning>
          <Link
            to={`${routes.url('node_edit', {
              iid: node.iid,
              ntype: node.ntype,
            })}/invite`}
          >
            ('manage_sessions')
          </Link>
        </div>
      );
    }

    const isSis = get(themeConfig, 'type') === schoolTypes.SIS;
    const columns = [
      {
        title: t1('student'),
        key: 'iid',
        fixed: 'left',
        width: 300,
        render: (text, row) =>
          this.renderStudentInfo(
            isSis,
            row,
            isAttendanceByGroup || isAttendanceByBus,
          ),
      },
    ].concat(
      sessions.map((session) => ({
        width: isAttendanceByGroup || isAttendanceByBus ? 80 : null,
        title: isSis ? (
          (() => {
            const dateTime = get(session, 'scheduled.date_time');
            const hasPermUpdate =
              hasPermissionSupperUpdate ||
              (hasPermissionUpdate &&
                dateTime >= roundCurrentDate.startTime &&
                dateTime <= roundCurrentDate.endTime);

            return (
              <Link
                to={`${routes.url('node_edit', {
                  iid: node.iid,
                  ntype: node.ntype,
                })}/session/${session && session.iid}/attendance`}
              >
                {session && session.name}{' '}
                <Icon
                  title={t1('manage_attendance_for_this_session')}
                  icon={hasPermUpdate ? 'edit' : 'publish_score'}
                />
              </Link>
            );
          })()
        ) : (
          <div style={sessionEnterpriseColumnStyle}>
            <div
              onClick={() => {
                if (isAttendanceByGroup) this.handleEditingColumn(session.name);
              }}
              style={{ cursor: 'pointer' }}
            >
              {session && session.name}
              {isAttendanceByGroup && (
                <Icon
                  style={{ marginLeft: 5 }}
                  title={t1('manage_attendance_for_this_session')}
                  icon={enableColumns[session.name] ? 'edit' : 'publish_score'}
                />
              )}
            </div>
            &nbsp;
            {!isAttendanceByGroup && !isAttendanceByBus && (
              <Popover
                content={this.displayAttendancePopup(
                  attendanceTypes.ATTENDANCE_SESSION_FOR_ALL_USER_TYPE,
                  null,
                  session,
                )}
                title={t1('attendance')}
                trigger="click"
                placement="right"
              >
                <Checkbox indeterminate={true} className="m-l-20" />
              </Popover>
            )}
          </div>
        ),
        render: (text, row) => {
          if (isSis) {
            if (!session || !session.attendance) {
              return <div className="text-center">...</div>;
            }

            return (
              <div className="text-center">
                {session.attendance.includes(
                  parseInt((row && row.iid) || 0),
                ) ? (
                  <Icon style={this.iconStyle} icon="check" />
                ) : (
                  <Icon style={this.iconStyle1} icon="clear" />
                )}
              </div>
            );
          }

          if (isAttendanceByGroup && enableColumns[session.name]) {
            const node = {
              status: get(session, `attendances[${row.iid}].status`),
              note: parseInt(get(session, `attendances[${row.iid}].reason`)),
            };
            return (
              <QuickAttendanctEnterprise
                absenceReasons={absenceResions}
                formid={`${row.iid}-${session.name}`}
                session={session}
                user={row}
                node={node}
                type={attendanceTypes.ATTENDANCE_SESSION_FOR_USER_TYPE}
                handleChange={this.handleAttendance}
              />
            );
          }

          return (
            <div
              className="text-center"
              style={isSis ? {} : { cursor: 'pointer' }}
            >
              <Popover
                content={this.displayAttendancePopup(
                  attendanceTypes.ATTENDANCE_SESSION_FOR_USER_TYPE,
                  row,
                  session,
                )}
                title={t1('attendance')}
                trigger="click"
                placement="right"
              >
                {(() => {
                  const userIid = parseInt((row && row.iid) || 0);
                  if (isAttendanceByGroup || isAttendanceByBus) {
                    const attendances = get(session, 'attendances');
                    const detail = get(attendances, `[${userIid}]`);
                    if (!detail) {
                      return '...';
                    }

                    switch (get(detail, 'status')) {
                      case attenStatus.ATTENDANCE_ABSENTED_STATUS: {
                        return <Icon style={this.iconStyle1} icon="clear" />;
                      }
                      case attenStatus.ATTENDANCE_ATTENDED_STATUS: {
                        return <Icon style={this.iconStyle} icon="check" />;
                      }
                      case attenStatus.ATTENDANCE_LATE_STATUS: {
                        return t1('m');
                      }
                      case attenStatus.ATTENDANCE_ALLOWED_LEAVE_STATUS: {
                        return <div>{t1('p')}</div>;
                      }
                    }
                  }
                  // ==========================================================================================
                  if (get(session, 'attendance', []).includes(userIid)) {
                    return <Icon style={this.iconStyle} icon="check" />;
                  }

                  if (get(session, 'absent', []).includes(userIid)) {
                    return <Icon style={this.iconStyle1} icon="clear" />;
                  }

                  if (get(session, 'allowed_leaves', []).includes(userIid)) {
                    const his = getHistoryOfUser(session, row);
                    return (
                      <div
                        title={`${get(his, 'note.name')} - ${get(
                          his,
                          'note.description',
                        )}`}
                      >
                        {t1('p')}
                        {get(his, 'note.id')}
                      </div>
                    );
                  }

                  return '...';
                })()}
              </Popover>
            </div>
          );
        },
      })),
      isAttendanceByGroup || isAttendanceByBus
        ? [{}]
        : [
            {
              title: t1('attendance_score'),
              render: (text, row, index) => {
                if (!row.progress || !row.progress[node && node.iid]) {
                  return '';
                }

                return (
                  <div className="text-center">
                    {row.progress[node && node.iid].ats || 0}
                  </div>
                );
              },
            },
          ],
    );

    return (
      <div style={{ background: 'white' }}>
        <AntdTable
          columns={columns}
          dataSource={users}
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 1300 }}
        />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => getThemeConfig(state),
  (state) => get(state, 'domainInfo.conf.absence_reason_list'),
  (themeConfig, absenceResions) => ({
    themeConfig,
    absenceResions: (() =>
      absenceResions &&
      absenceResions.map((item) => {
        const label = `${item.name} - ${item.description}`;
        return {
          ...item,
          value: item.id,
          label,
          primaryText: label,
        };
      }))(),
  }),
);

export default connect(mapStateToProps)(Results);
