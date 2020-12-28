import React from 'react';
import PropTypes from 'prop-types';
import { ntype } from 'configs/constants';
import QuestionWrapper from './QuestionWrapper';
import { findDOMNode } from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { groupByKey, max } from 'common/utils/Array';
import { t1 } from 'translate';
import './NormalExerciseDisplay.scss';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import { portals } from 'components/common/portal';
import { isSmallScreen } from 'common';

class NormalExerciseDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementHeight: 475,
    };
  }

  componentDidMount() {
    const {
      currentQuestionUniqueId,
      shouldDisplayCurrentQuestionAtTop,
    } = this.props;
    this.updateHeightOfElementsToState();
    if (currentQuestionUniqueId && shouldDisplayCurrentQuestionAtTop) {
      this.scrollQuestionToTop(currentQuestionUniqueId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      currentQuestionUniqueId,
      shouldDisplayCurrentQuestionAtTop,
    } = this.props;
    this.updateHeightOfElementsToState();
    if (
      currentQuestionUniqueId !== prevProps.currentQuestionUniqueId &&
      shouldDisplayCurrentQuestionAtTop
    ) {
      this.scrollQuestionToTop(currentQuestionUniqueId);
    }
  }

  scrollQuestionToTop = (questionUniqueId) => {
    const questionNode = this.getQuestionNode(questionUniqueId);
    if (!questionNode) return;

    const scrollBarNode = this.getScrollBarNode();
    if (!scrollBarNode) return;

    const scrollBarContentNode = this.getScrollBarContentNode();

    const scrollBarNodeTop = scrollBarNode.getBoundingClientRect().top;
    if (scrollBarNodeTop < 0) {
      questionNode.scrollIntoView();
    } else {
      const questionNodeTop = questionNode.getBoundingClientRect().top;
      const scrollBarContentNodeTop = scrollBarContentNode.getBoundingClientRect()
        .top;
      scrollBarNode.scrollTop = questionNodeTop - scrollBarContentNodeTop;
    }
  };

  getQuestionNodeRef = (questionUniqueId) => `question-${questionUniqueId}`;

  getQuestionNode = (questionUniqueId) =>
    findDOMNode(this[this.getQuestionNodeRef(questionUniqueId)]);

  getScrollBarNode = () => {
    const tmp = findDOMNode(this.scrollBar);
    if (!tmp) return null;
    return tmp.getElementsByTagName('div')[0];
  };

  getScrollBarContentNode = () => findDOMNode(this.scrollBarContent);

  getVisibilityOfQuestion = (questionUniqueId) => {
    const scrollBarNode = this.getScrollBarNode();
    if (!scrollBarNode) return 0;

    const questionNode = this.getQuestionNode(questionUniqueId);
    if (!questionNode) return 0;

    const questionNodeHeight = questionNode.getBoundingClientRect().height;
    const scrollBarNodeHeight = scrollBarNode.getBoundingClientRect().height;
    const bottom = Math.max(
      questionNode.getBoundingClientRect().bottom,
      scrollBarNode.getBoundingClientRect().bottom,
    );
    const top = Math.min(
      questionNode.getBoundingClientRect().top,
      scrollBarNode.getBoundingClientRect().top,
    );

    return questionNodeHeight + scrollBarNodeHeight - (bottom - top);
  };

  getMostVisibleQuestion = () => {
    const defaultResult = null;

    const scrollBarNode = this.getScrollBarNode();
    if (!scrollBarNode) return defaultResult;

    const { questions } = this.props;
    if (!Array.isArray(questions) || questions.length === 0)
      return defaultResult;

    const visibilityOfQuestions = questions.map((question) =>
      this.getVisibilityOfQuestion(question.uniqueId),
    );

    const maxVisibility = max(visibilityOfQuestions);

    return questions[maxVisibility.index];
  };

  isMostVisibleQuestion = (questionUniqueId) => {
    const mostVisibleQuestion = this.getMostVisibleQuestion();
    return (
      mostVisibleQuestion && mostVisibleQuestion.uniqueId === questionUniqueId
    );
  };

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

  getListIidStickyQuestionOfGroup = (questions = [], questionIid) =>
    Object.values(groupByKey(questions, 'group')).filter(
      (item) => lodashGet(item, '0.iid') === questionIid,
    ).length > 0;

  render() {
    const {
      className,
      courseIid,
      handleUserAnswer,
      isQuestionContentAudioControllable,
      maxHeight,
      onQuestionBookMarkAreaClick,
      onQuestionContentAudioEnded,
      onQuestionContentAudioPlay,
      onQuestionDone,
      onQuestionMouseEnter,
      options,
      questionMode,
      renderAfter,
      renderBefore,
      shouldShowQuestionHelpText,
      shouldShowQuestionNumber,
      shouldShowQuestionHeader,
      shouldShowQuestionLearningSuggestionWhenShowAnswer,
      style,
      renderNoQuestion,
      displayTemplate,
      isShowSaveQuestionOnly,
      questionGroupTimeLeftInSeconds,
    } = this.props;

    let { questions } = this.props;

    let scrollbarsProps = {
      autoHeight: true,
      autoHeightMax: this.state.elementHeight,
    };

    if (maxHeight) {
      scrollbarsProps = {
        ...scrollbarsProps,
        autoHeight: true,
        autoHeightMax: maxHeight,
      };
    }

    const classContainer = `${className || ''} normal-exercise-display
       ${questionMode !== 'exam' ? ' learn-content-border' : ''} `;

    if (isShowSaveQuestionOnly) {
      questions = questions.filter((question) => question.isTicked);
    }

    return (
      <div className={classContainer} style={style}>
        <Scrollbars
          {...scrollbarsProps}
          className="normal-exercise-display__scroll"
          ref={(el) => {
            this.scrollBar = el;
          }}
          // renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        >
          {window.isGoJapan && !isSmallScreen && (
            <div id={portals.QUESTION_NAVIGATIONS_NUMBER} />
          )}
          <ul
            className="normal-exercise-display__items"
            ref={(el) => {
              this.scrollBarContent = el;
            }}
          >
            {typeof renderBefore === 'function' && renderBefore()}
            {Array.isArray(questions) && questions.length > 0 ? (
              questions.map(
                (question) =>
                  (question.ntype === ntype.END_INTRO_STICKY && <div />) ||
                  (question.ntype === ntype.QUESTION && (
                    <QuestionWrapper
                      key={question.uniqueId}
                      question={question}
                      onQuestionMouseEnter={onQuestionMouseEnter}
                      getQuestionRef={(el) => {
                        this[this.getQuestionNodeRef(question.uniqueId)] = el;
                      }}
                      courseIid={courseIid}
                      handleUserAnswer={handleUserAnswer}
                      onQuestionDone={onQuestionDone}
                      isQuestionContentAudioControllable={
                        isQuestionContentAudioControllable
                      }
                      onQuestionContentAudioPlay={onQuestionContentAudioPlay}
                      onQuestionContentAudioEnded={onQuestionContentAudioEnded}
                      onQuestionBookMarkAreaClick={onQuestionBookMarkAreaClick}
                      shouldShowQuestionHelpText={shouldShowQuestionHelpText}
                      shouldShowQuestionNumber={shouldShowQuestionNumber}
                      shouldShowQuestionHeader={shouldShowQuestionHeader}
                      options={options}
                      questionMode={questionMode}
                      displayTemplate={displayTemplate}
                      shouldShowQuestionLearningSuggestionWhenShowAnswer={
                        shouldShowQuestionLearningSuggestionWhenShowAnswer
                      }
                      isStickyQuestionOfGroup={this.getListIidStickyQuestionOfGroup(
                        questions,
                        question.iid,
                      )}
                    />
                  )),
              )
            ) : renderNoQuestion ? (
              renderNoQuestion()
            ) : (
              <h1 className="normal-exercise-display__message">
                {t1(
                  isShowSaveQuestionOnly
                    ? 'select_question_to_view'
                    : 'this_section_has_no_question',
                )}
              </h1>
            )}
            {typeof renderAfter === 'function' && renderAfter()}
          </ul>
        </Scrollbars>
      </div>
    );
  }
}

NormalExerciseDisplay.propTypes = {
  className: PropTypes.string,
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionUniqueId: PropTypes.string,
  handleUserAnswer: PropTypes.func,
  isQuestionContentAudioControllable: PropTypes.func,
  maxHeight: PropTypes.number,
  onQuestionBookMarkAreaClick: PropTypes.func,
  onQuestionContentAudioEnded: PropTypes.func,
  onQuestionContentAudioPlay: PropTypes.func,
  onQuestionDone: PropTypes.func,
  onQuestionMouseEnter: PropTypes.func,
  options: PropTypes.shape(),
  questionMode: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  renderAfter: PropTypes.func,
  renderBefore: PropTypes.func,
  shouldDisplayCurrentQuestionAtTop: PropTypes.bool,
  shouldShowQuestionHelpText: PropTypes.bool,
  shouldShowQuestionNumber: PropTypes.bool,
  shouldShowQuestionHeader: PropTypes.bool,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: PropTypes.bool,
  style: PropTypes.shape(),
};

NormalExerciseDisplay.defaultProps = {
  className: '',
  courseIid: null,
  currentQuestionUniqueId: null,
  handleUserAnswer: null,
  isQuestionContentAudioControllable: () => true,
  maxHeight: 0,
  onQuestionBookMarkAreaClick: null,
  onQuestionContentAudioEnded: null,
  onQuestionContentAudioPlay: null,
  onQuestionDone: null,
  onQuestionMouseEnter: null,
  options: {},
  questionMode: 'normal',
  questions: [],
  renderAfter: null,
  renderBefore: null,
  shouldDisplayCurrentQuestionAtTop: true,
  shouldShowQuestionHelpText: true,
  shouldShowQuestionNumber: true,
  shouldShowQuestionHeader: true,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: false,
  style: null,
};

const mapStateToProps = (state) => {
  const isShowSaveQuestionOnly = lodashGet(
    state,
    'learn.isShowSaveQuestionOnly',
    false,
  );

  return {
    isShowSaveQuestionOnly,
  };
};

export default connect(mapStateToProps)(NormalExerciseDisplay);
