import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { normalizeDateAsddmmyyy } from 'common/normalizers';
import apiEndpoints from 'api-endpoints';
import sessionApiUrls from 'components/admin/session/endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import sagaActions from 'actions/node/saga-creators';
import { getDayOfWeek } from '../common/DayOfWeek';
import './stylesheet.scss';

const getKeyForSessionOfClass = (classIid) =>
  `session_of_class_iid_${classIid}`;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 10/11/2017
 * */
class SessionsDetailOfClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getSessions();
  };

  getSessions = () => {
    const { dispatch, classIid, userIid } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        {
          url: sessionApiUrls.get_session_will_assigned_for_user,
          keyState: getKeyForSessionOfClass(classIid),
        },
        { user_iid: userIid, class_iid: classIid },
      ),
    );
  };

  getTimeSlotOfSession = (session) => {
    if (!session) {
      return '';
    }
    const assignedRooms = session.assigned_rooms;

    if (!assignedRooms || assignedRooms.length === 0) {
      return '';
    }
    let result;
    for (let i = 0; i < assignedRooms.length; i++) {
      const time_slots = assignedRooms[i].time_slots || [];
      time_slots.map((timeSlot) => {
        result = `${result ? `${result} ,` : ''} ${timeSlot.name}`;
      });
    }

    return result;
  };

  render() {
    const { status, sessionInfo, height } = this.props;
    const { sessions, totalConflict, maxConflict } = sessionInfo || {};
    return (
      <Table className="sessions-before-join-class">
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn title={t1('name')}>
              {t1('name')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('date')}>
              {t1('date')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('slots')}>
              {t1('slots')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {sessions &&
            sessions.map((item) => (
              <TableRow
                key={`session-viewer-id-${item.iid}`}
                className={item.conflict ? 'red' : ''}
              >
                <TableRowColumn width="7%">{item.name}</TableRowColumn>
                <TableRowColumn width="7%">
                  {item &&
                    item.assigned_dates &&
                    item.assigned_dates.map((dateUnix, index) => {
                      const date = new Date(dateUnix * 1000);
                      const dateInfo = getDayOfWeek(date);
                      return (
                        <span key={`date-${item.id}-${dateUnix}-${index}`}>
                          {dateInfo.label} - {normalizeDateAsddmmyyy(date)}
                          {index !== item.assigned_dates.length - 1 ? ', ' : ''}
                        </span>
                      );
                    })}
                </TableRowColumn>
                <TableRowColumn width="7%">
                  {this.getTimeSlotOfSession(item)}
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { classIid } = props;
  return {
    status: state.timetable.sessionPanelStatus,
    sessionInfo: state.dataApiResults[getKeyForSessionOfClass(classIid)] || {},
  };
};

export default connect(mapStateToProps)(SessionsDetailOfClass);
