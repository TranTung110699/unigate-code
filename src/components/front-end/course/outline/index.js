import React, { Component } from 'react';
import NavViewer from 'components/learn/nav/drawNav';
import 'components/learn/nav/stylesheet.scss';

class CourseOutline extends Component {
  render() {
    return (
      <div className="ui-learn-nav">
        <NavViewer {...this.props} mode="overview" />
      </div>
    );
  }
}

export default CourseOutline;
