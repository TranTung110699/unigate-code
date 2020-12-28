import React from 'react';
import { change } from 'redux-form';
import Tabs from 'antd/lib/tabs';
import isEqual from 'lodash.isequal';
import Loading from 'components/common/loading';
import Perm from 'common/utils/Perm';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import OpenEndedSchemaForm from './Form';
import fetchAnswerAndFeedback, { questionTakeState } from '../utility';
import {
  getLearningItemModeSelector,
  getLearningItemUserIidSelector,
} from 'common/learn';
import InputText from 'antd/lib/input';
import lodashGet from 'lodash.get';
import OpenEndedQuestionComments from 'components/common/comment/open-ended-answer-comment';
import SuccessAlert from '../../../SuccessAlert';
import { last } from 'common/utils/Array';
import DetailMarkingByRubric from 'components/admin/take/schema/MarkingByRubric';

const getFormId = (props) =>
  `${props && props.courseIid}-${props &&
    props.question &&
    props.question.iid}`;

class OpenEnded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSaved: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userAnswers &&
      !isEqual(prevProps.userAnswers, this.props.userAnswers)
    ) {
      const { userAnswers, dispatch } = this.props;
      const answer = userAnswers.answer;
      const score = userAnswers.score;
      if (answer) {
        Object.keys(answer).forEach((key) => {
          dispatch(change(getFormId(this.props), key, answer[key]));
        });
      }
      dispatch(change(getFormId(this.props), 'score', score));
    }
  }

  componentDidMount() {
    fetchAnswerAndFeedback(this.props);
    if (Perm.isGuest()) {
      const dispatch = this.props.dispatch;
      dispatch(openLoginDialog());
    }
  }

  saveAnswer = ({ content, attachments }) => {
    const { question, courseIid } = this.props;
    const { lastSaved } = this.state;

    if (isEqual(lastSaved, { content, attachments })) {
      return;
    }

    this.setState({
      lastSaved: { content, attachments },
    });

    const newAnswer = {
      content,
      attachments,
      question: {
        iid: question.iid,
        type: question.type,
        weighted: question.weighted,
      },
      course: courseIid,
    };

    const { setUserAnswers } = this.props;
    if (setUserAnswers) {
      setUserAnswers(newAnswer);
    }
  };

  handleFormSubmit = (values) => {
    this.saveAnswer(values);
  };

  handleTypingAnswer = (event) => {
    const values = lodashGet(event, 'target.value');
    const { input, setUserAnswers } = this.props;
    if (input && typeof input.onChange === 'function') input.onChange(values);
    setUserAnswers([values]);
  };

  render() {
    const {
      question,
      userAnswers,
      courseIid,
      isTesting,
      readOnly,
      isSurvey,
    } = this.props;

    const takeId = lodashGet(userAnswers, 'takeId');
    const questionIid = lodashGet(question, 'iid');
    const structureAnswer = lodashGet(question, 'structure_answer');
    const resultMarked = {
      score: lodashGet(userAnswers, 'score'),
      score_by_rubric: lodashGet(userAnswers, 'score_by_rubric'),
    };

    const isSp1 = question.sp1_layout;

    const theForm = (
      <OpenEndedSchemaForm
        formid={getFormId(this.props)}
        step="question"
        isTesting={isTesting}
        takeId={takeId}
        onSubmit={this.handleFormSubmit}
        structureAnswer={structureAnswer}
        courseIid={courseIid}
        question={question}
        questionIid={questionIid}
        resultMarked={resultMarked}
        params={{
          accept_files: question && question.accept_files,
          wordmin: question.wordmin,
          wordmax: question.wordmax,
        }}
        hideSubmitButton={readOnly || isSp1}
        readOnly={readOnly}
        isSp1={isSp1}
      />
    );

    /**
     * TODO: do not show 'teacher_comments' tab in testing mode
     * only show in normal mode, or in preview mode (When user is previewing his result
     */
    const showTeacherCommentsTab = Boolean(!isTesting && takeId);
    const showScore = Boolean(!isTesting && takeId);
    const score = lodashGet(userAnswers, 'score');
    const markerComment = lodashGet(
      last(lodashGet(userAnswers, 'comments')),
      'content',
    );

    if (isSp1) {
      return theForm;
    }

    return (
      <div>
        {userAnswers || isTesting ? (
          <div>
            {(() => {
              // TODO Hot fix check hien thi cau hoi cho servey
              if (isSurvey) {
                return (
                  <InputText.TextArea
                    {...this.props}
                    value={lodashGet(userAnswers, 0)}
                    title={t1('text')}
                    fullWidth
                    onChange={this.handleTypingAnswer}
                    autosize={{ minRows: 3, maxRows: 5 }}
                  />
                );
              }

              return (
                <div>
                  {showScore ? (
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <h3 style={{ fontWeight: 'bold' }}>
                            {t1('your_current_score')}:{' '}
                            {typeof score == 'undefined' ? (
                              t1('not_marked')
                            ) : (
                              <SuccessAlert inline>{score}</SuccessAlert>
                            )}
                          </h3>
                          <h3 style={{ fontWeight: 'bold' }}>
                            {markerComment ? (
                              <div>
                                {t1('marker_comment')}:
                                <SuccessAlert inline>
                                  {markerComment}
                                </SuccessAlert>
                              </div>
                            ) : null}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {!showTeacherCommentsTab ? (
                    theForm
                  ) : (
                    <Tabs defaultActiveKey="your_current_answer">
                      <Tabs.TabPane
                        tab={`${t1('your_current_answer')}`}
                        key="your_current_answer"
                      >
                        {theForm}
                      </Tabs.TabPane>
                      {Array.isArray(structureAnswer) &&
                        !!structureAnswer.length &&
                        !!lodashGet(
                          userAnswers,
                          'score_by_rubric.rubric_iid',
                        ) && (
                          <Tabs.TabPane
                            tab={t1('detail_marking')}
                            key="detail_marking"
                          >
                            <DetailMarkingByRubric
                              value={lodashGet(
                                userAnswers,
                                'score_by_rubric.detail',
                              )}
                              rubricIid={lodashGet(
                                userAnswers,
                                'score_by_rubric.rubric_iid',
                              )}
                              readOnly
                            />
                          </Tabs.TabPane>
                        )}
                      <Tabs.TabPane tab={`${t1('comments')}`} key="comments">
                        <OpenEndedQuestionComments
                          title={t1('comments')}
                          takeId={takeId}
                          questionIid={questionIid}
                          defaultShowDetailComments
                        />
                      </Tabs.TabPane>
                    </Tabs>
                  )}
                </div>
              );
            })()}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const isTesting = props.mode === 'exam';
  const question = props.question || {};

  const usedFor = lodashGet(props, 'question.used_for');

  // TODO Hot fix check hien thi cau hoi cho servey
  const isSurvey =
    Array.isArray(usedFor) && usedFor.length === 1 && usedFor[0] === 'survey';

  const courseIid = props.courseIid;
  const keyState = questionTakeState(courseIid, question.id);
  const userAnswers = isSurvey
    ? props.userAnswers
    : isTesting
    ? { answer: props.userAnswers }
    : state.dataApiResults[keyState];
  const userIid = getLearningItemUserIidSelector(state)(learnItemIid);
  const mode = getLearningItemModeSelector(state)(learnItemIid);

  return {
    userAnswers,
    isTesting,
    isSurvey,
    userIid,
    readOnly: mode === 'preview_test',
  };
};

export default connect(mapStateToProps)(OpenEnded);
