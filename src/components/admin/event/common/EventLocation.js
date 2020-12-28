import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

const EventLocation = ({ event }) => (
  <div>
    <div>
      {lodashGet(event, 'location.venue.name')} (
      {lodashGet(event, 'location.venue.address')})
    </div>
    {lodashGet(event, 'location.rooms.length') > 0 && (
      <React.Fragment>
        <div>{t1('rooms:')}</div>
        {lodashGet(event, 'location.rooms', []).map((room) => (
          <li>- {lodashGet(room, 'name')}</li>
        ))}
      </React.Fragment>
    )}
  </div>
);

export default EventLocation;
