import React from 'react';
import store from 'store/index';
import { Link } from 'react-router-dom';
import './stylesheet.scss';

export default (event) => {
  const data = event.event;
  if (!data) return '';

  const state = store.getState();
  if (state && state.event && state.event.viewType === 'day') {
    return (
      <Link
        to={data.linkTo}
        className="teacher-schedule"
        style={{ marginTop: '4px' }}
      >
        {event.title}
      </Link>
    );
  }

  return (
    <div className="teacher-schedule">
      <div className="room">
        {data.room.name}
        <br />
        <span>{data.timeFrom}</span>
      </div>
    </div>
  );
};
