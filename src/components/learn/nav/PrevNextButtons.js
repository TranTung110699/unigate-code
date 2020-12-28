import React, { Component } from 'react';
import { t1 } from 'translate';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import './PrevNextButtons.scss';

class PrevNextButtons extends Component {
  render() {
    const {
      onNext,
      onPrev,
      positionOfCurrentItem,
      isPixelz,
      displayConfigurationCourse,
      isPDF,
    } = this.props;

    return (
      <div className="prev-next-button">
        {!isPixelz && [
          positionOfCurrentItem !== 'first' ? (
            <button onClick={onPrev} className="secondary-button">
              {t1('back')}
            </button>
          ) : null,
          !(positionOfCurrentItem === 'last' && displayConfigurationCourse) ? (
            <button className="m-l-10 secondary-button" onClick={onNext}>
              {t1('next')}
            </button>
          ) : null,
        ]}
      </div>
    );
  }
}

export default withSchoolConfigs(PrevNextButtons);
