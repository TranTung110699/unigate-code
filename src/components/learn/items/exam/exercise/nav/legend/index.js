import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { isToeicTest, modes } from 'common/learn/exercise';
import { getLearnItemInfoSelector } from 'common/learn';
import './stylesheet.scss';

class ExerciseExamNavLegend extends React.Component {
  cssClass = 'learn-exercise-exam-nav-legend';

  render() {
    const { info } = this.props;
    const mode = this.props.mode || modes.NORMAL;

    if ([modes.NORMAL, modes.PREVIEW].includes(mode)) {
      return (
        <div className={this.cssClass}>
          <div className={`${this.cssClass}-item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question`}
            >
              {' '}
            </div>
            <div className={`${this.cssClass}__text`}>{t1('not_seen')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--touched`}
            >
              {' '}
            </div>
            <div className={`${this.cssClass}__text`}>{t1('seen')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--current`}
            >
              {' '}
            </div>
            <div className={`${this.cssClass}__text`}>{t1('current')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--done`}
            >
              {' '}
            </div>
            <div className={`${this.cssClass}__text`}>{t1('done')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--ticked`}
            >
              {' '}
            </div>
            <div className={`${this.cssClass}__text`}>{t1('save')}</div>
          </div>
          {isToeicTest(info) && (
            <div className={`${this.cssClass}__item`}>
              <div
                className={`${
                  this.cssClass
                }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--listening`}
              >
                6
              </div>
              <div className={`${this.cssClass}__text`}>
                {t1('audio_playing')}
              </div>
            </div>
          )}
        </div>
      );
    }

    if ([modes.PREVIEW_TEST].includes(mode)) {
      return (
        <div className={this.cssClass}>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--correct`}
            >
              1
            </div>
            <div className={`${this.cssClass}__text`}>{t1('correct')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--incorrect`}
            >
              2
            </div>
            <div className={`${this.cssClass}__text`}>{t1('incorrect')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--current normal-exercise-control-question-groups__question--correct`}
            >
              3
            </div>
            <div className={`${this.cssClass}__text`}>{t1('current')}</div>
          </div>
          <div className={`${this.cssClass}__item`}>
            <div
              className={`${
                this.cssClass
              }__button normal-exercise-control-question-groups__question normal-exercise-control-question-groups__question--current normal-exercise-control-question-groups__question--incorrect`}
            >
              4
            </div>
            <div className={`${this.cssClass}__text`}>{t1('current')}</div>
          </div>
        </div>
      );
    }

    return null;
  }
}

ExerciseExamNavLegend.propTypes = {
  info: PropTypes.shape(),
  mode: PropTypes.string,
};

ExerciseExamNavLegend.defaultProps = {
  info: null,
  // mode: modes.NORMAL,
};

const mapStateToProps = (state, props) => {
  const { learnItemIid } = props;

  return {
    info: getLearnItemInfoSelector(state)(learnItemIid),
  };
};

export default connect(mapStateToProps)(ExerciseExamNavLegend);
