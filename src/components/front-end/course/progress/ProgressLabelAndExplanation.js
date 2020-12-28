import React, { Component } from 'react';
import { t1 } from 'translate';
import ProgressExplanationIcon from './ProgressExplanationIcon';

class ProgressLabelAndExplanation extends Component {
  render() {
    return (
      <div>
        {t1('course_progress')} <ProgressExplanationIcon />
      </div>
    );
  }
}

export default ProgressLabelAndExplanation;
