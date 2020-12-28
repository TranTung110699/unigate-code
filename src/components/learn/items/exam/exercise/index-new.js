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
import './stylesheet.scss';
import { secondsToTimeString } from 'common/utils/Date';
import Card from 'antd/lib/card';
import Avatar from 'antd/lib/avatar';
import ChangeStyle from './change-style';
import Statistic from 'antd/lib/statistic';
import Affix from 'antd/lib/affix';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';

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
      drawerVisible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  componentDidMount() {
    const { onComponentDidMount } = this.props;
    this.updateHeightOfElementsToState();
    if (typeof onComponentDidMount === 'function') {
      onComponentDidMount();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.autoScroll) {
      this.setState(
        () => ({ autoScroll: true }),
        () => {
          document
            .getElementById('exercise-container')
            .scrollIntoView({ behavior: 'smooth' });
        },
      );
    }
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
        bigPrompt={t3('you_will_not_be_able_to_continue_the_exam!')}
        prompt={t3('are_you_sure_you_want_to_finish_the_exam?')}
        acceptMessage={t3('finish')}
        cancelMessage={t3('cancel')}
        iconDisplay="exclamation-circle"
        iconClassName="info"
        bigPromptClassName="info"
        onCancelButtonClick={this.closeDialog}
        onAcceptButtonClick={typeof onFinish === 'function' ? onFinish : null}
        antIcon
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
          isIntroSticky
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
        // maxHeight={maxHeight}
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
        <div className={`col-sm-2 ${this.cssClass}__duration`}>
          {timeLeft && <Icon icon="time" />}
          {timeLeft}
        </div>
        <div
          className={`col-sm-1 ${this.cssClass}__question-group-time-left`}
          style={{ color: 'red' }}
        >
          {questionGroupTimeLeftInSeconds ? (
            <React.Fragment>
              <Icon icon="time" />
              {secondsToTimeString(questionGroupTimeLeftInSeconds)}
            </React.Fragment>
          ) : null}
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
      userInfo,
      theme,
      fontSize,
      skjdflsdji,
    } = this.props;

    const mode = this.props.mode || modes.NORMAL;

    const { mainTop, mainBottom, menuTop } = this.getDisplayedElements();
    const totalOfQuestions = this.getTotalOfQuestions(exercises);

    const avatarProps = userInfo.avatar ? { src: userInfo.avatar } : {};

    const rightContentRender = (
      <>
        {mode !== modes.PREVIEW_TEST && (
          <Card size="small">
            <div className="row align-items-center">
              <div className="col-md-6 p-10 col-sm-12 exercise-timer">
                {skjdflsdji ? (
                  <>
                    <div>
                      <strong>{t1('question_timer')}</strong>
                      <div className="time-left">
                        {secondsToTimeString(questionGroupTimeLeftInSeconds)}
                      </div>
                    </div>

                    <span style={{ fontSize: 14 }}>
                      {t1('exercise_timer')}: {timeLeft}
                    </span>
                  </>
                ) : (
                  <div className="time-left">
                    <strong>{t1('exercise_timer')}</strong>
                    {timeLeft}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-sm-12">
                <DownloadReduxLog mode="nav" />
                <FinishButtons
                  onFinishButtonOnClick={this.handleFinishButtonClick}
                  totalOfQuestions={totalOfQuestions}
                  shouldShowControlFinishButton={shouldShowControlFinishButton}
                  className="m-t-20"
                />
              </div>
            </div>
          </Card>
        )}
        <div
          className={`${this.cssClass}__menu m-t-10 flex-grow-1`}
          ref={(el) => {
            this.menuElement = el;
          }}
        >
          {typeof menuTop === 'function' && (
            <div className={`${this.cssClass}__menu-top`}>
              {menuTop({
                // maxHeight: (this.state.menuElementHeight * 40) / 100,
              })}
            </div>
          )}
          <Card size="small" className="flex-grow-1 exercise-navbar">
            <Nav
              learnItemIid={learnItemIid}
              // maxHeight={this.getElementHeightByRef(this.menuElement)}
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
          </Card>
          <Card size="small" className="m-t-10">
            <ChangeStyle />
          </Card>
          <Card size="small" className="m-t-10">
            <div className="d-flex">
              <div>
                <Avatar
                  {...avatarProps}
                  shape="square"
                  size={128}
                  style={{ fontSize: 80 }}
                >
                  {avatarProps.length ? null : initials(userInfo.name)}
                </Avatar>
              </div>
              <div className="m-l-20">
                <h2 className="m-b-5">{userInfo.name}</h2>
                {mode === modes.PREVIEW_TEST && (
                  <>
                    <strong>
                      <em>{userInfo.code}</em>
                    </strong>
                    <div className="m-t-20">
                      <div>
                        {userInfo.position_names &&
                          userInfo.position_names.length &&
                          userInfo.position_names.join(', ')}
                      </div>
                      <div>
                        {userInfo.organizations &&
                          userInfo.organizations.length &&
                          userInfo.organizations.map((org) => org.name)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </>
    );

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__body`}>
          <div className="h-100">
            <div className="row h-100" id="exercise-container">
              <div
                className={`col-md-9 col-sm-12 p-0 ${
                  this.cssClass
                }__body-group`}
              >
                <div
                  className={`${this.cssClass}__main exercise-theme-${theme}`}
                  ref={(el) => {
                    this.mainElement = el;
                  }}
                >
                  <div
                    className="d-flex"
                    style={{
                      flexDirection: 'column',
                      height: `calc(100% - ${this.getElementHeightByRef(
                        this.bottomButton,
                      ) || 65}px)`,
                      padding: '20px 20px 0 20px',
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
                        className={`${this.cssClass}__main-bottom ${
                          typeof mainTop === 'function' ? 'p-l-20' : ''
                        }`}
                        ref={(el) => {
                          this.mainBottomElement = el;
                        }}
                        style={{
                          flexGrow: 1,
                        }}
                      >
                        {mainBottom({
                          // maxHeight: this.state.mainBottomElementHeight,
                        })}
                      </div>
                    )}
                  </div>
                  {!this.props.isShowSaveQuestionOnly ? (
                    <Affix
                      offsetBottom={0}
                      ref={(ref) => (this.bottomButton = ref)}
                    >
                      <NavButtons
                        isBackButtonDisabled={!isControlBackButtonEnabled}
                        isNextButtonDisabled={!isControlNextButtonEnabled}
                        shouldShowBackButton={shouldShowControlBackButton}
                        onNextButtonClick={this.handleNextButtonClick}
                        onBackButtonClick={this.handleBackButtonClick}
                        shouldShowControlFinishButton={
                          shouldShowControlFinishButton
                        }
                        totalOfQuestions={totalOfQuestions}
                        timer={<Statistic value={timeLeft || '...'} />}
                      />
                    </Affix>
                  ) : null}
                </div>
              </div>
              <Affix
                offsetTop={50}
                style={{ position: 'absolute', right: 0, top: 50 }}
              >
                <Button
                  icon="menu"
                  style={{
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    width: 48,
                    height: 48,
                    fontSize: 24,
                  }}
                  onClick={this.showDrawer}
                  className="exercise-hamburger-button"
                />
                <Drawer
                  placement="right"
                  closable
                  onClose={this.onClose}
                  visible={this.state.drawerVisible}
                  getContainer={false}
                  // style={{ position: 'absolute' }}
                  className="exercise-drawer-container"
                  title={t1('contests')}
                >
                  {rightContentRender}
                </Drawer>
              </Affix>
              <div
                className={`col-sm-3 p-0 ${this.cssClass}__body-group ${
                  this.cssClass
                }__body-nav exercise-menu-right`}
              >
                {rightContentRender}
              </div>
              {this.state.dialogContent && (
                <div className={`${this.cssClass}__dialog`}>
                  {this.state.dialogContent}
                </div>
              )}
            </div>
          </div>
        </div>
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
  theme: PropTypes.string,
  fontSize: PropTypes.number,
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
  theme: 'light',
  fontSize: 14,
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

  const skjdflsdji = doExamUseLimitQuestionGroupTimeFlow(info);

  return {
    skjdflsdji,
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
    userInfo: state.user && state.user.info,
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
    theme: lodashGet(state, 'user.UIConfig.exerciseTheme'),
    fontSize: lodashGet(state, 'user.UIConfig.exerciseFontSize'),
    isShowSaveQuestionOnly: lodashGet(
      state,
      'learn.isShowSaveQuestionOnly',
      false,
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
    skjdflsdji,
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
    ...(skjdflsdji
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
