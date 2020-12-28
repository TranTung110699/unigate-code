import React from 'react';
import PropTypes from 'prop-types';
import { t3 } from 'translate';
import './stylesheet.scss';

class ExerciseExamFinishButtons extends React.Component {
  cssClass = 'learn-exercise-exam-finish-buttons';

  render() {
    const {
      onFinishButtonOnClick,
      shouldShowControlFinishButton,
      totalOfQuestions,
    } = this.props;

    return (
      <div className={this.cssClass}>
        {shouldShowControlFinishButton && (
          <div
            className={`${this.cssClass}__button-group ${
              this.cssClass
            }__button-group--center`}
          >
            <button
              className={`${this.cssClass}__button`}
              onClick={onFinishButtonOnClick}
            >
              {totalOfQuestions
                ? t3('finish_%s_questions', [totalOfQuestions])
                : t3('finish')}
            </button>
          </div>
        )}
      </div>
    );
  }
}

ExerciseExamFinishButtons.propTypes = {
  onFinishButtonOnClick: PropTypes.func,
  shouldShowControlFinishButton: PropTypes.bool,
};

ExerciseExamFinishButtons.defaultProps = {
  onFinishButtonOnClick: null,
  shouldShowControlFinishButton: true,
};

export default ExerciseExamFinishButtons;
