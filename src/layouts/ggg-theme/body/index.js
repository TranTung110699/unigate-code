import React from 'react';
import Topic from './topic';
import Teacher from './teacher';
import Course from './course';
import Feedbacks from './feedbacks';
import './stylesheet.scss';

class Body extends React.Component {
  render() {
    return (
      <div>
        <Topic />
        <Teacher />
        <Course />
        <Feedbacks />
      </div>
    );
  }
}

export default Body;
