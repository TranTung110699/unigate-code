import React from 'react';
import { t1 } from 'translate';
import WidgetsRender from 'components/admin/dashboard/WidgetsRender';
import Overview from './overview-stats';

class Dashboard extends React.PureComponent {
  render() {
    const { node } = this.props;
    const items = [
      {
        id: 'overview-dashboard',
        label: t1('overview_dashboard'),
        component: (props) => <Overview {...props} />,
        minWidth: 12,
        minHeight: 4,
      },
    ];

    return (
      <div>
        <WidgetsRender items={items} node={node} />
      </div>
    );
  }
}

export default Dashboard;
