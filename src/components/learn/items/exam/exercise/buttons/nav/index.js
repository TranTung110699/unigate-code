import React from 'react';
import PropTypes from 'prop-types';
import { t3 } from 'translate';
import Icon from 'components/common/Icon';
import './stylesheet.scss';
import FinishButton from '../finish';

class ExerciseExamButtons extends React.Component {
  cssClass = 'learn-exercise-exam-nav-button';

  render() {
    const {
      isBackButtonDisabled,
      isNextButtonDisabled,
      onBackButtonClick,
      onNextButtonClick,
      shouldShowBackButton,
      shouldShowNextButton,
      shouldShowControlFinishButton,
      finishButtonClick,
      totalOfQuestions,
      showSubmitButton,
    } = this.props;

    return (
      <div>
        <div className={this.cssClass}>
          {shouldShowBackButton && (
            <div className={`${this.cssClass}__button-group`}>
              <button
                className={`${this.cssClass}__button ${
                  isBackButtonDisabled
                    ? `${this.cssClass}__button--disabled`
                    : ''
                }`}
                onClick={onBackButtonClick}
                disabled={isBackButtonDisabled}
              >
                <Icon icon="previous" />
                {t3('previous')}
              </button>
            </div>
          )}
          {shouldShowNextButton && (
            <div className={`${this.cssClass}__button-group`}>
              <button
                className={`${this.cssClass}__button ${
                  isNextButtonDisabled
                    ? `${this.cssClass}__button--disabled`
                    : ''
                }`}
                onClick={onNextButtonClick}
                disabled={isNextButtonDisabled}
              >
                {t3('next')}
                <Icon icon="next" />
              </button>
            </div>
          )}
        </div>
        {showSubmitButton && (
          <div
            className={`${this.cssClass}__buttons m-t-20 finish-exercise-btn`}
          >
            <FinishButton
              onFinishButtonOnClick={finishButtonClick}
              totalOfQuestions={totalOfQuestions}
              shouldShowControlFinishButton={shouldShowControlFinishButton}
              className="finish-button"
            />
          </div>
        )}
      </div>
    );
  }
}

ExerciseExamButtons.propTypes = {
  isBackButtonDisabled: PropTypes.bool,
  isNextButtonDisabled: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
  onNextButtonClick: PropTypes.func,
  shouldShowBackButton: PropTypes.bool,
  shouldShowNextButton: PropTypes.bool,
};

ExerciseExamButtons.defaultProps = {
  isBackButtonDisabled: false,
  isNextButtonDisabled: false,
  onBackButtonClick: null,
  onNextButtonClick: null,
  shouldShowBackButton: true,
  shouldShowNextButton: true,
};

export default ExerciseExamButtons;
