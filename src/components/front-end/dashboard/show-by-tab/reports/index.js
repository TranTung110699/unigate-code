import React from 'react';
import StudentDetailProgressLayout from 'components/admin/report-teacher/learn/student-detail-progress/Layout';

const style = {
  transform: 'translateY(-31px)',
};

class ProgressReports extends React.Component {
  render() {
    return (
      <div style={style}>
        <StudentDetailProgressLayout mode="frontend" />
      </div>
    );
  }
}

export default ProgressReports;
