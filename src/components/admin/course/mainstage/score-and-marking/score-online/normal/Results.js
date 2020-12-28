import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import nodeSagaActions from 'actions/node/saga-creators';
import { isAcademicScoreRubric } from 'common/learn';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes, scoreScaleTypes } from 'configs/constants';
import MarkingRubric from 'components/common/rubric/index';
import get from 'lodash.get';
import { createSelector } from 'reselect';
import { CourseActions } from 'configs/constants/permission';
import ExportStudentComponent from 'components/admin/course/mainstage/score-and-marking/score-online/common/export-student';
import PublishTranscript from 'components/admin/course/mainstage/score-and-marking/score-online/common/publish-transcript';
import Answers from 'components/admin/group_assignment/group/manage/marking/answers';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RubricRender from './RubricRender';
import PMDRubricRender from './PMDRubricRender';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new';
import schemaComment from 'components/admin/course/schema/comment-final-rubric/schema-form';

class Results extends Component {
  componentDidMount() {
    if (this.props.resultId) {
      this.getProgressOfGraduatingSeniors(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { resultId } = this.props;

    if (resultId !== nextProps.resultId) {
      this.getProgressOfGraduatingSeniors(nextProps);
    }
  }

  changeRubricProgress = (progressValue, rubricIid, userIid) => {
    const { dispatch } = this.props;
    const url = apiUrls.set_rubric_progress;
    const params = {
      progress: progressValue,
      skill_iid: rubricIid,
      user_iid: userIid,
      course_iid: get(this.props, 'node.iid'),
      p_original: progressValue,
    };

    dispatch(
      sagaActions.setRubricProgress({
        url,
        params,
        executeOnSuccess: () => this.getProgressOfGraduatingSeniors(this.props),
      }),
    );
  };

  getProgressOfGraduatingSeniors = (props) => {
    const {
      dispatch,
      node,
      keyState,
      searchValues,
      userIids,
      users,
      score_scale,
    } = props;
    if (!Array.isArray(users) || !users.length) {
      return;
    }
    const url = apiUrls.get_progress_of_graduating_seniors;

    if (!Array.isArray(users) || !users.length) {
      return;
    }
    dispatch(
      nodeSagaActions.getDataRequest(
        { url, keyState, post: true },
        {
          course_iid: get(node, 'iid'),
          users: users.map((user) => ({
            iid: user.iid,
            score_scale: get(score_scale, `[${user.iid}]`),
          })),
          ...searchValues,
        },
      ),
    );
  };

  getAcademicScoreRubric = () => {
    const { rubrics } = this.props;
    return (
      Array.isArray(this.props.rubrics) && rubrics.find(isAcademicScoreRubric)
    );
  };

  renderMarking = ({
    rubric,
    user,
    progress,
    scoreScale,
    rubricParentSubType,
    isEditScore,
  }) => (
    <MarkingRubric
      progress={progress}
      user={user}
      fullData
      anythingValue
      rubric={rubric}
      node={get(this.props, 'node')}
      scoreScale={scoreScale}
      className="marking-rubric-container"
      onChange={(progressValue) => {
        this.changeRubricProgress(progressValue, rubric.iid, user.iid);
      }}
      handleSaveProgressSuccessfully={() =>
        this.getProgressOfGraduatingSeniors(this.props)
      }
      rubricParentSubType={rubricParentSubType}
    />
  );

  handleExportPmdResult = (user) => {
    const { id, dispatch, form } = this.props;

    dispatch(
      nodeSagaActions.exportDataRequest(
        apiUrls.export_course_pmd_result_of_student,
        {
          user_iid: user.iid,
          course_iid: get(this.props, 'node.iid'),
        },
      ),
    );
  };

  renderGroupAssignment = (user, rubric) => {
    const assignment = get(user, 'assignment');
    if (
      get(assignment, 'answers.length', 0) === 0 ||
      get(assignment, 'rubric_iid') !== rubric.iid
    ) {
      return null;
    }

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <div onClick={showFull}>
            {t1('%d answers ', [get(assignment, 'answers.length', 0)])}
          </div>
        )}
        renderFull={({ closeDialog }) => (
          <Answers group={assignment} displayField={{ actions: false }} />
        )}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  };

  commentFinalScore = (user) => (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <span>
          &nbsp;
          <Icon
            icon="note"
            className="action comment-final-score"
            onClick={showFull}
          />
        </span>
      )}
      renderFull={({ closeDialog }) => {
        const rubric = this.props.rubric;
        return (
          <NodeNew
            alternativeApi={apiUrls.tracker_progress_save(true)}
            formid={'comment-final-rubric'}
            step="comment"
            resetForm
            mode="edit"
            hiddenFields={{
              userIid: user && user.iid,
            }}
            node={{
              progress: [
                {
                  tco_iid: rubric.iid,
                  sc: get(user, `progress.${rubric.iid}.comment`),
                },
              ],
            }}
            ntype="progress"
            schema={schemaComment}
            searchFormId={this.props.formid}
            requestSuccessful={closeDialog}
          />
        );
      }}
    />
  );

  render() {
    const {
      className,
      normalRubrics,
      pmdRubrics,
      normalScoreScaleUsers,
      pmdScoreScaleUsers,
      progresses,
      node,
      searchValues,
      themeConfig,
      rubric,
      conditions,
      score_scale,
      attendance,
      permissions,
      hasPermission,
      hasPermSubmitFileTranscript,
      hasPermUpdateTranscriptStatus,
    } = this.props;
    const isSis = themeConfig.type === schoolTypes.SIS;
    const isEditScore =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_EDIT_SCORE,
        get(node, 'iid'),
        permissions,
      );

    return (
      <Fragment>
        <div>
          <span>{t1('score_scale')}</span>: <b>{node.score_scale}</b>
        </div>
        {get(normalScoreScaleUsers, 'length', 0) > 0 && (
          <RubricRender
            rubrics={normalRubrics}
            progresses={progresses}
            renderMarking={this.renderMarking}
            renderGroupAssignment={this.renderGroupAssignment}
            commentFinalScore={this.commentFinalScore}
            users={normalScoreScaleUsers}
            isSis={isSis}
            searchValues={searchValues}
            className={`${className || ''} ${this.cssClass}`}
            node={node}
            rubricOriginal={rubric}
            handleSaveProgressSuccessfully={() => {
              this.getProgressOfGraduatingSeniors(this.props);
            }}
            conditions={conditions}
            score_scale={score_scale}
            attendance={attendance}
            isEditScore={isEditScore}
            hasPermUpdateTranscriptStatus={hasPermUpdateTranscriptStatus}
          />
        )}
        {get(pmdScoreScaleUsers, 'length', 0) > 0 && (
          <PMDRubricRender
            rubrics={pmdRubrics}
            progresses={progresses}
            renderMarking={this.renderMarking}
            renderGroupAssignment={this.renderGroupAssignment}
            users={pmdScoreScaleUsers}
            isSis={isSis}
            handleSaveProgressSuccessfully={() =>
              this.getProgressOfGraduatingSeniors(this.props)
            }
            searchValues={searchValues}
            className={`${className || ''} ${this.cssClass}`}
            node={node}
            rubric={rubric}
            conditions={conditions}
            score_scale={score_scale}
            attendance={attendance}
            commentFinalScore={this.commentFinalScore}
            handleExportPmdResult={this.handleExportPmdResult}
            isEditScore={isEditScore}
            hasPermUpdateTranscriptStatus={hasPermUpdateTranscriptStatus}
          />
        )}

        <hr />
        <PublishTranscript {...this.props} />
        <ExportStudentComponent {...this.props} style={{ marginTop: 10 }} />
      </Fragment>
    );
  }
}

const convertDataRubrics = (items) => {
  const pmdRubrics = [];
  const normalRubrics = [];

  if (!items) return {};

  items.forEach((rubric) => {
    if (['attendance', 'academic_score'].includes(get(rubric, 'sub_type'))) {
      if (get(pmdRubrics, 'length', 0) <= 1) {
        pmdRubrics.push(rubric);
      }
      normalRubrics.push(rubric);
    } else if (get(rubric, 'children[0].type', '') === 'pmd_rubric') {
      // pmdRubrics.push(rubric);
    } else {
      normalRubrics.push(rubric);
    }
  });
  return {
    pmdRubrics,
    normalRubrics,
  };
};

const findGroupAssignmentOfUser = (user, assignments) => {
  if (!assignments) return null;

  const length = assignments.length;
  for (let index = 0; index < length; index += 1) {
    const users = get(assignments, `[${index}].users`);
    if (!users) {
      continue;
    }

    const u = users.find((iid) => user.iid === iid);
    if (u) {
      return assignments[index];
    }
  }
};

const convertDataUser = (users, assignments, scoreScale) => {
  if (!users) return {};

  const pmdScoreScaleUsers = [];
  const normalScoreScaleUsers = [];

  users.forEach((user) => {
    user.assignment = findGroupAssignmentOfUser(user, assignments);
    if (get(scoreScale, `[${user.iid}]`, '') === scoreScaleTypes.pmd) {
      pmdScoreScaleUsers.push(user);
    } else {
      normalScoreScaleUsers.push(user);
    }
  });
  return { pmdScoreScaleUsers, normalScoreScaleUsers };
};

const mapStateToProps = createSelector(
  (state, props) => `progresses-${get(props, 'node.iid')}`,
  (state, props) => state.dataApiResults,
  (state) => getThemeConfig(state),
  (state, props) => props.rubric,
  (state, props) => props.users,
  (state, props) => props.assignments,
  (state, props) => props.conditions,
  (state, props) => props.score_scale,
  (
    keyState,
    progresses,
    themeConfig,
    rubric,
    users,
    assignments,
    conditions,
    score_scale,
  ) => {
    const progressesResult = get(progresses, `[${keyState}]`);
    return {
      keyState,
      themeConfig,
      progresses: get(progressesResult, 'progresses') || {},
      conditions: get(progressesResult, 'conditions') || conditions,
      userIids: users && users.map((user) => get(user, 'iid')),
      ...convertDataRubrics(get(rubric, 'children')),
      ...convertDataUser(users, assignments, score_scale),
    };
  },
);

export default connect(mapStateToProps)(Results);
