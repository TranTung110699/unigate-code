import React, { Component } from 'react';
import { v4 } from 'uuid';
import { t1 } from 'translate';

class Drivers extends Component {
  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        {item.drivers ? (
          item.drivers.map((driver, i) => (
            <div key={v4()}>
              {driver.name} (# {driver.phone})
            </div>
          ))
        ) : (
          <div>{t1('no_driver')}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Drivers;
