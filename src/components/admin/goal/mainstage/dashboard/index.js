import React from 'react';
import { t1 } from 'translate';

class Dashboard extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        <h1>{t1('dashboard')}</h1>
      </div>
    );
  }
}

export default Dashboard;
