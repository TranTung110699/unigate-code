import React from 'react';
import StudentDetailProgressLayout from 'components/admin/report-teacher/learn/student-detail-progress/Layout';
import Nav from '../Nav';

class ProgressReports extends React.Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className="container">
        <Nav content={<StudentDetailProgressLayout mode="frontend" />} />
      </div>
    );
  }
}

export default ProgressReports;
