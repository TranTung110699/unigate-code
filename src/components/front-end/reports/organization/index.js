import React from 'react';
import OrganizationProgressLayout from 'components/admin/report-teacher/organization-progress/Layout';
import Nav from '../Nav';

class OrgProgressReports extends React.Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className="container">
        <Nav content={<OrganizationProgressLayout mode="frontend" />} />
      </div>
    );
  }
}

export default OrgProgressReports;
