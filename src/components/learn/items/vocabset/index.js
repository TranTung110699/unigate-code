import React from 'react';
import { t1 } from 'translate';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { learnRootUrl } from 'routes/root-url';
import isEqual from 'lodash.isequal';
import { getSubLearnElementUrl } from 'routes/links/common';
import sagaActions from 'actions/saga-creators';
import actions from 'actions/node/creators';
import SvgIcon, { arrowIcon } from 'common/icons/svg';
import {
  activeItemsInView,
  clearAnswers,
  displayQuestionsCheckedResult,
  initLearnViewList,
  saveAnswer,
  stopDisplayQuestionsCheckedResult,
} from 'actions/learn';

import Loading from 'components/common/loading';
import Utils from 'components/learn/items/vocabset/common/Utils';
import {
  skillTypes,
  templateTypes,
} from 'components/admin/question/schema/question-types';
import NormalExerciseControl from 'components/learn/items/exercise/NormalExercise/control';
import {
  getShouldDisplayCheckedResultSelector,
  getUserAnswersSelector,
} from 'common/learn/Question';
// TODO: getNode By ParentIid
// import { getNode } from 'components/admin/node/utils';
import {
  generateQuestionsByVocabset,
  getSkillsDetailByTrackingMode,
} from './common/GenerateQuestionsFromVocabset';
import { getComponent } from './common/GenerateComponentFromQuestion';
import VocabList from './List';

import {
  generateVocabTrackingLines,
  getCurrentTrackingLineByIid,
  getNextTrackingLine,
  getPrevTrackingLine,
  getVocabQuestion,
  SIGN_ON_START,
} from './common/GenerateControl';

import './stylesheet.scss';

const VOCAB_LIST = 'VOCAB_LIST';

class VocabsetItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vocabIid: 0,
      mode: 'normal',
      currentQuestionUniqueId: null,
    };
    this.getFirstItem = this.getFirstItem.bind(this);
    this.getDisplayWillComponent = this.getDisplayWillComponent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBackButtonOnClick = this.handleBackButtonOnClick.bind(this);
    this.canMove = this.canMove.bind(this);
    this.handleChangeVocab = this.handleChangeVocab.bind(this);
    this.getNextButtonText = this.getNextButtonText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { courseIid, dispatch, vocabListIds, isPreview } = this.props;
    if (!isPreview) {
      dispatch(
        sagaActions.trackerProgressGet({
          tcos: vocabListIds,
          ciid: courseIid,
        }),
      );
    }
    this.setDataContentDisplay(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.trackingLines) {
      this.setDataContentDisplay(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { trackingLines } = this.state;
    if (!trackingLines) {
      this.setDataContentDisplay(this.props);
    }
  }

  componentWillUnmount() {
    const { learnItemIid, dispatch } = this.props;

    dispatch(stopDisplayQuestionsCheckedResult(learnItemIid));
    dispatch(clearAnswers(learnItemIid));
  }

  setDataContentDisplay = (props) => {
    const { learnItemIid, vocabs, dispatch, skill } = props;
    const oldVocabs = this.props.vocabs;
    if (vocabs.length === oldVocabs.length) {
      let isSameOldVocabs = true;
      vocabs.forEach((vocab, index) => {
        if (!isEqual(vocab, oldVocabs[index])) {
          isSameOldVocabs = false;
        }
      });

      if (isSameOldVocabs && this.state && this.state.trackingLines) {
        return;
      }
    }
    const vocabQuestions = generateQuestionsByVocabset(vocabs, skill);
    if (!vocabQuestions) {
      return;
    }

    const result = generateVocabTrackingLines(vocabQuestions, skill);
    if (!result.trackingLines || result.trackingLines.length === 0) {
      return;
    }
    const firstTrackingLine = result.trackingLines[0];
    const questions = result.questions;
    const currentQuestions = [];
    for (const qid in questions) {
      currentQuestions.push(qid);
    }

    dispatch(initLearnViewList(learnItemIid, currentQuestions));
    dispatch(activeItemsInView(learnItemIid, Object.values(questions)[0].iid));
    for (const qid in questions) {
      dispatch(actions.treeUpsertNode(questions[qid], 'INSERT'));
    }

    const controlQuestions = result.controlQuestions;
    const currentQuestionUniqueId =
      controlQuestions[0] && controlQuestions[0].uniqueId;

    this.setState({
      trackingLines: result.trackingLines,
      vocabQuestions,
      controlQuestions,
      currentTrackingLine: firstTrackingLine,
      currentVocabIid: firstTrackingLine.split('-', 1)[0],
      currentQuestionUniqueId,
    });
  };

  onQuestionClick = (question) => {
    const { dispatch, learnItemIid } = this.props;
    this.setState({
      currentTrackingLine: question.uniqueId,
      currentQuestionUniqueId: question.uniqueId,
      currentVocabIid: question.uniqueId.split('-', 1)[0],
    });
    dispatch(activeItemsInView(learnItemIid, question.uniqueId));
  };

  handleNext() {
    const { trackingLines, currentTrackingLine } = this.state;
    const { dispatch, learnItemIid, onFinishButtonOnClick } = this.props;
    const next = getNextTrackingLine(trackingLines, currentTrackingLine);
    this.setState({
      currentTrackingLine: next,
      currentQuestionUniqueId: next,
      currentVocabIid: next.split('-', 1)[0],
    });

    dispatch(activeItemsInView(learnItemIid, next));

    if (this.canMove(+1)) {
      this.move(+1);
    }
    // TODO: handle next nav
  }

  handleBackButtonOnClick() {
    const { trackingLines, currentTrackingLine } = this.state;
    const { dispatch, learnItemIid } = this.props;
    const prev = getPrevTrackingLine(trackingLines, currentTrackingLine);
    if (prev !== SIGN_ON_START) {
      this.setState({
        currentTrackingLine: prev,
        currentQuestionUniqueId: prev,
        currentVocabIid: prev.split('-', 1)[0],
      });
      dispatch(activeItemsInView(learnItemIid, prev));
    }

    if (this.canMove(-1)) {
      this.move(-1);
    }
  }

  handleChangeVocab(clickedItemIid) {
    const { trackingLines } = this.state;
    const { dispatch, learnItemIid } = this.props;
    const clickedTrackingLine = getCurrentTrackingLineByIid(
      trackingLines,
      clickedItemIid,
    );

    this.setState({
      currentTrackingLine: clickedTrackingLine,
      currentVocabIid: clickedTrackingLine.split('-', 1)[0],
    });
    dispatch(activeItemsInView(learnItemIid, clickedTrackingLine));
  }

  handleCheckAnswerFinish = (questionIndex, take) => {
    const { dispatch, learnItemIid } = this.props;
    dispatch(saveAnswer(learnItemIid, questionIndex, take));
  };

  getDisplayWillComponent() {
    const { vocabQuestions, currentTrackingLine } = this.state;
    const { vocabs, shouldDisplayCheckedResult, answers } = this.props;

    if (currentTrackingLine === VOCAB_LIST) {
      return (
        <Scrollbars className="nav-scroll">
          <VocabList
            vocabList={vocabs}
            onStartPracticeVocabs={this.handleNext}
          />
        </Scrollbars>
      );
    }

    const question = getVocabQuestion(vocabQuestions, currentTrackingLine);
    const shouldShowAnswerWhenHasResult = shouldDisplayCheckedResult.includes(
      question.iid,
    );
    const answer =
      answers && answers[question.iid] && answers[question.iid].answer;

    const component = getComponent(
      question,
      this.handleCheckAnswerFinish,
      this.checkAnswer,
      answer,
      shouldShowAnswerWhenHasResult,
    );
    if (question.vocabTemplateType !== templateTypes.VIDEO) {
      return <Scrollbars className="nav-scroll">{component}</Scrollbars>;
    }

    return component;
  }

  getFirstItem() {
    const { nodes, learnItemIid } = this.props;
    if (learnItemIid) {
      const node = nodes[learnItemIid];
      if (node && node.children && node.children.length > 0) {
        return nodes[node.children[0]];
      }
    }
    return null;
  }

  getNextButtonText() {
    const { skill } = this.props;
    const { vocabQuestions, currentTrackingLine } = this.state;
    if (currentTrackingLine && skill === 'dictation') {
      const question = getVocabQuestion(vocabQuestions, currentTrackingLine);
      if (question.type === 'video') {
        return t1('speak');
      }
    }
    return t1('next');
  }

  isQuestionClickable = (groupIndex, questionIndex) => true;

  checkAnswer() {
    const {
      learnItemIid,
      courseIid,
      nodes,
      vocabProgresses,
      dispatch,
      activeItems,
      answers,
      isPreview,
      isReview,
    } = this.props;

    const mode = Utils.getVocabsetSkill(nodes[learnItemIid]);
    const skillDetails = getSkillsDetailByTrackingMode(mode);
    let newVocabProgresses = Utils.getVocabsProgressesBySkill(
      skillDetails,
      vocabProgresses,
    );

    let correct = false;
    if (answers[activeItems] && answers[activeItems].isCorrect) {
      correct = answers[activeItems].isCorrect;
    }

    let skill = skillTypes.READ;
    if (nodes[activeItems] && nodes[activeItems].skill) {
      skill = nodes[activeItems].skill;
    }

    newVocabProgresses = Utils.updateProgressForVocab(
      activeItems.split('-', 1)[0],
      skill,
      correct,
      newVocabProgresses,
      skillDetails,
    );

    const data = {
      skill,
      progress: newVocabProgresses,
      ciid: courseIid,
    };

    if (!isPreview && !isReview) {
      dispatch(sagaActions.trackerProgressSave(data));
    }
    dispatch(displayQuestionsCheckedResult(learnItemIid, [activeItems]));
  }

  getQuestionUniqueIdAfterMove = (n) => {
    const { currentQuestionUniqueId, controlQuestions } = this.state;
    if (Array.isArray(controlQuestions)) {
      const currentIndex = controlQuestions.findIndex(
        (question) => question && question.uniqueId === currentQuestionUniqueId,
      );
      const question = controlQuestions[currentIndex + n];
      return question && question.uniqueId;
    }
    return null;
  };

  canMove = (n) => !!this.getQuestionUniqueIdAfterMove(n);

  move = (n) => {
    const uniqueId = this.getQuestionUniqueIdAfterMove(n);
    this.setState({
      currentQuestionUniqueId: uniqueId,
    });
  };

  getVocabActiveClass(vocab) {
    if (vocab && vocab.iid === this.state.currentVocabIid) {
      return 'active';
    }

    return '';
  }

  render() {
    const {
      nodes,
      navId,
      learnIid,
      vocabs,
      skill,
      onFinishButtonOnClick,
    } = this.props;
    const learObject = nodes[learnIid];
    const { controlQuestions, trackingLines } = this.state;
    if (!trackingLines) {
      return <Loading />;
    }

    return (
      <div className="ui-vocabset">
        <div className="learn-content learn-content-border">
          {this.getDisplayWillComponent()}
        </div>
        {skill && skill === 'dictation' ? (
          <div className="learn-control dictation">
            {vocabs &&
              vocabs.length > 0 &&
              vocabs.map((vocab, index) => (
                <a
                  to={getSubLearnElementUrl(
                    learnRootUrl,
                    learObject,
                    navId,
                    vocab.id,
                  )}
                  key={`${vocab.id}-${index}`}
                  className={`vocab ${this.getVocabActiveClass(vocab)}`}
                  onClick={() => this.handleChangeVocab(vocab.iid)}
                >
                  {vocab.name}
                </a>
              ))}
            <button
              className="vocab btn next pull-right"
              onClick={this.handleNext}
            >
              {this.getNextButtonText()}
              <SvgIcon path={arrowIcon} className="is-icon-add-1 m-l-10" />
            </button>
          </div>
        ) : (
          <div>
            {controlQuestions && (
              <NormalExerciseControl
                mode=""
                exercise={{ children: controlQuestions }}
                currentQuestionUniqueId={this.state.currentQuestionUniqueId}
                isQuestionClickable={this.isQuestionClickable}
                onFinishButtonOnClick={onFinishButtonOnClick}
                onCheckAnswerButtonClick={this.checkAnswer}
                onBackButtonClick={this.handleBackButtonOnClick}
                onNextButtonClick={this.handleNext}
                isNextButtonDisabled={!this.canMove(+1)}
                isFinishButtonDisabled={this.canMove(+1)}
                isBackButtonDisabled={!this.canMove(-1)}
                showBackButton
                showCheckButton
                showControlQuestions
                onQuestionClick={this.onQuestionClick}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const nodes = state.tree;
  const tcoProgresses = state.trackerProgress;
  const itemIid = props.learnItemIid || state.learn.itemIid;

  let node;
  if (itemIid) {
    node = nodes[itemIid];
  }
  const vocabs = [];
  const vocabProgresses = [];
  let vocabListIds = [];
  if (node && node.children) {
    vocabListIds = node.children;
    for (let i = 0; i < vocabListIds.length; i += 1) {
      const vocab = nodes[vocabListIds[i]];
      if (vocab) {
        vocabs.push(vocab);
      }

      if (tcoProgresses && tcoProgresses[vocabListIds[i]]) {
        vocabProgresses.push({
          ...tcoProgresses[vocabListIds[i]],
          iid: vocabListIds[i],
        });
      }
    }
  }

  let activeItems = [];
  if (state.learn.viewer[itemIid] && state.learn.viewer[itemIid].activeItems) {
    activeItems = state.learn.viewer[itemIid].activeItems;
  }

  const answers = getUserAnswersSelector(state)(itemIid) || [];

  const shouldDisplayCheckedResult =
    getShouldDisplayCheckedResultSelector(state)(itemIid) || [];

  return {
    nodes: state.tree,
    learnItemIid: itemIid,
    learnIid: state.learn.iid,
    navId: state.learn.navId,
    vocabs,
    vocabProgresses,
    vocabListIds,
    activeItems,
    shouldDisplayCheckedResult,
    answers,
    ts: new Date().getTime(),
    isPreview: state.learn.isPreview,
    isReview: state.learn.isReview,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'newCollection',
  })(VocabsetItem),
);
