import React, { Component } from 'react';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import { courseLearningTypes, schoolTypes, layouts } from 'configs/constants';
import lodashGet from 'lodash.get';

class CourseBasicInfo extends Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        <div>
          {t1('time_frame')} : {timestampToDateString(node.start_date)} -{' '}
          {timestampToDateString(node.end_date)}
        </div>
        <div>
          {t1('learning_type')} :{' '}
          {node.learning_type == courseLearningTypes.ILT
            ? t1('instructor_led')
            : t1('online')}
        </div>
        {node.learning_type == courseLearningTypes.ILT ? (
          <div>
            {t1('sessions')}: {lodashGet(node, 'counter.sessions') || 0}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CourseBasicInfo;
