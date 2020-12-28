import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import {
  saveAnswer,
  saveItemInfo as saveItemInfoAction,
  saveItemQuestionAudioStatus as saveItemQuestionAudioStatusAction,
  saveItemQuestionInfo as saveItemQuestionInfoAction,
} from 'actions/learn';
import {
  exerciseIntroStickyMediaFinishPlaying,
  finishExercise,
  setCurrentQuestionInExercise as setCurrentQuestionInExerciseAction,
} from 'actions/learn/exercise/normal/saga-creators';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getLearnItemInfoSelector } from 'common/learn';
import { audioStatuses } from 'common/learn/Question';
import {
  buildExerciseStructureFromExercisesSelector,
  checkShowControlFinishButton,
  getFullExercisesWithQuestionInfoSelector,
  getListeningNavigateInfoOfExerciseSelector,
  getNavigateInfoOfExerciseSelector,
  getNavigateInfoOfQuestionInExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercises,
  isToeicListeningExercise,
  isToeicTest,
  modes,
  statuses,
} from 'common/learn/exercise';
import { doExamUseLimitQuestionGroupTimeFlow } from 'common/learn/exercise/exam';
import NormalExerciseDisplay from 'components/learn/items/exercise/NormalExercise/display';
import Icon from 'components/common/Icon';
import { t1, t3 } from 'translate';
import { withRouter } from 'react-router-dom';
import Question from 'components/common/forms/questions';
import { Scrollbars } from 'react-custom-scrollbars';
import { findDOMNode } from 'react-dom';

import Confirm from 'components/learn/common/confirm';
import { initials } from 'common/utils/string';
import DetectNetworkAvailable from 'components/common/detect-network-availability/index';
import userImage from './resources/user.png';
import FinishButtons from './buttons/finish';
import NavButtons from './buttons/nav';
import Nav from './nav';
import Listening from './listening';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import SubmitFailedDialog from '../submission/SubmitFailedDialog';
import DownloadReduxLog from 'components/learn/items/exam/submission/DownloadReduxLog';
import { isSmallScreen } from 'common';
import './stylesheet.scss';
import { secondsToTimeString } from 'common/utils/Date';

class ExerciseExamItem extends React.Component {
  cssClass = 'learn-exercise-exam';

  constructor(props) {
    super(props);
    this.state = {
      dialogContent: null,
      mainElementHeight: 0,
      mainBottomElementHeight: 0,
      menuElementHeight: 0,
      closedLoadingPopup: false,
      openedLoadingPopup: false,
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
    if (
      lodashGet(prevProps, 'info.submitError') !=
      lodashGet(this.props, 'info.submitError')
    ) {
      // user has submitted exam but failed
      const { info, learnItemIid } = this.props;
      this.openDialog(
        <SubmitFailedDialog
          submitError={lodashGet(this.props, 'info.submitError')}
          info={info}
          learnItemIid={learnItemIid}
        />,
      );
    }
  }

  getElementHeightByRef = (ref) => {
    const node = findDOMNode(ref);
    return node ? node.getBoundingClientRect().height : 0;
  };

  updateHeightOfElementsToState = () => {
    const {
      mainElementHeight,
      mainBottomElementHeight,
      menuElementHeight,
    } = this.state;
    const newMainElementHeight = this.getElementHeightByRef(this.mainElement);
    const newMainBottomElementHeight = this.getElementHeightByRef(
      this.mainBottomElement,
    );
    const newMenuElementHeight = this.getElementHeightByRef(this.menuElement);

    if (
      mainElementHeight !== newMainElementHeight ||
      mainBottomElementHeight !== newMainBottomElementHeight ||
      menuElementHeight !== newMenuElementHeight
    ) {
      this.setState({
        mainElementHeight: newMainElementHeight,
        mainBottomElementHeight: newMainBottomElementHeight,
        menuElementHeight: newMenuElementHeight,
      });
    }
  };

  openDialog = (content) => {
    this.setState({
      dialogContent: content,
    });
  };

  closeDialog = () => {
    this.setState({
      dialogContent: null,
    });
  };

  handleFinishButtonClick = () => {
    const { onFinish } = this.props;
    this.openDialog(
      <Confirm
        bigPrompt={t3('you_will_not_be_able_to_continue_the_exam?')}
        prompt={t3('are_you_sure_you_want_to_finish_the_exam?')}
        acceptMessage={t3('finish')}
        cancelMessage={t3('cancel')}
        iconDisplay="alert"
        iconClassName="red"
        bigPromptClassName="red"
        onCancelButtonClick={this.closeDialog}
        onAcceptButtonClick={typeof onFinish === 'function' ? onFinish : null}
      />,
    );
  };

  getIntroStickyElement = (params) => {
    const {
      introSticky,
      isIntroStickyAudiosPlaying,
      isIntroStickyAudiosControllable,
    } = this.props;
    if (!introSticky) {
      return null;
    }

    const { maxHeight } = params || {};

    let scrollbarsProps = {};
    if (maxHeight) {
      scrollbarsProps = {
        ...scrollbarsProps,
        autoHeight: true,
        autoHeightMax: maxHeight,
      };
    }

    return (
      <Scrollbars
        {...scrollbarsProps}
        className={`${this.cssClass}__intro-sticky`}
      >
        <Question
          isContentAudiosControllable={isIntroStickyAudiosControllable}
          question={introSticky}
          shouldShowQuestionHelpText={false}
          isContentAudiosPlaying={isIntroStickyAudiosPlaying}
          onContentAudiosEnded={this.handleIntroStickyAudiosEnded}
          shouldShowQuestionIdWhenShowAnswer={false}
        />
      </Scrollbars>
    );
  };

  getQuestionsDisplayElement = (params) => {
    const {
      courseIid,
      currentQuestionUniqueId,
      isQuestionContentAudioControllable,
      questionsToDisplay,
      shouldDisplayCurrentQuestionAtTop,
      options,
    } = this.props;

    const { maxHeight } = params || {};

    return (
      <NormalExerciseDisplay
        maxHeight={maxHeight}
        className={`${this.cssClass}__questions-display`}
        questions={questionsToDisplay}
        options={options}
        currentQuestionUniqueId={currentQuestionUniqueId}
        courseIid={courseIid}
        handleUserAnswer={this.handleUserAnswer}
        onQuestionMouseEnter={this.handleQuestionMouseEnter}
        isQuestionContentAudioControllable={
          this.checkIfQuestionContentAudioIsControllable
        }
        onQuestionContentAudioPlay={this.handleQuestionContentAudioPlay}
        onQuestionContentAudioEnded={this.handleQuestionContentAudioEnded}
        shouldDisplayCurrentQuestionAtTop={shouldDisplayCurrentQuestionAtTop}
        onQuestionBookMarkAreaClick={this.handleQuestionBookMarkAreaClick}
        questionMode="exam"
      />
    );
  };

  getDisplayedElements = () => {
    const { introSticky } = this.props;

    if (!introSticky) {
      return {
        mainBottom: this.getQuestionsDisplayElement,
      };
    }

    switch (introSticky.intro_sticky_position) {
      case 'top': {
        return {
          mainTop: this.getIntroStickyElement,
          mainBottom: this.getQuestionsDisplayElement,
        };
      }
      case 'right': {
        return {
          mainBottom: this.getQuestionsDisplayElement,
          menuTop: this.getIntroStickyElement,
        };
      }
      case 'left': {
        return {
          mainBottom: this.getIntroStickyElement,
          menuTop: this.getQuestionsDisplayElement,
        };
      }
      default: {
        return {
          mainTop: this.getIntroStickyElement,
          mainBottom: this.getQuestionsDisplayElement,
        };
      }
    }
  };

  getTotalOfQuestions = (exercises) => {
    let totalOfQuestions = 0;
    exercises &&
      exercises.forEach((exercise) => {
        if (exercise && exercise.children) {
          exercise.children.forEach((question) => {
            if (
              question &&
              question.type &&
              question.type !== questionTypes.TYPE_INTRODUCTION
            ) {
              totalOfQuestions++;
            }
          });
        }
      });

    return totalOfQuestions;
  };

  renderHeaderForWeb = ({
    name,
    timeLeft,
    userName,
    questionGroupTimeLeftInSeconds,
  }) => (
    <div className="container exam-exercise-for-web">
      <div className="row">
        <div className={`col-sm-3 ${this.cssClass}__name`}>
          <Icon icon="exam_doing" />
          {name}
        </div>
        <div className="col-sm-2">
          <DetectNetworkAvailable />
        </div>
        <div
          className={`col-sm-2 ${this.cssClass}__question-group-time-left`}
          style={{ color: 'red' }}
        >
          {questionGroupTimeLeftInSeconds ? (
            <React.Fragment>
              {t1('question_timer')} <Icon icon="time" />
              {secondsToTimeString(questionGroupTimeLeftInSeconds)}
            </React.Fragment>
          ) : null}
        </div>
        <div className={`col-sm-1 ${this.cssClass}__duration`}>
          {timeLeft && <Icon icon="time" />}
          {timeLeft}
        </div>
        <div className={`col-sm-4 ${this.cssClass}__user`}>
          {userName}
          <img src={userImage} alt="user" />
        </div>
      </div>
    </div>
  );

  renderHeaderForMobile = (name, timeLeft, userName) => (
    <div className="container exam-exercise-for-mobile">
      <div className="container-left">
        <div className={`${this.cssClass}__name`}>
          <Icon icon="exam_doing" />
          {name}
        </div>
        <DetectNetworkAvailable />
        <div className={`${this.cssClass}__duration`}>
          {timeLeft && <Icon icon="time" />}
          {timeLeft}
        </div>
      </div>
      <div className={`container-right ${this.cssClass}__user`}>
        {initials(userName)}
        <img src={userImage} alt="user" />
      </div>
    </div>
  );

  handleIntroStickyAudiosEnded = (...params) =>
    this.props.onIntroStickyAudiosEnded(...params);
  handleUserAnswer = (...params) => this.props.onUserAnswer(...params);
  handleQuestionMouseEnter = (...params) =>
    this.props.onQuestionMouseEnter(...params);
  handleQuestionContentAudioPlay = (...params) =>
    this.props.onQuestionContentAudioPlay(...params);
  handleQuestionContentAudioEnded = (...params) =>
    this.props.onQuestionContentAudioEnded(...params);
  handleQuestionBookMarkAreaClick = (...params) =>
    this.props.onQuestionBookMarkAreaClick(...params);
  handleNextButtonClick = (...params) =>
    this.props.onNextButtonClick(...params);
  handleBackButtonClick = (...params) =>
    this.props.onBackButtonClick(...params);
  handleControlQuestionClick = (...params) =>
    this.props.onControlQuestionClick(...params);
  checkIfQuestionContentAudioIsControllable = (...params) =>
    this.props.isQuestionContentAudioControllable(...params);

  handleQuestionAudioPlay = (audioIndex) => {
    const { currentListeningQuestion, onQuestionContentAudioPlay } = this.props;
    return onQuestionContentAudioPlay(currentListeningQuestion, audioIndex);
  };

  handleQuestionAudioEnded = (audioIndex) => {
    const {
      currentListeningQuestion,
      onQuestionContentAudioEnded,
    } = this.props;
    return onQuestionContentAudioEnded(currentListeningQuestion, audioIndex);
  };

  render() {
    const {
      currentListeningQuestion,
      currentListeningQuestionUniqueIdForNav,
      currentQuestionUniqueId,
      exercises,
      isControlBackButtonEnabled,
      isControlNextButtonEnabled,
      isControlQuestionClickable,
      learnItemIid,
      // mode,
      name,
      shouldShowControlFinishButton,
      shouldShowControlBackButton,
      timeLeft,
      userName,
      isControlExerciseClickable,
      questionGroupTimeLeftInSeconds,
    } = this.props;

    const mode = this.props.mode || modes.NORMAL;

    const { mainTop, mainBottom, menuTop } = this.getDisplayedElements();
    const totalOfQuestions = this.getTotalOfQuestions(exercises);

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__header`}>
          {this.renderHeaderForWeb({
            name,
            timeLeft,
            userName,
            questionGroupTimeLeftInSeconds,
          })}
          {this.renderHeaderForMobile(name, timeLeft, userName)}
        </div>
        <div className={`${this.cssClass}__body`}>
          <div className="container">
            <div className="row">
              <div className={`col-sm-8 ${this.cssClass}__body-group`}>
                <div
                  className={`${this.cssClass}__main`}
                  ref={(el) => {
                    this.mainElement = el;
                  }}
                >
                  {currentListeningQuestion && (
                    <Listening
                      className={`${this.cssClass}__main-listening`}
                      currentQuestion={currentListeningQuestion}
                      onQuestionAudioPlay={this.handleQuestionAudioPlay}
                      onQuestionAudioEnded={this.handleQuestionAudioEnded}
                    />
                  )}
                  {typeof mainTop === 'function' && (
                    <div className={`${this.cssClass}__main-top`}>
                      {mainTop({
                        maxHeight: (this.state.mainElementHeight * 30) / 100,
                      })}
                    </div>
                  )}
                  {typeof mainBottom === 'function' && (
                    <div
                      className={`${this.cssClass}__main-bottom`}
                      ref={(el) => {
                        this.mainBottomElement = el;
                      }}
                    >
                      {mainBottom({
                        maxHeight: this.state.mainBottomElementHeight,
                      })}
                    </div>
                  )}
                  <div className={`${this.cssClass}__main-footer`}>
                    <NavButtons
                      isBackButtonDisabled={!isControlBackButtonEnabled}
                      shouldShowBackButton={shouldShowControlBackButton}
                      isNextButtonDisabled={!isControlNextButtonEnabled}
                      onNextButtonClick={this.handleNextButtonClick}
                      onBackButtonClick={this.handleBackButtonClick}
                      shouldShowControlFinishButton={
                        shouldShowControlFinishButton
                      }
                      finishButtonClick={this.handleFinishButtonClick}
                      totalOfQuestions={totalOfQuestions}
                      showSubmitButton={isSmallScreen}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`col-sm-4 ${this.cssClass}__body-group ${
                  this.cssClass
                }__body-nav `}
              >
                <div
                  className={`${this.cssClass}__menu`}
                  ref={(el) => {
                    this.menuElement = el;
                  }}
                >
                  {typeof menuTop === 'function' && (
                    <div className={`${this.cssClass}__menu-top`}>
                      {menuTop({
                        maxHeight: (this.state.menuElementHeight * 40) / 100,
                      })}
                    </div>
                  )}
                  <div className={`${this.cssClass}__nav`}>
                    <Nav
                      learnItemIid={learnItemIid}
                      maxHeight={
                        typeof menuTop === 'function'
                          ? (this.state.menuElementHeight * 40) / 100
                          : (this.state.menuElementHeight * 80) / 100
                      }
                      exercises={exercises}
                      onQuestionClick={this.handleControlQuestionClick}
                      isQuestionClickable={isControlQuestionClickable}
                      currentQuestionUniqueId={currentQuestionUniqueId}
                      currentListeningQuestionUniqueId={
                        currentListeningQuestionUniqueIdForNav
                      }
                      mode={mode}
                      isExerciseClickable={isControlExerciseClickable}
                    />
                  </div>
                  {!isSmallScreen && (
                    <div className={`${this.cssClass}__buttons`}>
                      <FinishButtons
                        onFinishButtonOnClick={this.handleFinishButtonClick}
                        totalOfQuestions={totalOfQuestions}
                        shouldShowControlFinishButton={
                          shouldShowControlFinishButton
                        }
                      />
                    </div>
                  )}
                  {mode !== modes.PREVIEW && mode !== modes.PREVIEW_TEST && (
                    <div className={`${this.cssClass}__buttons`}>
                      <DownloadReduxLog mode="nav" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.dialogContent && (
          <div className={`${this.cssClass}__dialog`}>
            {this.state.dialogContent}
          </div>
        )}
      </div>
    );
  }
}

ExerciseExamItem.propTypes = {
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentListeningQuestion: PropTypes.shape(),
  currentListeningQuestionUniqueIdForNav: PropTypes.string,
  currentQuestionUniqueId: PropTypes.string,
  exercises: PropTypes.arrayOf(PropTypes.shape()),
  introSticky: PropTypes.shape(),
  isControlBackButtonEnabled: PropTypes.bool,
  isControlNextButtonEnabled: PropTypes.bool,
  isControlExerciseClickable: PropTypes.func,
  isControlQuestionClickable: PropTypes.func,
  isIntroStickyAudiosControllable: PropTypes.bool,
  isIntroStickyAudiosPlaying: PropTypes.bool,
  isQuestionContentAudioControllable: PropTypes.func,
  learnItemIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode: PropTypes.string,
  name: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  onControlQuestionClick: PropTypes.func,
  onIntroStickyAudiosEnded: PropTypes.func,
  onNextButtonClick: PropTypes.func,
  onQuestionBookMarkAreaClick: PropTypes.func,
  onQuestionContentAudioEnded: PropTypes.func,
  onQuestionContentAudioPlay: PropTypes.func,
  onQuestionMouseEnter: PropTypes.func,
  onUserAnswer: PropTypes.func,
  questionsToDisplay: PropTypes.arrayOf(PropTypes.shape()),
  shouldDisplayCurrentQuestionAtTop: PropTypes.bool,
  shouldShowControlFinishButton: PropTypes.bool,
  shouldShowControlBackButton: PropTypes.bool,
  timeLeft: PropTypes.string,
  userName: PropTypes.string,
};

ExerciseExamItem.defaultProps = {
  courseIid: null,
  currentListeningQuestion: null,
  currentListeningQuestionUniqueIdForNav: null,
  currentQuestionUniqueId: null,
  exercises: [],
  introSticky: null,
  isControlBackButtonEnabled: false,
  isControlNextButtonEnabled: false,
  isControlExerciseClickable: null,
  isControlQuestionClickable: null,
  isIntroStickyAudiosControllable: true,
  isIntroStickyAudiosPlaying: false,
  isQuestionContentAudioControllable: () => true,
  learnItemIid: null,
  // mode: modes.NORMAL,
  name: null,
  onBackButtonClick: null,
  onControlQuestionClick: null,
  onIntroStickyAudiosEnded: null,
  onNextButtonClick: null,
  onQuestionBookMarkAreaClick: null,
  onQuestionContentAudioEnded: null,
  onQuestionContentAudioPlay: null,
  onQuestionMouseEnter: null,
  onUserAnswer: null,
  questionsToDisplay: [],
  shouldDisplayCurrentQuestionAtTop: true,
  shouldShowControlFinishButton: true,
  shouldShowControlBackButton: true,
  timeLeft: null,
  userName: null,
};

const getQuestionUniqueId = (question) => question && question.iid;

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const exerciseIids = props.exercises;
  const info = getLearnItemInfoSelector(state)(learnItemIid);
  const options = info && info.options;

  const exercises = getFullExercisesWithQuestionInfoSelector(state)(
    learnItemIid,
  );

  let introSticky = null;
  let currentQuestionUniqueId = null;
  let currentListeningQuestionUniqueIdForNav = null;
  let currentListeningQuestion = null;
  let questionsToDisplay = [];
  let builtStructure = null;

  let questionUniqueIdWhenClickBack = null;
  let questionUniqueIdWhenClickNext = null;
  let shouldShowControlFinishButton = true;
  if (!exercises) {
    builtStructure = buildExerciseStructureFromExercisesSelector(state)(
      exerciseIids,
      getQuestionUniqueId,
      info,
    );
  } else {
    const navigationInfo =
      getNavigateInfoOfExerciseSelector(state)(learnItemIid) || {};
    ({ currentQuestionUniqueId } = navigationInfo);

    const { introStickyUniqueId, uniqueIdsInQuestionGroup } = navigationInfo;

    questionUniqueIdWhenClickBack = navigationInfo.previousQuestionUniqueId;
    questionUniqueIdWhenClickNext = navigationInfo.nextQuestionUniqueId;

    [introSticky] = getQuestionsWithFullInfoFromUniqueIdsInExercises(
      exercises,
      [introStickyUniqueId],
    );

    questionsToDisplay = getQuestionsWithFullInfoFromUniqueIdsInExercises(
      exercises,
      uniqueIdsInQuestionGroup,
    );
    shouldShowControlFinishButton = checkShowControlFinishButton(exercises);

    const {
      currentQuestionUniqueId: currentListeningQuestionUniqueId,
    } = getListeningNavigateInfoOfExerciseSelector(state)(learnItemIid);
    if (currentListeningQuestionUniqueId) {
      [
        currentListeningQuestion,
      ] = getQuestionsWithFullInfoFromUniqueIdsInExercises(exercises, [
        currentListeningQuestionUniqueId,
      ]);
      const navigateInfoOfCurrentListeningQuestion = getNavigateInfoOfQuestionInExerciseSelector(
        state,
      )(learnItemIid, currentListeningQuestionUniqueId, true);
      ({
        currentQuestionUniqueId: currentListeningQuestionUniqueIdForNav,
      } = navigateInfoOfCurrentListeningQuestion);
    }
  }

  const timeLeft = info && info.timeLeft;
  const duration = info && info.duration;
  const questionGroupTimeLeftInSeconds =
    info && info.questionGroupTimeLeftInSeconds;

  return {
    currentQuestionUniqueId,
    currentListeningQuestionUniqueIdForNav,
    currentListeningQuestion,
    exercises,
    info,
    introSticky,
    isIntroStickyAudiosPlaying: info && info.isIntroStickyAudiosPlaying,
    learnItemIid,
    mode: info && info.mode,
    name: info && info.name,
    options,
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    questionsToDisplay,
    shouldDisplayCurrentQuestionAtTop:
      info && info.shouldDisplayCurrentQuestionAtTop,
    timeLeft,
    duration,
    questionGroupTimeLeftInSeconds,
    builtStructure,
    userName: state.user && state.user.info && state.user.info.name,
    shouldShowControlFinishButton:
      info && info.mode === modes.PREVIEW
        ? false
        : shouldShowControlFinishButton,
    getNavigateInfoOfQuestion: (itemIid, questionUniqueId) =>
      getNavigateInfoOfQuestionInExerciseSelector(state)(
        itemIid,
        questionUniqueId,
        false,
      ),
    getFullQuestionsInfo: (itemIid, questionUniqueIds, condition) =>
      getQuestionsWithFullInfoFromUniqueIdsInExercises(
        exercises,
        questionUniqueIds,
        condition,
      ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUserAnswer: (itemIid, uniqueId, take) => {
    dispatch(saveAnswer(itemIid, uniqueId, take));
  },
  saveItemInfo: (itemIid, info, shouldUpdate) => {
    dispatch(saveItemInfoAction(itemIid, info, shouldUpdate));
  },
  saveQuestionInfo: (itemIid, questionUniqueId, info) => {
    dispatch(saveItemQuestionInfoAction(itemIid, questionUniqueId, info));
  },
  saveQuestionAudioStatus: (itemIid, questionUniqueId, audioIndex, status) => {
    dispatch(
      saveItemQuestionAudioStatusAction(
        itemIid,
        questionUniqueId,
        audioIndex,
        status,
      ),
    );
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
  notifyIntroStickyMediaHasFinishPlaying: (itemIid) => {
    dispatch(exerciseIntroStickyMediaFinishPlaying(itemIid));
  },
  requestFinish: (itemIid) => {
    dispatch(finishExercise(itemIid));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const {
    builtStructure,
    getFullQuestionsInfo,
    info,
    learnItemIid,
    mode,
    options,
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    shouldShowControlFinishButton,
  } = stateProps;
  const {
    notifyIntroStickyMediaHasFinishPlaying,
    requestFinish,
    saveItemInfo,
    saveQuestionInfo,
    saveUserAnswer,
    setCurrentQuestion,
    saveQuestionAudioStatus,
  } = dispatchProps;

  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onUserAnswer: (question, take) => {
      saveUserAnswer(learnItemIid, question.uniqueId, take);
    },
    isControlBackButtonEnabled: Boolean(questionUniqueIdWhenClickBack),
    isControlNextButtonEnabled: Boolean(questionUniqueIdWhenClickNext),
    onNextButtonClick: () => {
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickNext);
    },
    onBackButtonClick: () => {
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickBack);
    },
    onComponentDidMount: () => {
      saveItemInfo(
        learnItemIid,
        Object.assign({ status: statuses.DOING }, builtStructure),
      );
    },
    onQuestionBookMarkAreaClick: (question) => {
      saveQuestionInfo(learnItemIid, question.uniqueId, {
        isTicked: !question.isTicked,
      });
    },
    onControlQuestionClick: (question) => {
      setCurrentQuestion(learnItemIid, question.uniqueId, true);
    },
    onQuestionMouseEnter: (question) => {
      setCurrentQuestion(learnItemIid, question.uniqueId, false);
    },
    onFinish: () => {
      requestFinish(learnItemIid);
    },
    shouldShowControlFinishButton,
    onIntroStickyAudiosEnded: () => {
      notifyIntroStickyMediaHasFinishPlaying(learnItemIid);
    },
    onQuestionContentAudioPlay: (question, audioIndex) => {
      saveQuestionAudioStatus(
        learnItemIid,
        question.uniqueId,
        audioIndex,
        audioStatuses.PLAYED,
      );
    },
    onQuestionContentAudioEnded: (question, audioIndex) => {
      saveQuestionAudioStatus(
        learnItemIid,
        question.uniqueId,
        audioIndex,
        audioStatuses.FINISHED,
      );
    },
    ...(mode === modes.PREVIEW_TEST
      ? {
          onQuestionBookMarkAreaClick: null,
          shouldShowControlFinishButton: false,
        }
      : {}),
    ...(options && options.disable_intro_sticky_audio_control
      ? {
          isIntroStickyAudiosControllable: false,
        }
      : {}),
    ...(options && options.disable_question_audio_replay
      ? {
          isQuestionContentAudioControllable: (question, audioIndex) =>
            !(
              question.audiosInfo &&
              question.audiosInfo[audioIndex] &&
              question.audiosInfo[audioIndex].status
            ),
        }
      : {}),
    ...(isToeicTest(info)
      ? {
          isControlNextButtonEnabled: Boolean(
            (() => {
              if (!questionUniqueIdWhenClickNext) {
                return false;
              }
              const [nextQuestion] = getFullQuestionsInfo(learnItemIid, [
                questionUniqueIdWhenClickNext,
              ]);
              if (!nextQuestion) {
                return false;
              }
              return (
                nextQuestion.is_toeic_listening ||
                (info && info.isToeicListeningFinish)
              );
            })(),
          ),
          isControlExerciseClickable: (exercise) =>
            isToeicListeningExercise(exercise)
              ? true
              : info && info.isToeicListeningFinish,
        }
      : {}),
    ...(doExamUseLimitQuestionGroupTimeFlow(info)
      ? {
          shouldShowControlBackButton: false,
          isControlQuestionClickable: () => false,
        }
      : {}),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(
    reduxForm({
      form: 'exam',
    })(ExerciseExamItem),
  ),
);
