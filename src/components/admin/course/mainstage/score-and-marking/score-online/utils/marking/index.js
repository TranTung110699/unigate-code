/**
 * Created by vohung on 08/09/2017.
 */
import React, { Component } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import sagaNodeActions from 'actions/node/saga-creators';
// import sagaActions from 'actions/saga-creators';
import NewForm from 'components/admin/node/new';
import CircularProgress from 'material-ui/CircularProgress';
import Attachments from 'components/admin/course/mainstage/marking/Attachments';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { getNodeSelector } from 'components/admin/node/utils';
import { mapObject } from 'common/utils/object';
import apiUrls from 'api-endpoints';
import DisplayHtml from 'components/common/html';
import Rubric from 'components/admin/skill/skill/rubric';
import ViewOpenEndedAnswer from './ViewOpenEndedAnswer';
import {
  getKeyStateForRubricProgress,
  getKeyStateTakeDetail,
} from '../keyState';
import schema from 'components/admin/take/schema/form';
import Widget from 'components/common/Widget';
import { timestampToDateString } from 'common/utils/Date';
import OpenEndedQuestionComments from 'components/common/comment/open-ended-answer-comment';
import lodashGet from 'lodash.get';

import './stylesheet.scss';

class Marking extends Component {
  style = { paddingTop: 200, textAlign: 'center' };

  cssClass = 'report-dashboard-marking';

  constructor(props) {
    super(props);
    this.state = {
      suggestedScore: null,
      rubricMarkingValues: null,
      rubricIidsToShowMarking: null,
    };
  }

  componentWillMount() {
    const { userIid, assignmentGroupForMarkingIid } = this.props;
    this.getData(userIid);
    if (
      userIid &&
      assignmentGroupForMarkingIid &&
      userIid !== assignmentGroupForMarkingIid
    ) {
      this.getData(assignmentGroupForMarkingIid);
    }
  }

  getData = (userIid) => {
    this.getTakeDetail(userIid);
    this.getUserProgressForRubric(userIid);
  };

  getTakeDetail = (userIid) => {
    const {
      nodeIid,
      dispatch,
      item,
      peerMarking,
      assignmentGroupForMarkingIid,
    } = this.props;
    if (!nodeIid || !item || !item.iid || !userIid) {
      return;
    }

    let params = {
      userIid,
      course: nodeIid,
      item_iid: item.iid,
      item_ntype: item.ntype,
      peer_marking: peerMarking ? 1 : 0,
    };

    if (assignmentGroupForMarkingIid) {
      params = {
        ...params,
        assignment_group: assignmentGroupForMarkingIid,
      };
    }

    const url = apiUrls.getTakeDetail;
    const keyState = getKeyStateTakeDetail(userIid, nodeIid, item);
    dispatch(
      sagaNodeActions.getDataRequest(
        {
          url,
          keyState,
          post: true,
        },
        params,
      ),
    );
  };

  getUserProgressForRubric = (userIid) => {
    const { nodeIid, dispatch, item, rubric } = this.props;
    if (!nodeIid || !userIid || !item || !item.iid || !rubric || !rubric.iid) {
      return;
    }

    dispatch(
      sagaNodeActions.getDataRequest(
        {
          url: apiUrls.tracker_progress_get(),
          keyState: getKeyStateForRubricProgress(userIid, nodeIid, item),
        },
        {
          ciid: nodeIid,
          tcos: rubric.iid,
          children: 1,
          depth: 3,
          userIid,
        },
      ),
    );
  };

  onUpdateSuccess = () => {
    this.getData();
    const { userIid, dispatch, rubric } = this.props;
    const { rubricMarkingValues } = this.state;
    if (rubric && rubricMarkingValues) {
      dispatch(
        sagaNodeActions.submitFormRequest('', {
          extraParams: {
            iids: Object.keys(rubricMarkingValues),
            scale: rubric.scale,
          },
          url: apiUrls.set_scale_for_skills,
          executeOnSuccess: () => {
            dispatch(
              sagaNodeActions.submitFormRequest('', {
                extraParams: {
                  user_iid: userIid,
                  progresses: rubricMarkingValues,
                },
                url: apiUrls.set_rubric_progress,
              }),
            );
          },
        }),
      );
    }
  };

  setRubricToShowMarking = (rubricIidsToShowMarking) => {
    this.setState({ rubricIidsToShowMarking });
  };

  render() {
    const {
      peerMarking,
      takeDetail,
      groupTakeDetail,
      formid,
      searchFormId,
      item,
      courseIid,
      assignmentGroupForMarkingIid,
      rubric,
      rubricProgress,
      defaultCommentIdToFocus,
    } = this.props;
    if (!takeDetail) {
      return (
        <div style={this.style}>
          <CircularProgress size={60} thickness={5} />
        </div>
      );
    }

    const isMarkingOpenEndedQuestion =
      get(item, 'ntype') === 'question' &&
      get(item, 'type') === questionTypes.TYPE_OPEN_ENDED;

    const isMarkingOpenEndedQuestionByStructureAnswer =
      isMarkingOpenEndedQuestion && get(item, 'sub_type') === 'advanced';
    const rubricMarking =
      isMarkingOpenEndedQuestionByStructureAnswer &&
      get(item, 'rubric_marking.0');

    if (takeDetail && !takeDetail.takeId) {
      return <p>{t1('the_user_has_not_taken_the_test_yet')}</p>;
    }
    const hiddenFields = {};
    if (item.ntype === 'question') {
      hiddenFields.question = item.iid;
    }
    if (
      groupTakeDetail &&
      groupTakeDetail.takeId &&
      groupTakeDetail.score &&
      groupTakeDetail.takeId !== takeDetail.takeId
    ) {
      hiddenFields.group_score = groupTakeDetail.score;
    }
    const { suggestedScore } = this.state;
    if (typeof suggestedScore === 'number') {
      hiddenFields.suggestedScore = suggestedScore;
    }

    return (
      <div className={`${this.cssClass}`}>
        {rubric && (
          <Widget
            title={t1('rubric')}
            subtitle={t1('click_to_show/hide')}
            className={
              isMarkingOpenEndedQuestionByStructureAnswer ? 'col-md-12' : ''
            }
          >
            <Rubric
              defaultMarkingValues={
                rubricProgress &&
                mapObject(rubricProgress, (value) => value && value.p)
              }
              onMarkingOverallValueChange={(value) => {
                this.setState({ suggestedScore: value });
              }}
              onMarkingValuesChange={(values) => {
                this.setState({ rubricMarkingValues: values });
              }}
              className={`${this.cssClass}__rubric`}
              mode="marking"
              node={rubric}
            />
          </Widget>
        )}
        <div className="row">
          <div
            id="scroll-inside-me"
            style={{ display: 'inline-block', width: '100%' }}
          >
            {isMarkingOpenEndedQuestion && !assignmentGroupForMarkingIid && (
              <div className="sticky-card col-md-6">
                <Widget title={t1('user_answer')}>
                  <ViewOpenEndedAnswer
                    key="view-open-ended-answer"
                    question={item}
                    takeDetail={takeDetail}
                    setRubricToShowMarking={this.setRubricToShowMarking}
                  />
                </Widget>
              </div>
            )}

            <Widget title={t1('mark_score')} className="col-md-6">
              <NewForm
                rubricMarking={rubricMarking}
                rubricIidsToShowMarking={this.state.rubricIidsToShowMarking}
                schema={schema}
                hiddenFields={{
                  course: courseIid,
                  take_id: get(takeDetail, 'takeId'),
                  peer_marking: peerMarking ? 1 : 0,
                }}
                isCourse={1}
                mode="edit"
                step="set_question_score"
                ntype="take"
                node={{
                  score_by_rubric: {
                    rubric_iid: get(rubricMarking, 'iid'),
                  },
                  ...takeDetail,
                  id: get(takeDetail, 'takeId'),
                  question: get(takeDetail, 'iid'),
                }}
                params={hiddenFields}
                formid={formid}
                searchFormId={searchFormId}
                alternativeApi={'/take/update'}
                requestSuccessful={this.onUpdateSuccess}
                closeModal={false}
              />
            </Widget>
          </div>
        </div>
        {Array.isArray(takeDetail.comments) && !!takeDetail.comments.length && (
          <Widget
            title={t1('histories')}
            className={
              isMarkingOpenEndedQuestionByStructureAnswer ? 'col-md-12' : ''
            }
          >
            {takeDetail.comments.map((comment, index) => (
              <div>
                <Paper
                  className={`${this.cssClass}__take-comment`}
                  key={`${takeDetail.takeId}-comments-${index}`}
                >
                  <div className={`${this.cssClass}__take-comment-score`}>
                    {t1('score')}: <b>{comment.score || ''}</b>
                  </div>

                  <div className={`${this.cssClass}__take-comment-account`}>
                    {t1('by')}: <b>{comment.u && comment.u.name}</b>
                    {timestampToDateString(comment.ts, { showTime: true })}
                  </div>

                  <div className={`${this.cssClass}__take-comment-content`}>
                    {comment.content && (
                      <div>
                        <DisplayHtml content={comment.content} />
                      </div>
                    )}
                    {comment.attachments && comment.attachments.length && (
                      <Attachments attachments={comment.attachments} />
                    )}
                  </div>
                </Paper>
              </div>
            ))}
          </Widget>
        )}

        {isMarkingOpenEndedQuestion ? (
          <Widget
            style={{ overflow: 'hidden' }}
            className={
              isMarkingOpenEndedQuestionByStructureAnswer ? 'col-md-12' : ''
            }
          >
            <OpenEndedQuestionComments
              title={t1('comments')}
              questionIid={lodashGet(item, 'iid')}
              takeId={lodashGet(takeDetail, 'takeId')}
              defaultShowDetailComments
              defaultCommentIdToFocus={defaultCommentIdToFocus}
            />
          </Widget>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { userIid, nodeIid, item, assignmentGroupForMarkingIid } = props;
  let rubric = item && item.rubric;
  if (rubric) {
    rubric = getNodeSelector(state)(rubric.iid, undefined, -1) || rubric;
  }
  const keyState = getKeyStateTakeDetail(userIid, nodeIid, item);
  const rubricProgressKeyState = getKeyStateForRubricProgress(
    userIid,
    nodeIid,
    item,
  );

  let groupTakeDetail;
  let groupRubricProgress;
  if (assignmentGroupForMarkingIid) {
    const keyStateForAssignmentTake = getKeyStateTakeDetail(
      assignmentGroupForMarkingIid,
      nodeIid,
      item,
    );
    const keyStateForAssignmentRubricProgress = getKeyStateForRubricProgress(
      assignmentGroupForMarkingIid,
      nodeIid,
      item,
    );
    groupTakeDetail = state.dataApiResults[keyStateForAssignmentTake];
    groupRubricProgress =
      state.dataApiResults[keyStateForAssignmentRubricProgress];
  }

  return {
    formid: keyState,
    takeDetail: state.dataApiResults[keyState],
    groupTakeDetail,
    rubricProgress: state.dataApiResults[rubricProgressKeyState],
    groupRubricProgress,
    rubric,
  };
};

export default connect(mapStateToProps)(Marking);
