import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import nodeActions from 'actions/node/creators';
import actions from 'actions/node/creators';
import { scopingType } from '../form-configs/new';
import { timetableActions } from 'actions/timetable';
import apiEndpoints from 'api-endpoints';
import { Scrollbars } from 'react-custom-scrollbars';
import RoomsOfSession from './RoomsOfSession';
import AssignedDatesOfSession from './AssignedDatesOfSession';
import TeachersOfSession from './TeachersOfSession';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 10/11/2017
 * */
class SessionsDetailOfClass extends React.Component {
  spanStyle = { display: 'inline-block', paddingLeft: '5px' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onHideSessionDetail = () => {
    const { dispatch } = this.props;
    dispatch(timetableActions.setDetailOfSessionPanelStatus(false));
  };

  getIcon(session) {
    if (!session.duration || session.duration === 0) {
      return {
        icon: <i className="mi mi-close" />,
        color: 'red',
      };
    }

    if (!session.assigned_time || session.assigned_time === 0) {
      return {
        icon: <i className="mi mi-schedule" />,
        color: '#111111',
      };
    }

    if (session.duration !== session.assigned_time) {
      return {
        icon: <i className="mi mi-schedule" />,
        color: '#365899',
      };
    }
    return {
      icon: <i className="mi mi-check" />,
      color: '#00bcd4',
      is_ok: true,
    };
  }

  getTimetableAndUnixTimesBySession = (session) => {
    const durationStructure = session.duration_structure;
    const timesAndTimeTableIids = {};
    const timetableIids = Object.keys(durationStructure);

    timetableIids.map((timetableIid) => {
      const datesAndTime = durationStructure[timetableIid];
      const unixTimeAndTime = Object.keys(datesAndTime);

      unixTimeAndTime.map((unixTime) => {
        if (datesAndTime[unixTime] > 0) {
          const data = timesAndTimeTableIids[timetableIid] || [];
          data.push(unixTime);
          timesAndTimeTableIids[timetableIid] = data;
        }
      });
    });
    return timesAndTimeTableIids;
  };

  getTimetableIidByUnixTimeFromSession = (inputUnixTime, session) => {
    const durationStructure = session.duration_structure;
    const timetableIids = Object.keys(durationStructure);
    for (let i = 0; i < timetableIids.length; i++) {
      const timetableIid = timetableIids[i];

      const datesAndTime = durationStructure[timetableIid];
      const unixTimeAndTime = Object.keys(datesAndTime);
      if (!unixTimeAndTime) {
        continue;
      }
      if (unixTimeAndTime.indexOf(`${inputUnixTime}`) !== -1) {
        return timetableIid;
      }
    }
  };

  handleRemoveDateOfSession = (session, unixTime) => {
    const timeTableIid = this.getTimetableIidByUnixTimeFromSession(
      unixTime,
      session,
    );
    const { dispatch, clazz } = this.props;
    const options = {
      onSuccess: this.updateSessionsToClass,
      mainClassIid: clazz ? clazz.iid : undefined,
      onFail: this.showMessagesOnFail,
      timeTableIid,
    };

    dispatch(
      timetableActions.updateDataOfTimeTableRequest(
        apiEndpoints.update_node('timetable', 'remove_date_from_session'),
        'timetable_search',
        undefined,
        undefined,
        scopingType.THIS_DAY,
        unixTime,
        options,
      ),
    );
  };

  handleRemoveTeacher = (session, teachers, removeTeacher) => {
    const { dispatch, clazz } = this.props;
    if (!teachers || teachers.length === 0) {
      return;
    }
    const newTeachers = [];
    teachers.map((t) => {
      if (t.iid !== removeTeacher.iid) {
        newTeachers.push(t);
      }
    });

    const durationStructure = session.duration_structure;

    const timesAndTimeTableIids = this.getTimetableAndUnixTimesBySession(
      session,
    );

    const options = {
      onSuccess: this.updateSessionsToClass,
      mainClassIid: clazz ? clazz.iid : undefined,
      onFail: this.showMessagesOnFail,
      times_and_time_table_iids: timesAndTimeTableIids,
    };

    dispatch(
      timetableActions.updateDataOfTimeTableRequest(
        apiEndpoints.update_node('timetable', 'teachers_of_session'),
        'timetable_search',
        newTeachers,
        undefined,
        scopingType.THIS_DAY,
        undefined,
        options,
      ),
    );
  };

  showMessagesOnFail = (response) => {
    const { dispatch } = this.props;
    const contentDialog = <p>{response.message || response.err}</p>;
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('update_timetable_fail'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  updateSessionsToClass = (responseResult) => {
    const { clazz, dispatch } = this.props;
    if (!clazz || !responseResult || !responseResult.sessions) {
      return;
    }
    const sessions = responseResult.sessions;

    clazz.sessions = sessions;
    dispatch(nodeActions.treeUpsertNode(clazz));
  };

  render() {
    const { status, sessions, height } = this.props;
    const style = status
      ? { transform: 'translate3d(0px, 0px, 0px)' }
      : { transform: 'translate3d(623px, 0px, 0px)' };
    return (
      <div style={style} className="sessions-detail-of-class">
        <div className="header">
          Daily schedule
          <a className="close" onClick={this.onHideSessionDetail}>
            <i className="mi mi-close" />
          </a>
        </div>
        <div className="content" style={{ height: `${height - 50}px` }}>
          <Scrollbars>
            <ul className="session-list">
              {sessions &&
                sessions.map((session) => {
                  const icon = this.getIcon(session);

                  return (
                    <li
                      className={'session-item'}
                      style={{ color: icon.color }}
                      key={`session-detail-${session.id}`}
                    >
                      <div className="fontBold">
                        {icon.icon}
                        {session.name}

                        <span style={this.spanStyle}>
                          (
                          {!icon.is_ok && (
                            <span>
                              {session && session.assigned_time
                                ? session.assigned_time
                                : '0'}
                              /
                            </span>
                          )}
                          {session && session.duration ? session.duration : '0'}
                          ' )
                        </span>
                      </div>
                      <div className="session-detail">
                        {session && (
                          <span>
                            <span className="fontBold">
                              {' '}
                              {`${t1('room')}: `}
                            </span>
                            <RoomsOfSession session={session} />
                          </span>
                        )}
                      </div>
                      <div className="session-detail">
                        {session && (
                          <span title="close">
                            <span className="fontBold">{`${t1(
                              'date',
                            )}: `}</span>
                            <AssignedDatesOfSession
                              session={session}
                              handleRemoveDateOfSession={
                                this.handleRemoveDateOfSession
                              }
                            />
                          </span>
                        )}
                      </div>

                      <div className="session-detail">
                        {session && (
                          <span title="close">
                            <span className="fontBold">{`${t1(
                              'teachers',
                            )}: `}</span>
                            <TeachersOfSession
                              session={session}
                              handleRemoveTeacher={this.handleRemoveTeacher}
                            />
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.timetable.sessionPanelStatus,
});

export default connect(mapStateToProps)(SessionsDetailOfClass);
