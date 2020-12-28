import React, { Component } from 'react';
import { t, t1 } from 'translate';
import PropTypes from 'prop-types';
import Panel from 'components/common/forms/questions/question-panel';
import { connect } from 'react-redux';
import { types } from 'components/admin/question/schema/question-types';
import { questionTemplateTypes } from 'components/admin/question/schema/question-template-types';
import {
  getInlineAnswers,
  getIntroAnswers,
  getMatchingPairAnswers,
  getMcAnswers,
  getMcOpenEndedAnswers,
  getOpenEndedAnswers,
  getQuestionAPIAnswer,
  getReorderAnswers,
} from 'common/question';
import isEqual from 'lodash.isequal';
import './stylesheet.scss';

import { isQuestionHaveContent } from 'common/learn/Question';
import { questionDisplayTemplates, reorderTypes } from 'configs/constants';
import { stripHTML } from 'common/utils/string';
import get from 'lodash.get';

import QuestionContent, {
  questionContentAudioDisplayModes,
  QuestionContentText,
} from './QuestionContent';
import QuestionBody from './QuestionBody';
import QuestionFeedback from './QuestionFeedback';
import AnswersLog from './AnswersLog';

import { isShallowEqual } from 'common/utils/object';

import QuestionLearningSuggestion from './QuestionLearningSuggestion';
import {
  getQuestionTimeLeft,
  isQuestionDisabled,
} from 'common/learn/exercise/question';

import { isOnlyOnMobileQuestion } from 'components/common/forms/questions/common';
import AntDivider from 'antd/lib/divider';
import { isSmallScreen } from 'common';
import Icon from 'antd/lib/icon';
import { portals } from '../../portal';
import styled from 'styled-components';
import Affix from 'antd/lib/affix';
import withStickyHeaderInfo from 'common/hoc/withStickyHeaderInfo';

const Divider = styled(AntDivider)`
  margin: 16px 0 !important;
`;

const QuestionContentTextStyled = styled(QuestionContentText)`
  ${({ isStickyQuestionOfGroup, affixed }) => {
    if (isStickyQuestionOfGroup && affixed) {
      return `
        background-color: white;
        padding: 10px 20px 5px 20px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin: 0 -20px;
      `;
    }
  }};
`;

class Question extends Component {
  cssClass = 'question-display';

  constructor(props) {
    super(props);
    this.state = {
      userAnswers: null,
      highlights: [],
      isHandleChooseAnswer: false, //Trường này để phân biệt việc save user answer do user chọn & do repopulate prev user answers,
      // phục vụ việc save lại answers log trong bảng take
      affixed: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(
      nextState === this.state &&
      isShallowEqual(nextProps, this.props, ['question']) &&
      isEqual(nextProps.question, this.props.question)
    );
  }

  componentDidMount() {
    const { defaultAnswers } = this.props;
    this.resetDefaultAnswer(defaultAnswers);
  }

  componentWillReceiveProps(nextProps) {
    const { defaultAnswers } = this.props;
    if (nextProps.defaultAnswers !== defaultAnswers) {
      this.resetDefaultAnswer(nextProps.defaultAnswers);
    }

    const oldQuestion = this.props.question;
    const question = nextProps.question;
    if (question.iid !== oldQuestion.iid) {
      this.resetDefaultAnswer(defaultAnswers);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { question, onChange } = this.props;

    if (
      prevProps.question !== question &&
      this.hasFullQuestionInfo() &&
      !this.state.userAnswers
    ) {
      this.setUserAnswers(this.getDefaultUserAnswer());
    }

    if (
      typeof onChange === 'function' &&
      !isEqual(prevState.userAnswers, this.state.userAnswers)
    ) {
      onChange(this.state.userAnswers);
    }

    // only check answer for question in current questions list
    if (
      question &&
      (this.shouldCheckAnswerWhenUpdateAnswer(
        prevState.userAnswers,
        this.state.userAnswers,
      ) ||
        prevProps.shouldShowKeyWhenShowAnswer !==
          this.props.shouldShowKeyWhenShowAnswer)
    ) {
      this.checkAnswer();
    }
  }

  shouldCheckAnswerWhenUpdateAnswer = (prevAnswers, nextAnswers) => {
    const { question } = this.props;
    if (isOnlyOnMobileQuestion(question)) {
      return false;
    }

    if (question && String(question.type) === String(types.TYPE_OPEN_ENDED)) {
      return prevAnswers && prevAnswers !== nextAnswers;
    }
    return prevAnswers !== nextAnswers;
  };

  resetDefaultAnswer = (defaultAnswers) => {
    if (defaultAnswers) {
      this.setUserAnswers(defaultAnswers);
    } else if (this.hasFullQuestionInfo()) {
      this.setUserAnswers(this.getDefaultUserAnswer());
    }
  };

  getDefaultUserAnswer() {
    const { question } = this.props;

    switch (question.type) {
      case types.TYPE_REORDER: {
        if (question.reorders && question.reorder_type !== reorderTypes.WORD) {
          return question.reorders.map((item) => [item.id]);
        }
        return [];
      }
      default: {
        return [];
      }
    }
  }

  hasFullQuestionInfo = () => {
    const { question } = this.props;
    return typeof question.type !== 'undefined';
  };

  _isCorrect = () => this.state.isCorrect;

  _shouldShowAnswer = () => {
    const { shouldShowAnswerWhenHasResult, question } = this.props;

    if (
      shouldShowAnswerWhenHasResult &&
      parseInt(question.type) == types.TYPE_OPEN_ENDED
    )
      return true;

    const isCorrect = this._isCorrect();
    const hasResult = isCorrect === true || isCorrect === false;
    return shouldShowAnswerWhenHasResult && hasResult;
  };

  getHighlights = () => (this._shouldShowAnswer() ? this.state.highlights : []);

  setUserAnswers = (newUserAnswers) => {
    this.setState({
      userAnswers: newUserAnswers,
    });
  };

  handleChooseAnswer = (userAnswers) => {
    this.setState({
      isHandleChooseAnswer: true,
    });

    this.setState({ userAnswers });
    this.resetHighlights();
  };

  getItemByIndex = (index) => {
    const { question } = this.props;
    const { mc_answers } = question;

    let localItem = {};
    mc_answers.forEach((optionIndex, i) => {
      if (optionIndex === index) {
        localItem = mc_answers[i];
      }
    });

    return localItem;
  };

  getValueOfItem = (item, index, value) => {
    let itemValue;
    if (value && value === '@index') {
      itemValue = index;
    } else {
      itemValue = !value ? item : item[value];
    }

    return itemValue;
  };

  getHighlightsClass = (dataValue) => {
    const highlights = this.getHighlights();
    if (!highlights) {
      return '';
    }

    let className = '';
    highlights.forEach((highlightItem) => {
      if (highlightItem.value === dataValue) {
        className = highlightItem.className;
      }
    });

    return className;
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  checkAnswer = () => {
    const {
      question,
      highlightsClass,
      onCheckAnswerFinish,
      shouldShowKeyWhenShowAnswer,
    } = this.props;

    const { userAnswers } = this.state;
    let result;
    if (question.type === types.TYPE_INLINE) {
      result = getInlineAnswers(
        question,
        userAnswers,
        highlightsClass,
        shouldShowKeyWhenShowAnswer,
      );
    } else if (question.type === types.TYPE_REORDER) {
      result = getReorderAnswers(
        question,
        userAnswers,
        highlightsClass,
        shouldShowKeyWhenShowAnswer,
      );
    } else if (question.type === types.TYPE_MATCHING_PAIRS) {
      result = getMatchingPairAnswers(
        question,
        userAnswers,
        highlightsClass,
        shouldShowKeyWhenShowAnswer,
      );
    } else if (question.type === types.TYPE_OPEN_ENDED) {
      result = getOpenEndedAnswers(question, userAnswers);
    } else if (question.type === types.TYPE_API) {
      result = getQuestionAPIAnswer(question, userAnswers);
    } else if (question.type === types.TYPE_INTRODUCTION) {
      result = getIntroAnswers(question, userAnswers);
    } else if (question.type === types.TYPE_MC_OPEN_ENDED) {
      result = getMcOpenEndedAnswers(question, userAnswers);
    } else if (isOnlyOnMobileQuestion(question)) {
      // this type only work on mobile
      result = null;
    } else {
      result = getMcAnswers(
        question,
        userAnswers,
        highlightsClass,
        shouldShowKeyWhenShowAnswer,
      );
    }

    this.setState({
      highlights: result.highlights,
      isCorrect: result.take && result.take.isCorrect,
    });

    if (onCheckAnswerFinish) {
      let take = result.take;
      if (this.state.isHandleChooseAnswer) {
        take.ts = parseInt(Date.now() / 1000, 10);
      }
      onCheckAnswerFinish(take);
      this.setState({ isHandleChooseAnswer: false });
    }
  };

  handleQuestionDone = () => {
    const { onQuestionDone } = this.props;
    if (typeof onQuestionDone === 'function') {
      onQuestionDone();
    }
  };

  getHeaderText = (displayTemplate, question) => {
    switch (displayTemplate) {
      case questionDisplayTemplates.CONTENT_DISPLAYED_INSIDE_HEADER: {
        return stripHTML(get(question, 'content', ''));
      }
      default: {
        return get(question, 'help_text');
      }
    }
  };

  getDisplayTemplate = () => {
    // if ([types.TYPE_END_INTRODUCTION, types.TYPE_INTRODUCTION, types.TYPE_INLINE].includes(get(this.props, 'question.type'))) {
    if (types.TYPE_INLINE == get(this.props, 'question.type')) {
      return questionDisplayTemplates.DEFAULT;
    }
    let displayTemplate = get(this.props, 'displayTemplate');
    if (
      !displayTemplate ||
      displayTemplate === questionDisplayTemplates.DEFAULT
    ) {
      displayTemplate = get(this.props, 'question.display_template');
    }
    return displayTemplate;
  };

  getGoJapanQuestionClassName = (question) => {
    return `go-japan-question ${(() => {
      switch (get(question, 'type')) {
        case types.TYPE_MC: {
          if (question.tpl_type === questionTemplateTypes.MC_ANSWER_TEXT) {
            const baseClass = 'go-japan-mc-question-answer-text';

            if (question.avatar && question.audio) {
              return `${baseClass} ${baseClass}--has-image-and-audio`;
            }

            return baseClass;
          }

          return '';
        }
        case types.TYPE_INLINE: {
          if (question.avatar || question.audio) {
            return 'go-japan-inline-question-with-image-and-audio';
          }
          return '';
        }
      }
      return '';
    })()}`;
  };

  render() {
    const {
      shouldShowKeyWhenShowAnswer,
      instantShowFeedback,
      isContentAudioControllable,
      isContentAudiosControllable,
      isContentAudiosPlaying,
      isTicked,
      onBookMarkAreaClick,
      onContentAudioEnded,
      onContentAudioPlay,
      onContentAudiosEnded,
      shouldShowQuestionHelpText,
      shouldShowQuestionNumber,
      shouldShowQuestionHeader,
      answersAndAnswersLog,
      shouldShowScoreWhenShowAnswer,
      shouldShowQuestionIdWhenShowAnswer,
      shouldShowQuestionLearningSuggestionWhenShowAnswer,
      question,
      isCheckButtonClicked,
      isStickyQuestionOfGroup,
      stickyHeaderInfo,
    } = this.props;

    if (!question || typeof question.type === 'undefined') {
      return null;
    }

    const shouldShowAnswer = this._shouldShowAnswer();
    const highlights = this.getHighlights();
    const isCorrect = this._isCorrect();

    const props = {
      ...this.props,
      highlights,
      setUserAnswers: this.setUserAnswers,
      userAnswers: this.state.userAnswers,
      handleChooseAnswer: this.handleChooseAnswer,
      getItemByIndex: this.getItemByIndex,
      checkAnswer: this.checkAnswer,
      getHighlightsClass: this.getHighlightsClass,
      getValueOfItem: this.getValueOfItem,
      resetHighlights: this.resetHighlights,
      onChange: this.handleQuestionDone,
      // when show answer, all inputs are disabled
      disabled: isQuestionDisabled(question) || shouldShowAnswer,
      // this prop (shouldShowKey) is used by answer reorder and matching pair question to show answer when review, reconsider to change this in the future
      shouldShowKey: shouldShowAnswer && shouldShowKeyWhenShowAnswer,
    };

    const haveContent = isQuestionHaveContent(question);
    const displayTemplate = this.getDisplayTemplate();

    const { answersLog, markedTakeAnswers } = answersAndAnswersLog || {};

    // special exercise
    const sp1Layout = question.sp1_layout;
    const isGoJapan = window.isGoJapan;

    let className = '';
    if (isGoJapan) {
      className += ` ${this.getGoJapanQuestionClassName(question)}`;
    }

    const questionContent =
      !sp1Layout && haveContent && !isOnlyOnMobileQuestion(question) ? (
        <QuestionContent
          isAudioControllable={isContentAudioControllable}
          isAudiosControllable={isContentAudiosControllable}
          isAudiosPlaying={isContentAudiosPlaying}
          onAudiosEnded={onContentAudiosEnded}
          onAudioPlay={onContentAudioPlay}
          onAudioEnded={onContentAudioEnded}
          question={question}
          displayTemplate={displayTemplate}
          questionContentAudioDisplayMode={
            isGoJapan
              ? questionContentAudioDisplayModes.MINIMALISTIC
              : questionContentAudioDisplayModes.DEFAULT
          }
          hideQuestionContentText={isGoJapan}
        />
      ) : null;

    const correctFeedback = get(question, 'feedback_true');
    const inCorrectFeedback = get(question, 'feedback_false');
    const feedbackMessage = isCheckButtonClicked && (
      <div>
        {isCorrect ? (
          <span className="question-correct-answer">
            <Icon type="check-circle" /> {correctFeedback || t1('correct')}
          </span>
        ) : (
          <span className="question-incorrect-answer">
            <Icon type="close-circle" /> {inCorrectFeedback || t1('incorrect')}
          </span>
        )}
      </div>
    );

    const questionBody = (
      <>
        {isSmallScreen && isGoJapan && (
          <div className="m-b-10">
            <div className="text-right">
              <div id={portals.QUESTION_NAVIGATIONS_NUMBER} />
            </div>
            <Divider />
            {feedbackMessage}
          </div>
        )}
        <QuestionBody question={question} {...props} shouldShowAnswer />
      </>
    );

    const QuestionContentTextWrapper =
      isGoJapan && !isOnlyOnMobileQuestion(question) ? (
        <QuestionContentTextStyled
          question={question}
          isStickyQuestionOfGroup={isStickyQuestionOfGroup}
          affixed={this.state.affixed}
        />
      ) : null;

    return (
      <Panel
        shouldShowTitle={!isGoJapan && !sp1Layout && shouldShowQuestionHelpText}
        shouldShowNumber={!isGoJapan && !sp1Layout && shouldShowQuestionNumber}
        shouldShowHeader={!isGoJapan && shouldShowQuestionHeader}
        title={!sp1Layout ? this.getHeaderText(displayTemplate, question) : ''}
        onBookMarkAreaClick={!isGoJapan && !sp1Layout && onBookMarkAreaClick}
        isTicked={isTicked}
        number={question.number}
        questionId={question.id}
        questionTimeLeftInSeconds={getQuestionTimeLeft(question)}
        className={className}
      >
        {isStickyQuestionOfGroup ? (
          <Affix
            offsetTop={get(stickyHeaderInfo, 'height')}
            onChange={(affixed) => this.setState({ affixed })}
          >
            {QuestionContentTextWrapper}
          </Affix>
        ) : (
          QuestionContentTextWrapper
        )}

        {!sp1Layout && shouldShowAnswer && shouldShowQuestionIdWhenShowAnswer && (
          <div>
            {t('question_id')}: {question.id}
          </div>
        )}

        {isGoJapan ? (
          <>
            {!isSmallScreen && feedbackMessage}
            <div className="go-japan-question-content-body-wrapper">
              {questionContent}
              {questionBody}
            </div>
          </>
        ) : (
          <>
            {questionContent}
            {questionBody}
          </>
        )}

        {!sp1Layout &&
          shouldShowAnswer &&
          (question.feedback_true || question.feedback_false) &&
          instantShowFeedback && (
            <QuestionFeedback question={question} isCorrect={isCorrect} />
          )}

        {shouldShowAnswer &&
          shouldShowScoreWhenShowAnswer &&
          question.type === types.TYPE_OPEN_ENDED && (
            <div className="m-t-10 m-b-20">
              {!sp1Layout ? (
                <div>
                  {t1('score')}:{' '}
                  <b>
                    {typeof get(markedTakeAnswers, `${question.id}.score`) ==
                    'undefined'
                      ? t1('not_yet_marked')
                      : get(markedTakeAnswers, `${question.id}.score`)}
                  </b>
                  /{question.weighted}
                </div>
              ) : (
                <div />
              )}
            </div>
          )}

        {!sp1Layout && answersLog && (
          <AnswersLog answersLog={answersLog} question={question} />
        )}

        {shouldShowAnswer &&
        shouldShowQuestionLearningSuggestionWhenShowAnswer &&
        !isCorrect ? (
          <QuestionLearningSuggestion
            className={`${this.cssClass}__learning-suggestion`}
            question={question}
          />
        ) : null}
      </Panel>
    );
  }
}

Question.propTypes = {
  shouldShowKeyWhenShowAnswer: PropTypes.bool,
  instantShowFeedback: PropTypes.bool,
  isContentAudioControllable: PropTypes.func,
  isContentAudiosControllable: PropTypes.bool,
  isContentAudiosPlaying: PropTypes.bool,
  isTicked: PropTypes.bool,
  onBookMarkAreaClick: PropTypes.func,
  onContentAudioEnded: PropTypes.func,
  onContentAudioPlay: PropTypes.func,
  onContentAudiosEnded: PropTypes.func,
  onQuestionDone: PropTypes.func,
  onCheckAnswerFinish: PropTypes.func,
  question: PropTypes.shape(),
  shouldShowAnswerWhenHasResult: PropTypes.bool,
  shouldShowQuestionHeader: PropTypes.bool,
  shouldShowQuestionHelpText: PropTypes.bool,
  shouldShowQuestionNumber: PropTypes.bool,
  shouldShowScoreWhenShowAnswer: PropTypes.bool,
  shouldShowQuestionIdWhenShowAnswer: PropTypes.bool,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: PropTypes.bool,
};

Question.defaultProps = {
  shouldShowKeyWhenShowAnswer: true,
  instantShowFeedback: true,
  isContentAudioControllable: () => true,
  isContentAudiosControllable: true,
  isContentAudiosPlaying: false,
  isTicked: false,
  onBookMarkAreaClick: null,
  onContentAudioEnded: null,
  onContentAudioPlay: null,
  onContentAudiosEnded: null,
  onQuestionDone: null,
  onCheckAnswerFinish: null,
  question: null,
  shouldShowAnswerWhenHasResult: false,
  shouldShowQuestionHeader: true,
  shouldShowQuestionHelpText: true,
  shouldShowQuestionNumber: true,
  shouldShowScoreWhenShowAnswer: true,
  shouldShowQuestionIdWhenShowAnswer: false,
  shouldShowQuestionLearningSuggestionWhenShowAnswer: false,
};

const mapStateToProps = (state, props) => {
  const question = props.question || state.tree[props.iid];
  return {
    question,
    answersAndAnswersLog: get(state, 'learn.answersLog'),
    isCheckButtonClicked: get(
      state,
      `learn.info.${get(question, 'pid')}.isCheckButtonClicked`,
    ),
  };
};

export default connect(mapStateToProps)(withStickyHeaderInfo()(Question));
