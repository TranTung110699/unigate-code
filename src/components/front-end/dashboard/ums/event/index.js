import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'components/common/calendar';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import action from 'actions/event';
import { getTimeInterval } from './Utils';
import ToolBar from './ToolBar';
import Event from './Event';
import './stylesheet.scss';

const views = ['month', 'week', 'day'];
const eventPropGetter = {
  style: { background: '#51c1d6' },
};

const calendarComponent = {
  toolbar: ToolBar,
  event: Event,
};

const defaultEvents = [];

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
    const around = getTimeInterval(date, syntheticEvent);
    if (!around) return;

    const { dispatch } = this.props;
    const params = {
      from: parseInt(around.from.getTime(), 0) / 1000,
      to: parseInt(around.to.getTime(), 0) / 1000,
    };
    dispatch(action.changeViewType(syntheticEvent));
    dispatch(
      sagaActions.getDataRequest(
        { url: apiUrls.event_search, keyState: 'calendar_events' },
        params,
      ),
    );
  };

  handleSelectEvent = (event) => {
    this.setState({ view: 'day', date: event && event.start });
    this.props.dispatch(action.changeViewType('day'));
  };

  convertEventToDisplay = (events) =>
    events &&
    events.map((event) => ({
      start: new Date(parseInt(`${event.date_from}000`, 0)),
      end: new Date(parseInt(`${event.date_to}000`, 0)),
      title: event.name,
      desc: event.detail,
    }));

  render() {
    const events =
      this.convertEventToDisplay(this.props.events) || defaultEvents;
    const { view, date } = this.state;
    return (
      <div className="event">
        <BigCalendar
          {...this.props}
          events={events}
          views={views}
          step={60}
          culture="vi-VN"
          view={view}
          date={date}
          popup
          defaultView={view}
          defaultDate={date}
          onNavigate={(event, syntheticEvent) =>
            this.handleFetchData(event, syntheticEvent)
          }
          onView={(syntheticEvent) =>
            this.handleFetchData(date, syntheticEvent)
          }
          components={calendarComponent}
          eventPropGetter={() => eventPropGetter}
          onSelectEvent={(event) => this.handleSelectEvent(event)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const events = state.dataApiResults.calendar_events;
  return {
    events,
  };
};

export default connect(mapStateToProps)(Layout);
