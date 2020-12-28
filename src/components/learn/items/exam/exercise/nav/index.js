import React from 'react';
import PropTypes from 'prop-types';
import { getQuestionPositionInExercises } from 'common/learn/Question';
import NormalExerciseControlQuestionGroups from 'components/learn/items/exercise/NormalExercise/common/NormalExerciseControlQuestionGroups';
import { modes } from 'common/learn/exercise';
import { Scrollbars } from 'react-custom-scrollbars';
import { findDOMNode } from 'react-dom';
import Legend from './legend';
import './stylesheet.scss';

class ExerciseExamNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legendElementHeight: 0,
    };
  }

  componentDidMount() {
    this.updateHeightOfElementsToState();
  }

  componentDidUpdate() {
    this.updateHeightOfElementsToState();
  }

  updateHeightOfElementsToState = () => {
    const { legendElementHeight } = this.state;
    const legendNode = findDOMNode(this.legendElement);

    if (legendNode) {
      const newLegendElementHeight = legendNode.getBoundingClientRect().height;

      if (legendElementHeight !== newLegendElementHeight) {
        this.setState({
          legendElementHeight: newLegendElementHeight,
        });
      }
    }
  };

  cssClass = 'learn-exercise-exam-nav';

  render() {
    const {
      currentListeningQuestionUniqueId,
      currentQuestionUniqueId,
      exercises,
      isExerciseClickable,
      isQuestionClickable,
      learnItemIid,
      maxHeight,
      // mode,
      onQuestionClick,
    } = this.props;

    const mode = this.props.mode || modes.NORMAL;
    const { exerciseIndex } = getQuestionPositionInExercises(
      exercises,
      currentQuestionUniqueId,
    );

    let scrollbarProps = {};

    if (maxHeight) {
      scrollbarProps = {
        ...scrollbarProps,
        autoHeight: true,
        autoHeightMax: maxHeight - this.state.legendElementHeight,
      };
    }

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__exercises`}>
          <Scrollbars
            {...scrollbarProps}
            className={`${this.cssClass}__exercises-scroll`}
          >
            {Array.isArray(exercises) &&
              exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`${this.cssClass}__exercise\
                      ${
                        exerciseIndex === index
                          ? `${this.cssClass}__exercise--active`
                          : ''
                      }`}
                >
                  {exercise.name && (
                    <div className={`${this.cssClass}__exercise-name`}>
                      {exercise.name}
                    </div>
                  )}
                  <NormalExerciseControlQuestionGroups
                    type={exercise.type}
                    questions={exercise.children}
                    onQuestionClick={onQuestionClick}
                    currentQuestionUniqueId={currentQuestionUniqueId}
                    currentListeningQuestionUniqueId={
                      currentListeningQuestionUniqueId
                    }
                    isQuestionClickable={
                      typeof isExerciseClickable === 'function' &&
                      !isExerciseClickable(exercise)
                        ? () => false
                        : isQuestionClickable
                    }
                  />
                </div>
              ))}
          </Scrollbars>
        </div>
        <div
          className={`${this.cssClass}__legend`}
          ref={(el) => {
            this.legendElement = el;
          }}
        >
          <Legend learnItemIid={learnItemIid} mode={mode} />
        </div>
      </div>
    );
  }
}

ExerciseExamNav.propTypes = {
  currentListeningQuestionUniqueId: PropTypes.string,
  currentQuestionUniqueId: PropTypes.string,
  exercises: PropTypes.arrayOf(PropTypes.shape()),
  isExerciseClickable: PropTypes.func,
  isQuestionClickable: PropTypes.func,
  learnItemIid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.number,
  mode: PropTypes.string,
  onQuestionClick: PropTypes.func,
};

ExerciseExamNav.defaultProps = {
  currentListeningQuestionUniqueId: null,
  currentQuestionUniqueId: null,
  exercises: [],
  isExerciseClickable: () => true,
  isQuestionClickable: () => true,
  learnItemIid: null,
  maxHeight: 0,
  // mode: modes.NORMAL,
  onQuestionClick: () => {},
};

export default ExerciseExamNav;
