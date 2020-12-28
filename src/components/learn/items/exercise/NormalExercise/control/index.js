import React from 'react';
import { t1 } from 'translate';
import QuestionGroups from 'components/learn/items/exercise/NormalExercise/common/NormalExerciseControlQuestionGroups';
import QuestionNavigationsNumber from 'components/learn/items/exercise/NormalExercise/common/QuestionNavigationsNumber';
import Icon from 'components/common/Icon';
import './NormalExerciseControl.scss';
import Portal, { portals } from 'components/common/portal';
import LearnSubBoardSectionCard from '../../../../viewer/sub-board/section-card';
import { isSmallScreen } from 'common';

const styles = {
  scrollbar: {
    height: '50px',
  },
};

const NormalExerciseControl = ({
  currentQuestionUniqueId = null,
  exercise = null,
  isBackButtonDisabled = false,
  isFinishButtonDisabled = false,
  isNextButtonDisabled = false,
  isQuestionClickable = null,
  onBackButtonClick = null,
  onCheckAnswerButtonClick = null,
  onFinishButtonOnClick = null,
  onNextButtonClick = null,
  onQuestionClick = null,
  showBackButton = true,
  showCheckButton = true,
  showControlQuestions = true,
  showFinishButton = true,
  showNextButton = true,
  labelFinish,
  finishButtonStyle,
  checkAnswerElement,
  showQuestionNavNumber = true,
}) => {
  const canShowControlQuestions =
    showControlQuestions &&
    exercise &&
    exercise.children &&
    Array.isArray(exercise.children) &&
    exercise.children.length > 1;
  let questionNav;
  if (canShowControlQuestions) {
    questionNav = (
      <div className="normal-exercise-control__groups">
        <QuestionGroups
          questions={exercise.children}
          currentQuestionUniqueId={currentQuestionUniqueId}
          isQuestionClickable={isQuestionClickable}
          onQuestionClick={onQuestionClick}
        />
      </div>
    );
  }

  // if (!isSmallScreen) {
  //
  // }

  const finishButton = (
    <button
      className="btn-primary m-l-5 m-r-5"
      onClick={onFinishButtonOnClick}
      disabled={isFinishButtonDisabled}
      style={finishButtonStyle}
    >
      {labelFinish || t1('finish')}
    </button>
  );

  return (
    <div className="learn-control normal-exercise-control center">
      {canShowControlQuestions && !isSmallScreen && (
        <Portal id={portals.QUESTION_NAVIGATIONS}>
          <LearnSubBoardSectionCard title={t1('exercise_questions')}>
            {questionNav}
          </LearnSubBoardSectionCard>
        </Portal>
      )}

      {showQuestionNavNumber && (
        <Portal id={portals.QUESTION_NAVIGATIONS_NUMBER}>
          <QuestionNavigationsNumber
            questions={exercise.children}
            currentQuestionUniqueId={currentQuestionUniqueId}
            isQuestionClickable={isQuestionClickable}
            onQuestionClick={onQuestionClick}
          />
        </Portal>
      )}

      <div className="normal-exercise-control__action center w-100">
        {showBackButton && (
          <button
            className="normal-exercise-control__button normal-exercise-control__button--icon"
            onClick={onBackButtonClick}
            disabled={isBackButtonDisabled}
          >
            <Icon icon="previous-question" />
          </button>
        )}
        {checkAnswerElement ? (
          checkAnswerElement
        ) : (
          <button
            className="btn-secondary m-l-5 m-r-5 check-button"
            onClick={onCheckAnswerButtonClick}
          >
            {t1('check')}
          </button>
        )}
        {showNextButton && (
          <button
            className="normal-exercise-control__button normal-exercise-control__button--icon"
            onClick={onNextButtonClick}
            disabled={isNextButtonDisabled}
          >
            <Icon icon="next-question" />
          </button>
        )}
        {/*
          {showFinishButton && isSmallScreen && finishButton}
           */}
        {showFinishButton && !isSmallScreen && (
          <Portal id={portals.EXERCISE_FINISH_BUTTON}>
            <div className="text-center m-t-10">{finishButton}</div>
          </Portal>
        )}
      </div>
      <div className="clearfix" />
    </div>
  );
};

export default NormalExerciseControl;
