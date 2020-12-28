import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, reduxForm } from 'redux-form';
import {
  saveAnswer,
  saveItemInfo as saveItemInfoAction,
  saveItemQuestionInfo as saveItemQuestionInfoAction,
} from 'actions/learn';
import {
  setCurrentQuestionInExercise as setCurrentQuestionInExerciseAction,
  submitSurvey as submitSurveyAction,
} from 'actions/learn/exercise/normal/saga-creators';
import { Redirect, withRouter } from 'react-router-dom';
import {
  getFullExercisesWithQuestionInfoSelector,
  getNavigateInfoOfExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercises,
  modes,
  steps,
} from 'common/learn/exercise';
import Question from 'components/common/forms/questions';
import { getLearnItemInfoSelector } from 'common/learn';
import { Scrollbars } from 'react-custom-scrollbars';
import { findDOMNode } from 'react-dom';
import Icon from 'components/common/Icon';
import NormalExerciseDisplay from 'components/learn/items/exercise/NormalExercise/display';
import NormalExerciseControl from 'components/learn/items/exercise/NormalExercise/control';
import lodashGet from 'lodash.get';
import Rating from 'schema-form/elements/rating/index';
import { t1 } from 'translate';
import TextField from 'schema-form/elements/text/TextField';
import SurveyFinished from './finished';
import './content.scss';

export class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementHeight: 0,
      rate: -1, // TODO get data tu form
    };
  }

  componentDidMount() {
    this.updateHeightOfElementsToState();
  }

  componentDidUpdate() {
    this.updateHeightOfElementsToState();
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

  cssClass = 'survey';

  handleChangeRating = (rate) => {
    this.setState({ rate });
    const { dispatch, form } = this.props;
    dispatch(change(form, 'rating', rate));
  };

  renderRating = () => {
    const { rate } = this.state;
    const isRated = rate >= 0;
    const isSizeSmall = this.props.widthScreenSize < 768;

    const starSize = isSizeSmall ? 41 : 80;
    const containerWidth = isSizeSmall ? 186 : 359;
    return (
      <div
        style={{
          width: '100%',
          height: isRated ? '100px' : '400px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Rating
          className="rating"
          styleContainer={{ width: containerWidth }}
          count={5}
          size={starSize}
          color2="#ffd700"
          half={false}
          onChange={this.handleChangeRating}
        />
        {!isRated && <div> {t1('please_evaluate_the_course')}</div>}
      </div>
    );
  };

  renderComment = () => (
    <div style={{ padding: 10 }}>
      <div>{t1('note')}</div>
      <TextField
        name="comment"
        fullWidth
        multiLine
        underlineShow={false}
        rows={5}
        style={{ border: 'solid 1px #dddddd', padding: 0 }}
        textareaStyle={{ padding: 0, margin: 5, height: 'calc(100% - 10px)' }}
        onChange={(event, value) => {
          const { dispatch, form } = this.props;
          dispatch(change(form, 'comment', value));
        }}
      />
    </div>
  );

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
      onBackButtonClick,
      onControlQuestionClick,
      onFinish,
      onFinishButtonClick,
      onNextButtonClick,
      onQuestionDone,
      onQuestionMouseEnter,
      onUserAnswer,
      questionsToDisplay,
      shouldDisplayCurrentQuestionAtTop,
      shouldShowControlBackButton,
      shouldShowControlFinishButton,
      shouldShowControlNextButton,
      shouldShowControlQuestions,
      step,
    } = this.props;

    const shouldShowControl = [
      shouldShowControlNextButton,
      shouldShowControlFinishButton,
      shouldShowControlBackButton,
      shouldShowControlQuestions,
    ].some((value) => value);

    if (!step) {
      return null;
    }

    if (steps.FINISHED === step) {
      if (info.item_type === 'semester') {
        return <Redirect to="/" />;
      }
      return (
        <div className={this.cssClass}>
          <SurveyFinished onOkButtonClick={onFinish} />
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

    const calculateRatingAutomatically = lodashGet(
      info,
      'calculate_rating_automatically',
    );
    const isRated = lodashGet(this.state, 'rate', -1) > -1;

    return (
      <div className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__header`}>
          {info && typeof info.timeLeft !== 'undefined' && (
            <div className={`${this.cssClass}__duration`}>
              <Icon icon="time" />
              {info.timeLeft}
            </div>
          )}
        </div>
        <div
          className={`${this.cssClass}__main\
            learn-content
            ${
              introStickyPosition
                ? `${this.cssClass}__main--intro-sticky-${introStickyPosition}`
                : ''
            }`}
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
                <div>
                  <Question
                    shouldShowQuestionHelpText={false}
                    question={introSticky}
                    name="intro_sticky"
                  />
                </div>
              </Scrollbars>
            </div>
          )}
          <NormalExerciseDisplay
            shouldShowQuestionHeader={false}
            shouldShowQuestionNumber={false}
            shouldShowQuestionHelpText={false}
            renderBefore={!calculateRatingAutomatically && this.renderRating}
            className={`${this.cssClass}__display`}
            courseIid={courseIid}
            currentQuestionUniqueId={currentQuestionUniqueId}
            handleUserAnswer={onUserAnswer}
            maxHeight={displayMaxHeight}
            onQuestionDone={onQuestionDone}
            onQuestionMouseEnter={onQuestionMouseEnter}
            questions={
              !calculateRatingAutomatically && !isRated
                ? null
                : questionsToDisplay
            }
            shouldDisplayCurrentQuestionAtTop={
              shouldDisplayCurrentQuestionAtTop
            }
            renderAfter={
              calculateRatingAutomatically || isRated
                ? null // this.renderComment temporary disable this because logic redo survey take not work for comment field, enable if needed
                : null
            }
            renderNoQuestion={() => null}
          />
        </div>
        {shouldShowControl && (
          <div className={`${this.cssClass}__control`}>
            <NormalExerciseControl
              exercise={exercise}
              currentQuestionUniqueId={currentQuestionUniqueId}
              onFinishButtonOnClick={onFinishButtonClick}
              onBackButtonClick={onBackButtonClick}
              onNextButtonClick={onNextButtonClick}
              showNextButton={shouldShowControlNextButton}
              showFinishButton={shouldShowControlFinishButton}
              showCheckButton={false}
              showBackButton={shouldShowControlBackButton}
              showControlQuestions={shouldShowControlQuestions}
              isBackButtonDisabled={!isControlBackButtonEnabled}
              isNextButtonDisabled={!isControlNextButtonEnabled}
              isQuestionClickable={isControlQuestionClickable}
              onQuestionClick={onControlQuestionClick}
              labelFinish={t1('submit_survey')}
              finishButtonStyle={{ minWidth: 140 }}
            />
          </div>
        )}
      </div>
    );
  }
}

Survey.propTypes = {
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionUniqueId: PropTypes.string,
  displayMaxHeight: PropTypes.number,
  exercise: PropTypes.shape(),
  info: PropTypes.shape(),
  introSticky: PropTypes.shape(),
  isControlBackButtonEnabled: PropTypes.bool,
  isControlNextButtonEnabled: PropTypes.bool,
  isControlQuestionClickable: PropTypes.func,
  onBackButtonClick: PropTypes.func,
  onComponentDidMount: PropTypes.func,
  onComponentWillUnmount: PropTypes.func,
  onControlQuestionClick: PropTypes.func,
  onFinish: PropTypes.func,
  onFinishButtonClick: PropTypes.func,
  onNextButtonClick: PropTypes.func,
  onQuestionDone: PropTypes.func,
  onQuestionMouseEnter: PropTypes.func,
  onUserAnswer: PropTypes.func,
  questionsToDisplay: PropTypes.arrayOf(PropTypes.shape()),
  shouldDisplayCurrentQuestionAtTop: PropTypes.bool,
  shouldShowControlBackButton: PropTypes.bool,
  shouldShowControlFinishButton: PropTypes.bool,
  shouldShowControlNextButton: PropTypes.bool,
  shouldShowControlQuestions: PropTypes.bool,
};

Survey.defaultProps = {
  courseIid: null,
  currentQuestionUniqueId: null,
  displayMaxHeight: 0,
  exercise: null,
  info: null,
  introSticky: null,
  isControlBackButtonEnabled: false,
  isControlNextButtonEnabled: false,
  isControlQuestionClickable: () => true,
  onBackButtonClick: null,
  onComponentDidMount: null,
  onComponentWillUnmount: null,
  onControlQuestionClick: null,
  onFinish: null,
  onFinishButtonClick: null,
  onNextButtonClick: null,
  onQuestionDone: null,
  onQuestionMouseEnter: null,
  onUserAnswer: null,
  questionsToDisplay: [],
  shouldDisplayCurrentQuestionAtTop: true,
  shouldShowControlBackButton: false,
  shouldShowControlFinishButton: false,
  shouldShowControlNextButton: true,
  shouldShowControlQuestions: false,
};

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;

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
  let questionsToDisplay = getQuestionsWithFullInfoFromUniqueIdsInExercises(
    exercisesFromInfo,
    uniqueIdsInQuestionGroup,
  );

  return {
    currentQuestionUniqueId,
    exercise: fullExercise,
    form: String(learnItemIid),
    info,
    introSticky,
    learnItemIid,
    mode: lodashGet(info, 'mode'),
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    questionsToDisplay,
    shouldDisplayCurrentQuestionAtTop: lodashGet(
      info,
      'shouldDisplayCurrentQuestionAtTop',
    ),
    step: lodashGet(info, 'step'),
    widthScreenSize: lodashGet(state, 'common.screenSize.width', 0),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
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
  submitSurvey: (itemIid) => {
    dispatch(submitSurveyAction(itemIid));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const {
    learnItemIid,
    questionUniqueIdWhenClickBack,
    questionUniqueIdWhenClickNext,
    info,
  } = stateProps;
  const { submitSurvey, saveUserAnswer, setCurrentQuestion } = dispatchProps;
  const { onFinish } = props;

  const isControlNextButtonEnabled = Boolean(questionUniqueIdWhenClickNext);
  const isControlBackButtonEnabled = Boolean(questionUniqueIdWhenClickBack);

  const shouldShowControlNextButton =
    isControlNextButtonEnabled || isControlBackButtonEnabled;
  const shouldShowControlFinishButton =
    lodashGet(info, 'mode') !== modes.PREVIEW;
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
    onNextButtonClick: () => {
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickNext);
    },
    onBackButtonClick: () => {
      setCurrentQuestion(learnItemIid, questionUniqueIdWhenClickBack);
    },
    onUserAnswer: (question, take) => {
      saveUserAnswer(learnItemIid, question.uniqueId, take);
    },
    onFinish,
    onFinishButtonClick: () => {
      submitSurvey(learnItemIid);
    },
    isControlBackButtonEnabled,
    isControlNextButtonEnabled,
    shouldShowControlNextButton,
    shouldShowControlFinishButton,
    shouldShowControlBackButton,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(reduxForm({})(Survey)),
);
