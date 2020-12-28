import React from 'react';
import store from 'store/index';
import { stripHTML } from 'common/utils/string';
import './stylesheet.scss';

export default function(event) {
  const state = store.getState();
  if (state && state.event && state.event.viewType === 'day') {
    return (
      <div style={{ marginTop: '2px' }}>
        {event.title}
        {event.event && event.event.desc && (
          <span> - {stripHTML(event.event && event.event.desc)}</span>
        )}
      </div>
    );
  }
  return <div>{event.title}</div>;
}
