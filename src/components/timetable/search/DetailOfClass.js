import React from 'react';
import { connect } from 'react-redux';
import { timetableActions } from 'actions/timetable';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 23/10/2017
 * */
class DetailOfClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getClassInfo = () => {
    const { clazz } = this.props;
    if (!clazz) {
      return;
    }
    const sessions = clazz.sessions || [];

    let timeTotalOfClass = 0;
    let timeAssignedTime = 0;
    let sessionsAssigned = 0;
    for (let i = 0; i < sessions.length; i++) {
      timeTotalOfClass += sessions[i].duration;
      timeAssignedTime += sessions[i].assigned_time || 0;
      if (sessions[i].assigned_time) {
        sessionsAssigned += 1;
      }
    }

    return {
      name: clazz.name,
      syllabusName: clazz.syllabus ? clazz.syllabus.name : '',
      times_of_table: timeTotalOfClass / 60,
      time_assigned_time: timeTotalOfClass / 60,
      sessions: sessions.length,
      sessionsAssigned,
    };
  };
  onShowHideSessionDetail = () => {
    const { dispatch, status } = this.props;
    // dispatch(timetableActions.setDetailOfSessionPanelStatus(!status));
    dispatch(timetableActions.setDetailOfSessionPanelStatus(true));
  };

  render() {
    const info = this.getClassInfo();
    const { clazz } = this.props;
    if (!info) {
      return <span />;
    }
    return (
      <div className="clearfix">
        <div className="pull-left">
          <ul className="class-detail">
            <li className="item">
              {t1('class')}: {info.name}
            </li>
            <li className="item">
              {t1('syllabus')}: {info.syllabusName}
            </li>
            <li className="item">
              {t1('estimated_time')}: {info.times_of_table} (h)
            </li>
            <li className="item">
              {t1('scheduled_time')}: {info.time_assigned_time} (h)
            </li>
            <li className="item">
              {t1('sessions')}: {info.sessionsAssigned}/{info.sessions} (
              {t1('assigned')})
            </li>
          </ul>
        </div>
        <div className="pull-right">
          <ul className="class-detail">
            <Link
              to={`/admin/course/${clazz && clazz.iid}/schedule`}
              target="_blank"
            >
              <li className="item cursor-pointer">
                <i className="mi mi-apps" />
              </li>
            </Link>
            <li
              className="item cursor-pointer"
              onClick={this.onShowHideSessionDetail}
            >
              <i className="mi mi-format-indent-decrease" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.timetable.sessionPanelStatus,
});
export default connect(mapStateToProps)(DetailOfClass);
