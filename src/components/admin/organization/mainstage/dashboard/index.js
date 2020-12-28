import React from 'react';
import Dashboard from 'components/admin/dashboard/index';

class DepartmentDashboard extends React.Component {
  render() {
    const { node } = this.props;
    return <Dashboard node={node} showSubMenuTop />;
  }
}

export default DepartmentDashboard;
