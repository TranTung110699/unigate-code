import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isSmallScreen } from 'common';
import {
  displayQuestionsCheckedResult,
  saveAnswer,
  saveItemInfo as saveItemInfoAction,
  saveItemQuestionInfo as saveItemQuestionInfoAction,
} from 'actions/learn';
import {
  finishExercise,
  redoExercise as redoExerciseAction,
  resumeExercise as resumeExerciseAction,
  reviewExercise as reviewExerciseAction,
  setCurrentQuestionInExercise as setCurrentQuestionInExerciseAction,
  startExercise as startExerciseAction,
} from 'actions/learn/exercise/normal/saga-creators';
import { withRouter } from 'react-router-dom';
import {
  getFullExercisesWithQuestionInfoSelector,
  getNavigateInfoOfExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercises,
  isAllQuestionAnsweredSelector,
  modes,
  statuses,
  steps,
} from 'common/learn/exercise';
import get from 'lodash.get';
import { isIntroSticky } from 'common/learn/Question';
import Question from 'components/common/forms/questions';
import { getLearnItemInfoSelector } from 'common/learn';
import { Scrollbars } from 'react-custom-scrollbars';
import { findDOMNode } from 'react-dom';
import Icon from 'components/common/Icon';
import NormalExerciseDisplay from './display';
import NormalExerciseControl from './control';
import NormalExerciseNotStarted from './not-started';
import NormalExerciseResult from './result';
import Portal, { portals } from 'components/common/portal';
import { t1 } from 'translate';
import LearnSubBoardSectionCard from 'components/learn/viewer/sub-board/section-card';

import './stylesheet.scss';
import Affix from 'antd/lib/affix';
import { saveItemInfo, stopDisplayQuestionsCheckedResult } from 'actions/learn';
import { isOnlyOnMobileQuestion } from '../../../../common/forms/questions/common';

export class NormalExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementHeight: 0,
    };
  }

  componentDidMount() {
    const { onComponentDidMount } = this.props;
    this.updateHeightOfElementsToState();
    if (typeof onComponentDidMount === 'function') {
      onComponentDidMount();
    }
  }

  componentDidUpdate(prevProps) {
    this.updateHeightOfElementsToState();
    const { onComponentDidUpdate, currentQuestionUniqueId } = this.props;
    if (
      prevProps.currentQuestionUniqueId !== currentQuestionUniqueId &&
      onComponentDidUpdate &&
      typeof onComponentDidUpdate === 'function'
    ) {
      onComponentDidUpdate();
    }
  }

  componentWillUnmount() {
    const { onComponentWillUnmount } = this.props;
    if (typeof onComponentWillUnmount === 'function') {
      onComponentWillUnmount();
    }
  }

  updateHeightOfElementsToState = () => {
    const elementNode = findDOMNode(this);
    const { elementHeight } = this.state;

    if (elementNode) {
      const newElementHeight = elementNode.getBoundingClientRect().height;
      if (elementHeight !== newElementHeight) {
        this.setState({
          elementHeight: newElementHeight,
        });
      }
    }
  };

  cssClass = 'normal-exercise';

  render() {
    const {
      courseIid,
      currentQuestionUniqueId,
      displayMaxHeight,
      exercise,
      info,
      introSticky,
      isControlBackButtonEnabled,
      isControlNextButtonEnabled,
      isControlQuestionClickable,
      isIntroStickyAudiosPlaying,
      onBackButtonClick,
      onCheckAnswerButtonClick,
      onControlQuestionClick,
      onFinish,
      onFinishButtonClick,
      onNextButtonClick,
      onQuestionBookMarkAreaClick,
      onQuestionDone,
      onQuestionMouseEnter,
      onRedoButtonClick,
      onReviewButtonClick,
      onStartButtonClick,
      onResumeButtonClick,
      onUserAnswer,
      options,
      questionsToDisplay,
      result,
      shouldDisplayCurrentQuestionAtTop,
      shouldShowControlBackButton,
      shouldShowControlCheckButton,
      shouldShowControlFinishButton,
      shouldShowControlNextButton,
      shouldShowControlQuestions,
      shouldShowQuestionHelpText,
      shouldShowQuestionLearningSuggestionWhenShowAnswer,
      shouldShowResultDetail,
      step,
      resultDetailActionProps,
      hasResultAction,
      questionUniqueIdWhenClickNext,
      onRetryButtonClick,
    } = this.props;

    const currentQuestion = Array.isArray(questionsToDisplay)
      ? questionsToDisplay.find(
          (item) => item.uniqueId === currentQuestionUniqueId,
        )
      : {};
    const mobileOnly = currentQuestion
      ? isOnlyOnMobileQuestion(currentQuestion)
      : false;

    const isCheckButtonClicked = get(info, 'isCheckButtonClicked', false);
    const isLastQuestion = !Boolean(questionUniqueIdWhenClickNext);

    const shouldShowControl =
      !get(exercise, 'options.hide_controls') &&
      [
        shouldShowControlNextButton,
        shouldShowControlFinishButton,
        shouldShowControlCheckButton,
        shouldShowControlBackButton,
        shouldShowControlQuestions,
      ].some((value) => value);

    if (!step) {
      return null;
    }

    if ([steps.NOT_STARTED, steps.NOT_CONTINUED].includes(step)) {
      return (
        <div className={this.cssClass}>
          <NormalExerciseNotStarted
            onRedoButtonClick={onRedoButtonClick}
            onResumeButtonClick={onResumeButtonClick}
            onStartButtonClick={onStartButtonClick}
            step={step}
          />
        </div>
      );
    }

    if (step === steps.RESULT) {
      return (
        <div className={this.cssClass}>
          <NormalExerciseResult
            hasAction={hasResultAction}
            shouldShowDetail={shouldShowResultDetail}
            onReviewButtonClick={onReviewButtonClick}
            onResumeButtonClick={onResumeButtonClick}
            onRedoButtonClick={onRedoButtonClick}
            onNextButtonClick={onFinish}
            options={options}
            result={result}
            courseIid={courseIid}
            exercise={exercise}
            detailActionProps={resultDetailActionProps}
          />
        </div>
      );
    }

    const introStickyPosition = introSticky
      ? introSticky.intro_sticky_position || 'top'
      : null;

    let introStickyScrollbarsProps = {};
    if (introStickyPosition === 'top') {
      introStickyScrollbarsProps = {
        autoHeight: true,
        autoHeightMax: (this.state.elementHeight * 30) / 100,
      };
    }

    const displayTemplate = get(
      this.props,
      'exercise.question_display_template',
    );

    return (
      <div
        className={`${this.cssClass}`}
        ref={(element) => (this.container = element)}
        style={{
          height: '100vh - 200px' + '!important',
        }}
      >
        {info && !isSmallScreen && (
          <Portal id={portals.EXERCISE_TIMER}>
            <LearnSubBoardSectionCard title={t1('exercise_time')}>
              <div className={`text-center ${this.cssClass}__duration`}>
                <div>
                  <Icon icon="time" />
                  <br />
                  <span
                    className={`${this.cssClass}__duration-text ${
                      !info.duration
                        ? `${this.cssClass}__duration-text--unlimited`
                        : ''
                    }`}
                  >
                    {typeof info.timeLeft !== 'undefined'
                      ? info.timeLeft
                      : info.duration
                      ? info.duration
                      : t1('unlimited_time')}
                  </span>
                </div>
              </div>
            </LearnSubBoardSectionCard>
          </Portal>
        )}
        <div
          className={`${this.cssClass}__main\
            learn-content
            ${
              introStickyPosition
                ? `${this.cssClass}__main--intro-sticky-${introStickyPosition}`
                : ''
            } p-10 ${isSmallScreen ? 'm-b-55' : ''}`}
        >
          {introSticky && (
            <div
              className={`${this.cssClass}__intro-sticky\
                  ${
                    introStickyPosition
                      ? `${this.cssClass}__intro-sticky--${introStickyPosition}`
                      : ''
                  }`}
            >
              <Scrollbars
                {...introStickyScrollbarsProps}
                className={`${this.cssClass}__intro-sticky-scroll`}
              >
                <Question
                  isContentAudiosPlaying={isIntroStickyAudiosPlaying}
                  shouldShowQuestionHelpText={false}
                  question={introSticky}
                  name="intro_sticky"
                  displayTemplate={displayTemplate}
                />
              </Scrollbars>
            </div>
          )}
          <NormalExerciseDisplay
            className={`${this.cssClass}__display`}
            courseIid={courseIid}
            currentQuestionUniqueId={currentQuestionUniqueId}
            handleUserAnswer={onUserAnswer}
            maxHeight={displayMaxHeight}
            onQuestionBookMarkAreaClick={onQuestionBookMarkAreaClick}
            onQuestionDone={onQuestionDone}
            onQuestionMouseEnter={onQuestionMouseEnter}
            options={options}
            questions={questionsToDisplay}
            displayTemplate={displayTemplate}
            renderAfter={() => {
              // if (step === steps.REVIEW) {
              //   return (
              //     <div>
              //       <hr
              //         className="normal-exercise-display__result-separator"
              //         width="100%"
              //       />
              //       <NormalExerciseResult
              //         onRedoButtonClick={onRedoButtonClick}
              //         onNextButtonClick={onFinish}
              //         hasAction={hasResultAction}
              //         options={options}
              //         result={result}
              //         courseIid={courseIid}
              //         exercise={exercise}
              //       />
              //     </div>
              //   );
              // }
              return null;
            }}
            shouldDisplayCurrentQuestionAtTop={
              shouldDisplayCurrentQuestionAtTop
            }
            shouldShowQuestionHelpText={shouldShowQuestionHelpText}
            shouldShowQuestionLearningSuggestionWhenShowAnswer={
              shouldShowQuestionLearningSuggestionWhenShowAnswer
            }
          />
        </div>
        {shouldShowControl &&
          (() => {
            const controlElement = (
              <NormalExerciseControl
                exercise={exercise}
                currentQuestionUniqueId={currentQuestionUniqueId}
                onFinishButtonOnClick={onFinishButtonClick}
                onCheckAnswerButtonClick={onCheckAnswerButtonClick}
                onBackButtonClick={onBackButtonClick}
                onNextButtonClick={onNextButtonClick}
                showNextButton={false}
                showFinishButton={shouldShowControlFinishButton}
                showCheckButton={shouldShowControlCheckButton}
                showBackButton={false}
                showControlQuestions={shouldShowControlQuestions}
                isBackButtonDisabled={!isControlBackButtonEnabled}
                isNextButtonDisabled={!isControlNextButtonEnabled}
                isQuestionClickable={isControlQuestionClickable}
                onQuestionClick={onControlQuestionClick}
                checkAnswerElement={
                  <>
                    {isCheckButtonClicked &&
                      !get(
                        info,
                        `questions.${currentQuestionUniqueId}.answer.isCorrect`,
                      ) && (
                        <button
                          className="btn-secondary m-l-5 m-r-5 check-button"
                          onClick={onRetryButtonClick}
                        >
                          {t1('retry')}
                        </button>
                      )}
                    <button
                      className="btn-primary m-l-5 m-r-5 check-button"
                      onClick={
                        mobileOnly
                          ? isLastQuestion
                            ? onFinishButtonClick
                            : onNextButtonClick
                          : isCheckButtonClicked
                          ? isLastQuestion
                            ? onFinishButtonClick
                            : onNextButtonClick
                          : onCheckAnswerButtonClick
                      }
                    >
                      {t1(
                        mobileOnly
                          ? isLastQuestion
                            ? 'finish'
                            : 'next'
                          : isCheckButtonClicked
                          ? isLastQuestion
                            ? 'finish'
                            : 'next'
                          : 'check',
                      )}
                    </button>
                  </>
                }
              />
            );

            if (!isSmallScreen) {
              return (
                <Portal
                  id={portals.EXERCISE_CONTROL}
                  title={t1('exercise_questions')}
                >
                  <Affix offsetBottom={0}>
                    <div
                      style={{
                        position: 'fixed',
                        bottom: 0,
                        width: this.container
                          ? get(
                              this.container.getBoundingClientRect(),
                              'width',
                            ) + 60
                          : '100%',
                      }}
                    >
                      {controlElement}
                    </div>
                  </Affix>
                </Portal>
              );
            }

            return (
              <div
                style={{
                  textAlign: 'center',
                  position: 'fixed',
                  zIndex: 1,
                  width: this.container
                    ? get(this.container.getBoundingClientRect(), 'width') + 30
                    : '100%',
                  bottom: 0,
                  margin: '-15px',
                  paddingBottom: 15,
                }}
                className={`${this.cssClass}__control`}
              >
                {controlElement}
              </div>
            );
          })()}
      </div>
    );
  }
}

NormalExercise.propTypes = {
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionUniqueId: PropTypes.string,
  displayMaxHeight: PropTypes.number,
  exercise: PropTypes.shape(),
  info: PropTypes.shape(),
  introSticky: PropTypes.shape(),
  isControlBackButtonEnabled: PropTypes.bool,
  isControlNextButtonEnabled: PropTypes.bool,
  isControlQuestionClickable: PropTypes.func,
  isIntroStickyAudiosPlaying: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
  onCheckAnswerButtonClick: PropTypes.func,
  onComponentDidMount: PropTypes.func,
  onComponentWillUnmount: PropTypes.func,
  onControlQuestionClick: PropTypes.func,
  onFinish: PropTypes.func,
  onFinishButtonClick: PropTypes.func,
  onNextButtonClick: PropTypes.func,
  onQuestionBookMarkAreaClick: PropTypes.func,
  onQuestionDone: PropTypes.func,
  onQuestionMouseEnter: PropTypes.func,
  onRedoButtonClick: PropTypes.func,
  onReviewButtonClick: PropTypes.func,
  onStartButtonClick: PropTypes.func,
  onResumeButtonClick: PropTypes.func,
  onUserAnswer: PropTypes.func,
  options: PropTypes.shape(),
  questionsToDisplay: PropTypes.arrayOf(PropTypes.shape()),
  result: PropTypes.number,
  resultDetailActionProps: PropTypes.shape(),
  shouldDisplayCurrentQuestionAtTop: PropTypes.bool,
  shouldFeedbackInstantly: PropTypes.bool,
  shouldShowControlBackButton: PropTypes.bool,
  shouldShowControlCheckButton: PropTypes.bool,
  shouldShowControlFinishButton: PropTypes.bool,
  shouldShowControlNextButton: PropTypes.bool,
  shouldShowControlQuestions: PropTypes.bool,
  shouldShowQuestionHelpText: PropTypes.bool,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: PropTypes.bool,
  shouldShowResultDetail: PropTypes.bool,
  step: PropTypes.string,
};

NormalExercise.defaultProps = {
  courseIid: null,
  currentQuestionUniqueId: null,
  displayMaxHeight: 0,
  exercise: null,
  info: null,
  introSticky: null,
  isControlBackButtonEnabled: false,
  isControlNextButtonEnabled: false,
  isControlQuestionClickable: () => true,
  isIntroStickyAudiosPlaying: false,
  onBackButtonClick: null,
  onCheckAnswerButtonClick: null,
  onComponentDidMount: null,
  onComponentWillUnmount: null,
  onControlQuestionClick: null,
  onFinish: () => {},
  onFinishButtonClick: null,
  onNextButtonClick: null,
  onQuestionBookMarkAreaClick: null,
  onQuestionDone: null,
  onQuestionMouseEnter: null,
  onRedoButtonClick: () => {},
  onReviewButtonClick: null,
  onStartButtonClick: null,
  onResumeButtonClick: null,
  onUserAnswer: null,
  options: {},
  questionsToDisplay: [],
  result: null,
  resultDetailActionProps: null,
  shouldDisplayCurrentQuestionAtTop: true,
  shouldFeedbackInstantly: false,
  shouldShowControlBackButton: false,
  shouldShowControlCheckButton: true,
  shouldShowControlFinishButton: false,
  shouldShowControlNextButton: true,
  shouldShowControlQuestions: true,
  shouldShowQuestionHelpText: true,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: false,
  shouldShowResultDetail: false,
  step: null,
};

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const progress = state.trackerProgress && state.trackerProgress[learnItemIid];

  const exercisesFromInfo = getFullExercisesWithQuestionInfoSelector(state)(
    learnItemIid,
  );
  const fullExercise = exercisesFromInfo && exercisesFromInfo[0];

  const navigationInfo =
    getNavigateInfoOfExerciseSelector(state)(learnItemIid) || {};
  const {
    currentQuestionUniqueId,
    previousQuestionUniqueId: questionUniqueIdWhenClickBack,
    nextQuestionUniqueId: questionUniqueIdWhenClickNext,
    introStickyUniqueId,
    uniqueIdsInQuestionGroup,
  } = navigationInfo;

  const [introSticky] = getQuestionsWithFullInfoFromUniqueIdsInExercises(
    exercisesFromInfo,
    [introStickyUniqueId],
  );

  const info = getLearnItemInfoSelector(state)(learnItemIid);
  const step = info && info.step;

  const isIntroStickyAudiosPlaying = info && info.isIntroStickyAudiosPlaying;

  let questionsToDisplay = [];

  if (step === steps.REVIEW) {
    questionsToDisplay = getQuestionsWithFullInfoFromUniqueIdsInExercises(
      exercisesFromInfo,
      'all',
      (question) => !isIntroSticky(question),
    );
  } else {
    questionsToDisplay = getQuestionsWithFullInfoFromUniqueIdsInExercises(
      exercisesFromInfo,
      uniqueIdsInQuestionGroup,
    );
  }

  let result = progress && progress.p;
  result = typeof result === 'undefined' ? info && info.result : result;

  const isAllQuestionAnswered = isAllQuestionAnsweredSelector(state)(
    learnItemIid,
  );

  const shouldShowResultDetail =
    info &&
    info.options &&
    info.options.can_fix_wrong_questions &&
    info.shouldShowResultDetail;

  return {
    currentQuestionUniqueId,
    exercise: fullExercise,
    form: String(learnItemIid),
    info,
    introSticky,
    isIntroStickyAudiosPlaying,
    learnItemIid,
    mode: info && info.mode,
    options: info && info.options,
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    questionsToDisplay,
    result,
    shouldDisplayCurrentQuestionAtTop:
      info && info.shouldDisplayCurrentQuestionAtTop,
    step,
    isAllQuestionAnswered,
    shouldShowResultDetail,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  checkAnswers: (itemIid, questionUniqueIds) => {
    dispatch(displayQuestionsCheckedResult(itemIid, questionUniqueIds));
  },
  showNextButton: (isClicked, itemIid) => {
    dispatch(saveItemInfo(itemIid, { isCheckButtonClicked: isClicked }));
  },
  setCurrentQuestion: (
    itemIid,
    questionUniqueId,
    shouldDisplayCurrentQuestionAtTop,
  ) => {
    dispatch(
      setCurrentQuestionInExerciseAction(
        itemIid,
        questionUniqueId,
        shouldDisplayCurrentQuestionAtTop,
      ),
    );
  },
  saveUserAnswer: (itemIid, questionUniqueId, take) => {
    dispatch(saveAnswer(itemIid, questionUniqueId, take));
  },
  saveItemInfo: (itemIid, info, shouldUpdate) => {
    dispatch(saveItemInfoAction(itemIid, info, shouldUpdate));
  },
  saveQuestionInfo: (itemIid, questionUniqueId, info) => {
    dispatch(saveItemQuestionInfoAction(itemIid, questionUniqueId, info));
  },
  startExercise: (itemIid) => {
    dispatch(startExerciseAction(itemIid));
  },
  resumeExercise: (itemIid) => {
    dispatch(resumeExerciseAction(itemIid));
  },
  redoExercise: (itemIid, info, questionUniqueId, wrongQuestionOnly) => {
    dispatch(
      redoExerciseAction(itemIid, info, questionUniqueId, wrongQuestionOnly),
    );
  },
  reviewExercise: (itemIid) => {
    dispatch(reviewExerciseAction(itemIid));
  },
  requestFinish: (itemIid) => {
    dispatch(finishExercise(itemIid));
  },
  retryQuestion: (itemIid, questionIid) => {
    dispatch(stopDisplayQuestionsCheckedResult(itemIid, questionIid));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const {
    info,
    learnItemIid,
    mode,
    options,
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    questionsToDisplay,
    step,
    isAllQuestionAnswered,
    currentQuestionUniqueId,
  } = stateProps;
  const {
    checkAnswers,
    redoExercise,
    requestFinish,
    reviewExercise,
    saveItemInfo,
    saveQuestionInfo,
    saveUserAnswer,
    setCurrentQuestion,
    startExercise,
    resumeExercise,
    showNextButton,
    retryQuestion,
  } = dispatchProps;
  const { onFinish, shouldFeedbackInstantly } = props;

  const isControlNextButtonEnabled = Boolean(questionUniqueIdWhenClickNext);
  const isControlBackButtonEnabled = Boolean(questionUniqueIdWhenClickBack);

  const shouldShowControlNextButton =
    isControlNextButtonEnabled || isControlBackButtonEnabled;
  const shouldShowControlFinishButton = true;
  const shouldShowControlCheckButton = true;
  const shouldShowControlBackButton =
    isControlNextButtonEnabled || isControlBackButtonEnabled;

  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onControlQuestionClick: (question) => {
      setCurrentQuestion(learnItemIid, question.uniqueId, true);
    },
    onQuestionMouseEnter: (question) => {
      setCurrentQuestion(learnItemIid, question.uniqueId, false);
    },
    onCheckAnswerButtonClick: () => {
      const questionUniqueIdsToCheck =
        questionsToDisplay &&
        questionsToDisplay.map((question) => question.uniqueId);
      showNextButton(true, learnItemIid);
      checkAnswers(learnItemIid, questionUniqueIdsToCheck);
    },
    onNextButtonClick: () => {
      showNextButton(false, learnItemIid);
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickNext);
    },
    onBackButtonClick: () => {
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickBack);
    },
    onUserAnswer: (question, take) => {
      saveUserAnswer(learnItemIid, question.uniqueId, take);
    },
    onComponentDidMount: () => {
      showNextButton(false, learnItemIid);
      saveItemInfo(learnItemIid, {
        status: statuses.DOING,
      });
    },
    onComponentDidUpdate: () => {
      saveItemInfo(learnItemIid, {
        isCheckButtonClicked: false,
      });
    },
    onQuestionBookMarkAreaClick: (question) => {
      saveQuestionInfo(learnItemIid, question.uniqueId, {
        isTicked: !question.isTicked,
      });
    },
    onFinish: () => {
      if (typeof onFinish === 'function') {
        onFinish();
      }
    },
    onStartButtonClick: () => {
      startExercise(learnItemIid);
    },
    onResumeButtonClick: () => {
      resumeExercise(learnItemIid);
    },
    onFinishButtonClick: () => {
      showNextButton(false, learnItemIid);
      requestFinish(learnItemIid);
    },
    onRedoButtonClick: () => {
      redoExercise(learnItemIid);
    },
    onReviewButtonClick:
      info && info.done
        ? () => {
            reviewExercise(learnItemIid);
          }
        : null,
    isControlBackButtonEnabled,
    isControlNextButtonEnabled,
    shouldShowControlNextButton,
    shouldShowControlFinishButton,
    shouldShowControlCheckButton: Boolean(options && options.can_review),
    shouldShowControlBackButton,
    ...(shouldFeedbackInstantly
      ? {
          onQuestionDone: (question) => {
            checkAnswers(learnItemIid, [question.uniqueId]);
          },
          shouldShowControlFinishButton: false,
          shouldShowControlCheckButton: false,
        }
      : {}),
    ...(options && options.question_sequence
      ? {
          isControlQuestionClickable: (question) =>
            Array.isArray(questionsToDisplay) &&
            questionsToDisplay.findIndex(
              (displayedQuestion) =>
                displayedQuestion &&
                question &&
                displayedQuestion.uniqueId === question.uniqueId,
            ) !== -1,
          onQuestionBookMarkAreaClick: null,
          shouldShowControlNextButton: Boolean(
            questionUniqueIdWhenClickNext &&
              questionsToDisplay &&
              questionsToDisplay.every(
                (question) => question.shouldDisplayCheckedResult,
              ),
          ),
          shouldShowControlCheckButton: Boolean(
            questionsToDisplay &&
              questionsToDisplay.some(
                (question) => !question.shouldDisplayCheckedResult,
              ),
          ),
          shouldShowControlFinishButton: Boolean(
            !questionUniqueIdWhenClickNext &&
              questionsToDisplay &&
              questionsToDisplay.every(
                (question) => question.shouldDisplayCheckedResult,
              ),
          ),
        }
      : {}),
    ...(options && options.only_show_finish_button_when_reach_last_question
      ? {
          onQuestionBookMarkAreaClick: null,
          isControlBackButtonEnabled: Boolean(questionUniqueIdWhenClickBack),
          shouldShowControlCheckButton: false,
          shouldShowControlFinishButton: Boolean(isAllQuestionAnswered),
        }
      : {}),
    ...(options && options.can_fix_wrong_questions
      ? {
          resultDetailActionProps: {
            onFixButtonClick: (question) => {
              if (question && question.uniqueId) {
                redoExercise(learnItemIid, null, question.uniqueId, true);
              }
            },
          },
        }
      : {}),
    ...(step === steps.REVIEW
      ? {
          isControlQuestionClickable: () => true,
          onQuestionBookMarkAreaClick: null,
          shouldShowControlNextButton: false,
          shouldShowControlBackButton: false,
          shouldShowControlCheckButton: false,
          shouldShowControlFinishButton: false,
        }
      : {}),
    ...(mode === modes.PREVIEW
      ? {
          onQuestionBookMarkAreaClick: null,
        }
      : {}),
    hasResultAction: mode !== modes.REVIEW,
    shouldShowQuestionLearningSuggestionWhenShowAnswer:
      options && options.show_suggestion_after_questions,
    onRetryButtonClick: () => {
      saveItemInfo(learnItemIid, {
        isCheckButtonClicked: false,
      });
      retryQuestion(learnItemIid, [currentQuestionUniqueId]);
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(reduxForm({})(NormalExercise)),
);
