import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd';

import { t1 } from 'translate';
import ProgressLabelAndExplanation from './ProgressLabelAndExplanation';
import { scorePeriods } from 'configs/constants';
import './styles.scss';
import ProgressExplanationIcon from './ProgressExplanationIcon';
import { isSmallScreen } from '../../../../common';

// support 3 modes: learn, overview, grid
class CourseProgress extends Component {
  render() {
    const { course, progress, mode, notShowProgress } = this.props;

    if (mode == 'learn') {
      // let progressClass;
      // if (progress <= scorePeriods.BAD) {
      //   progressClass = 'bad';
      // } else if (progress <= scorePeriods.IMPROVEMENT) {
      //   progressClass = 'improvement';
      // } else if (progress === 100) {
      //   progressClass = 'finish';
      // } else {
      //   progressClass = 'default';
      // }
      //
      const showHideButton = this.props.showHideButton;
      return (
        <div className="progress-container">
          <span className="m-r-5 m-l-5 hamburger">{showHideButton}</span>
          {notShowProgress ? null : (
            <>
              <div className="content">
                <Progress
                  percent={progress}
                  strokeColor={progress === 100 ? '#6D2266' : '#F8971D'}
                  trailColor="#E1E1E1"
                />
              </div>

              <ProgressExplanationIcon />
            </>
          )}
        </div>
      );
    }

    // mode overview
    // TODO: mode 'grid'
    return [<ProgressLabelAndExplanation />, <Progress percent={progress} />];
    /*
  <div className="progress">
      <div className="progress-1 progress" title={t1('completion_progress')}>
        <div
          className="progress-bar"
          data-progress={progress}
          style={{ width: `${progress}%` }}
        >
          {progress > 10 && (
            <span className="title  title-progress">
            {progress}% {t1('done')}
          </span>
          )}
        </div>
      </div>
    </div>
     */
  }
}

export default CourseProgress;
