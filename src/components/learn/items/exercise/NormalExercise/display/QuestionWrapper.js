import React from 'react';
import Question from 'components/common/forms/questions';
import './NormalExerciseDisplay.scss';

const NormalExerciseDisplayQuestionWrapper = ({
  question,
  courseIid,
  getQuestionRef,
  shouldShowQuestionHelpText,
  shouldShowQuestionNumber,
  shouldShowQuestionHeader,
  options,
  questionMode,
  displayTemplate,
  shouldShowQuestionLearningSuggestionWhenShowAnswer,
  onQuestionMouseEnter,
  handleUserAnswer,
  onQuestionDone,
  isQuestionContentAudioControllable,
  onQuestionContentAudioPlay,
  onQuestionContentAudioEnded,
  onQuestionBookMarkAreaClick,
  questionGroupTimeLeftInSeconds,
  isStickyQuestionOfGroup,
}) => {
  const handleQuestionMouseEnter = React.useMemo(
    () => {
      return typeof onQuestionMouseEnter === 'function'
        ? () => onQuestionMouseEnter(question)
        : null;
    },
    [question, onQuestionMouseEnter],
  );

  const handleCheckAnswerFinish = React.useMemo(
    () => {
      return typeof handleUserAnswer === 'function'
        ? (take) => handleUserAnswer(question, take)
        : null;
    },
    [question, handleUserAnswer],
  );

  const handleQuestionDone = React.useMemo(
    () => {
      return typeof onQuestionDone === 'function'
        ? () => onQuestionDone(question)
        : null;
    },
    [question, onQuestionDone],
  );

  const checkIfQuestionContentAudioIsControllable = React.useMemo(
    () => {
      return typeof isQuestionContentAudioControllable === 'function'
        ? (audioIndex) =>
            isQuestionContentAudioControllable(question, audioIndex)
        : null;
    },
    [question, isQuestionContentAudioControllable],
  );

  const handleContentAudioPlay = React.useMemo(
    () => {
      return typeof onQuestionContentAudioPlay === 'function'
        ? (audioIndex) => onQuestionContentAudioPlay(question, audioIndex)
        : null;
    },
    [question, onQuestionContentAudioPlay],
  );

  const handleContentAudioEnded = React.useMemo(
    () => {
      return typeof onQuestionContentAudioEnded === 'function'
        ? (audioIndex) => onQuestionContentAudioEnded(question, audioIndex)
        : null;
    },
    [question, onQuestionContentAudioEnded],
  );

  const handleBookMarkAreaClick = React.useMemo(
    () => {
      return typeof onQuestionBookMarkAreaClick === 'function'
        ? () => onQuestionBookMarkAreaClick(question)
        : null;
    },
    [question, onQuestionBookMarkAreaClick],
  );

  const shouldShowAnswerWhenHasResult =
    (options && options.shouldDisplayCheckedResult) ||
    question.shouldDisplayCheckedResult;

  return (
    <div onMouseEnter={handleQuestionMouseEnter}>
      <Question
        ref={getQuestionRef}
        name={question.uniqueId}
        question={question}
        courseIid={courseIid}
        onCheckAnswerFinish={handleCheckAnswerFinish}
        defaultAnswers={question.answer}
        onQuestionDone={handleQuestionDone}
        isContentAudioControllable={checkIfQuestionContentAudioIsControllable}
        onContentAudioPlay={handleContentAudioPlay}
        onContentAudioEnded={handleContentAudioEnded}
        shouldShowAnswerWhenHasResult={shouldShowAnswerWhenHasResult}
        shouldShowQuestionHelpText={shouldShowQuestionHelpText}
        shouldShowQuestionNumber={shouldShowQuestionNumber}
        shouldShowQuestionHeader={shouldShowQuestionHeader}
        onBookMarkAreaClick={handleBookMarkAreaClick}
        isTicked={question.isTicked}
        shouldShowKeyWhenShowAnswer={options && options.instant_key}
        instantShowFeedback={options && options.instant_show_feedback}
        mode={questionMode}
        displayTemplate={displayTemplate}
        shouldShowQuestionLearningSuggestionWhenShowAnswer={
          shouldShowQuestionLearningSuggestionWhenShowAnswer
        }
        isStickyQuestionOfGroup={isStickyQuestionOfGroup}
      />
    </div>
  );
};

export default NormalExerciseDisplayQuestionWrapper;
