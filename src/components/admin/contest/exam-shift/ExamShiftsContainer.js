import React, { Component } from 'react';
import Search from './search/Layout';

class ExamShiftsContainer extends Component {
  render() {
    return (
      <div>
        <Search {...this.props} />
      </div>
    );
  }
}

export default ExamShiftsContainer;
