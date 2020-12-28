import React, { Component } from 'react';
import { v4 } from 'uuid';
import { t1 } from 'translate';

class Locations extends Component {
  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        {item.locations ? (
          item.locations.map((loc, i) => (
            <div key={v4()}>
              {i + 1}. {loc.name} ({loc.time})
            </div>
          ))
        ) : (
          <div>{t1('no_locations')}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Locations;
