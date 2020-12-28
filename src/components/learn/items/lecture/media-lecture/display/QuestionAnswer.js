import React from 'react';
import screenfull from 'screenfull';
import Question from 'components/common/forms/questions';
import AntdButton from 'antd/lib/button';
import { t1 } from 'translate';
import { getQuestionPreviousSegmentStartTime } from 'components/learn/items/lecture/media-lecture/common/questions';
import lodashGet from 'lodash.get';
import { secondsToTimeString } from 'common/utils/Date';
import Icon from 'components/common/Icon';

import './QuestionAnswer.scss';

const QuestionAnswerSteps = {
  DOING: 'doing',
  DONE: 'done',
};

const QuestionAnswer = ({
  node,
  className,
  question,
  onFinish,
  canSkipQuestion,
  mustAnswerQuestionCorrectly,
  onRewatch,
}) => {
  const initialStep = QuestionAnswerSteps.DOING;
  const initialQuestionTake = undefined;

  const [step, setStep] = React.useState(initialStep);
  const [questionTake, saveQuestionTake] = React.useState(initialQuestionTake);

  const isQuestionAnswerCorrect = lodashGet(questionTake, 'isCorrect');

  const reset = React.useCallback(
    () => {
      setStep(initialStep);
      saveQuestionTake(initialQuestionTake);
    },
    [initialStep, initialQuestionTake],
  );

  React.useEffect(
    () => {
      if (question) {
        // because at the time of writing, there are no way to overlay something over a fullscreen video
        // if in the future, there is a way, you can refactor this line
        screenfull.exit();
        reset();
      }
    },
    [question, reset],
  );

  const handleDoneAnswering = () => {
    setStep(QuestionAnswerSteps.DONE);
  };

  const handleRetryAnswering = () => {
    reset();
  };

  const shouldShowAnswer = step === QuestionAnswerSteps.DONE;
  const shouldShowKeyWhenShowAnswer = !mustAnswerQuestionCorrectly;

  const shouldShowDoneButton = step === QuestionAnswerSteps.DOING;
  const doneButtonLabel = canSkipQuestion ? t1('check_answer') : t1('done');
  const handleDoneButtonClick = () => {
    handleDoneAnswering();
  };

  const shouldShowNextButton = () => {
    if (canSkipQuestion) {
      return true;
    }

    if (step !== QuestionAnswerSteps.DONE) {
      return false;
    }

    if (!isQuestionAnswerCorrect && mustAnswerQuestionCorrectly) {
      return false;
    }

    return true;
  };
  const nextButtonLabel =
    step === QuestionAnswerSteps.DONE
      ? t1('next')
      : canSkipQuestion
      ? t1('skip')
      : t1('next');
  const handleNextButtonClick = () => {
    if (typeof onFinish === 'function') {
      onFinish();
    }
  };

  const shouldShowRetryButton = () => {
    if (
      step === QuestionAnswerSteps.DONE &&
      !isQuestionAnswerCorrect &&
      !shouldShowKeyWhenShowAnswer
    ) {
      return true;
    }
    return false;
  };
  const retryButtonLabel = t1('retry');
  const handleRetryButtonClick = () => {
    handleRetryAnswering();
  };

  const handleCheckQuestionAnswerFinish = (questionTake) => {
    saveQuestionTake(questionTake);
  };

  const cssClass = 'media-lecture-question-answer';

  return question ? (
    <div className={`${className || ''} ${cssClass}`}>
      <div className={`${cssClass}__content`}>
        <Question
          question={question}
          shouldShowAnswerWhenHasResult={shouldShowAnswer}
          onCheckAnswerFinish={handleCheckQuestionAnswerFinish}
          shouldShowKeyWhenShowAnswer={shouldShowKeyWhenShowAnswer}
          shouldShowScoreWhenShowAnswer={false}
          shouldShowQuestionIdWhenShowAnswer={false}
        />
      </div>

      <div className="text-center">
        <Icon icon="timer" /> {t1('you_are_doing_inline_question_at')}{' '}
        <b>{secondsToTimeString(question.time)}</b>
      </div>
      <div className={`${cssClass}__control`}>
        {shouldShowDoneButton && (
          <AntdButton
            className={'m-r-10'}
            type="primary"
            onClick={handleDoneButtonClick}
          >
            {doneButtonLabel}
          </AntdButton>
        )}
        {shouldShowRetryButton() && (
          <AntdButton
            className={'m-r-10'}
            type="primary"
            onClick={handleRetryButtonClick}
          >
            {retryButtonLabel}
          </AntdButton>
        )}
        {shouldShowNextButton() && (
          <AntdButton
            className={'m-r-10'}
            type="primary"
            onClick={handleNextButtonClick}
          >
            {nextButtonLabel}
          </AntdButton>
        )}
        <AntdButton onClick={onRewatch}>
          {t1('rewatch_video_snippet')} (
          {t1(
            'from_%s',
            secondsToTimeString(
              getQuestionPreviousSegmentStartTime(node, question),
            ),
          )}
          )
        </AntdButton>
      </div>
    </div>
  ) : null;
};

export default QuestionAnswer;
