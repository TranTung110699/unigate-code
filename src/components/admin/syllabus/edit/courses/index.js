import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoursesOfSyllabus from './courses-of-syllabus';
import CoursesOfCredit from './courses-of-credit';

const keyState = 'listCourse';
// const width = {
//   action: '170px',
// };

class Courses extends Component {
  render() {
    const { node } = this.props;
    if (node.type === 'credit') {
      return <CoursesOfCredit {...this.props} />;
    }
    return <CoursesOfSyllabus {...this.props} />;
  }
}

function mapStateToProps(state) {
  const courses = state.dataApiResults[keyState] || [];
  return {
    courses,
  };
}

export default connect(mapStateToProps)(Courses);
