import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'components/common/calendar';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import action from 'actions/event';
import { withRouter } from 'react-router-dom';
import { getRootUrl } from 'routes/links/common';
import { convertSessionToSchedule } from 'components/timetable/views/Utils';
import { getTimeInterval } from '../event/Utils';
import ToolBar from '../event/ToolBar';
import Event from './Event';
import '../event/stylesheet.scss';

const views = ['month', 'week', 'day'];

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'month', date: new Date() };
  }

  componentWillMount() {
    this.handleFetchData(new Date(), 'month');
  }

  handleFetchData = (date, syntheticEvent) => {
    this.setState({ view: syntheticEvent });
    const interval = getTimeInterval(date, syntheticEvent);
    if (!interval) return;

    const { dispatch } = this.props;
    const params = {
      from: parseInt(interval.from.getTime(), 0) / 1000,
      to: parseInt(interval.to.getTime(), 0) / 1000,
      this_user_only: 1,
    };
    dispatch(action.changeViewType(syntheticEvent));
    dispatch(
      sagaActions.getDataRequest(
        { url: apiUrls.sessions_search, keyState: 'teacherCalendar' },
        params,
      ),
    );
  };

  handleSelectEvent = (schedule) => {
    this.setState({ view: 'day', date: schedule && schedule.start });
    this.props.dispatch(action.changeViewType('day'));
  };

  render() {
    const { schedules } = this.props;
    const { view, date } = this.state;
    return (
      <div className="event">
        <BigCalendar
          {...this.props}
          events={schedules}
          views={views}
          step={60}
          culture="vi-VN"
          view={view}
          date={date}
          defaultView={view}
          defaultDate={date}
          onNavigate={(event, syntheticEvent) =>
            this.handleFetchData(event, syntheticEvent)
          }
          onView={(syntheticEvent) =>
            this.handleFetchData(date, syntheticEvent)
          }
          components={{
            toolbar: ToolBar,
            event: Event,
          }}
          eventPropGetter={() => ({ style: { background: '#51c1d6' } })}
          onSelectEvent={(schedule) => this.handleSelectEvent(schedule)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const sessions = state.dataApiResults.teacherCalendar;
  return {
    schedules: convertSessionToSchedule(sessions, getRootUrl(props)),
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
