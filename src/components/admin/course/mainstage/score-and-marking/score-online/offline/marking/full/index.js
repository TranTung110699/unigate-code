import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import nodeSagaActions from 'actions/node/saga-creators';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import Finalize from 'components/admin/course/mainstage/score-and-marking/score-online/common/finalize';
import apiUrls from 'api-endpoints';
import { isAcademicScoreRubric } from 'common/learn';
import './stylesheet.scss';

const getKeyState = (user) =>
  `admin-course-offline-exam-marking-full-${user.iid}`;

class Full extends React.Component {
  cssClass = 'admin-course-offline-exam-marking-full';

  componentDidMount() {
    this.getProgressOfUserCourse();
  }

  getProgressOfUserCourse = () => {
    const { node, user, dispatch } = this.props;
    dispatch(
      nodeSagaActions.getDataRequest(
        {
          url: 'site/api/get-progress-of-user-for-offline-exam-marking',
          keyState: getKeyState(user),
        },
        {
          iid: node.iid,
          user_iid: user.iid,
        },
      ),
    );
  };

  getAcademicScoreRubric = () => {
    const { progressOfUserCourse } = this.props;
    const { rubrics } = progressOfUserCourse || {};
    return Array.isArray(rubrics) && rubrics.find(isAcademicScoreRubric);
  };

  handleNewScoreMarked = (value) => {
    const academicScoreRubric = this.getAcademicScoreRubric();
    const { dispatch, user, node, searchFormId } = this.props;
    if (!academicScoreRubric) {
      return;
    }
    const url = apiUrls.save_offline_exam_academic_score;
    const params = {
      user_iid: user.iid,
      offline_exam_iid: node.iid,
      academic_score_rubric_iid: academicScoreRubric.iid,
      score: value,
    };

    dispatch(
      nodeSagaActions.submitFormRequest('', {
        extraParams: params,
        url,
        executeOnSuccess: this.getProgressOfUserCourse,
        formidToSubmitOnSuccess: searchFormId,
      }),
    );
  };

  getAcademicScoreHistories = () => {
    const { progressOfUserCourse } = this.props;
    const { progress: userProgress } = progressOfUserCourse || {};
    const academicScoreRubric = this.getAcademicScoreRubric();
    if (!academicScoreRubric) {
      return undefined;
    }
    return userProgress[academicScoreRubric.iid].histories;
  };

  getCourseProgressHistories = () => {
    const { progressOfUserCourse } = this.props;
    const { progress: userProgress, course_iid: courseIid } =
      progressOfUserCourse || {};
    return userProgress && userProgress[courseIid].histories;
  };

  getOriginalAcademicScoreConverted = (nth) => {
    const histories = this.getAcademicScoreHistories();
    if (!Array.isArray(histories)) {
      return undefined;
    }
    const h = histories.find((item) => !item.exam_resit_nth);
    return h && h.p_converted;
  };

  getResitScoreConverted = (nth) => {
    const histories = this.getAcademicScoreHistories();
    if (!Array.isArray(histories)) {
      return undefined;
    }
    const h = histories.find((item) => item.exam_resit_nth === nth);
    return h && h.p_converted;
  };

  getNumberOfResits = () => {
    const { node } = this.props;
    const histories = this.getAcademicScoreHistories();
    if (!Array.isArray(histories) || histories.length === 0) {
      return 0;
    }
    return Math.max(histories.length - 1, (node && node.exam_resit_nth) || 0);
  };

  getGraduatedOfThisResitOrFinalExam = () => {
    const { node, progressOfUserCourse } = this.props;
    const { progress: userProgress, course_iid: courseIid } =
      progressOfUserCourse || {};
    const resitNth = node && node.exam_resit_nth;
    const histories = this.getCourseProgressHistories();
    if (!Array.isArray(histories)) {
      return undefined;
    }
    const h = histories.find((item) =>
      !resitNth ? !item.exam_resit_nth : item.exam_resit_nth === resitNth,
    );
    return h && h.graduated;
  };

  render() {
    const {
      className,
      node,
      progressOfUserCourse,
      user,
      searchValues,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const { progress: userProgress, rubrics, course_iid: courseIid } =
      progressOfUserCourse || {};
    if (!Array.isArray(rubrics) || rubrics.length === 0) {
      return null;
    }

    return (
      <div className={componentClassName}>
        <Table className={`${this.cssClass}__table`} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {rubrics.map((item, index) => (
                <TableHeaderColumn
                  key={index}
                  className={`${this.cssClass}__th-score`}
                >
                  {item && item.name}
                </TableHeaderColumn>
              ))}
              {this.getNumberOfResits() && (
                <TableHeaderColumn className={`${this.cssClass}__th-new-score`}>
                  {t1('exam_resit_scores')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn className={`${this.cssClass}__th-score`}>
                {t1('average_score')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%">
                {t1('graduated')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {((user) => {
              const graduated =
                userProgress &&
                userProgress[courseIid] &&
                userProgress[courseIid].graduated;

              const graduatedOfThisResitOrExam = this.getGraduatedOfThisResitOrFinalExam();

              const average =
                userProgress &&
                userProgress[courseIid] &&
                userProgress[courseIid].average;

              const averageConverted =
                userProgress &&
                userProgress[courseIid] &&
                userProgress[courseIid].average_converted;

              return (
                <TableRow>
                  {rubrics
                    .filter((rubric) => !isAcademicScoreRubric(rubric))
                    .map((rubric, rubricIndex) => {
                      const progressConverted =
                        userProgress &&
                        userProgress[rubric.iid] &&
                        userProgress[rubric.iid].p_converted;

                      return (
                        <TableRowColumn
                          key={rubricIndex}
                          className={`${this.cssClass}__td-score`}
                        >
                          {progressConverted}
                        </TableRowColumn>
                      );
                    })}
                  <TableRowColumn className={`${this.cssClass}__td-score`}>
                    {!node.exam_resit_nth &&
                    typeof graduatedOfThisResitOrExam === 'undefined' ? (
                      <Marking
                        label={
                          typeof this.getOriginalAcademicScoreConverted() ===
                          'undefined' ? (
                            <a>
                              <Icon icon="edit" />
                            </a>
                          ) : (
                            this.getOriginalAcademicScoreConverted()
                          )
                        }
                        scoreScale={searchValues && searchValues.score_scale}
                        onChange={this.handleNewScoreMarked}
                      />
                    ) : (
                      this.getOriginalAcademicScoreConverted()
                    )}
                  </TableRowColumn>
                  {this.getNumberOfResits() && (
                    <TableRowColumn className={`${this.cssClass}__td-score`}>
                      <ul className={`${this.cssClass}__resit-score-list`}>
                        {[...Array(this.getNumberOfResits()).keys()].map(
                          (index) => {
                            const nth = index + 1;
                            const resitScoreConverted = this.getResitScoreConverted(
                              nth,
                            );
                            if (
                              nth === node.exam_resit_nth &&
                              typeof graduatedOfThisResitOrExam === 'undefined'
                            ) {
                              return (
                                <li
                                  className={`${this.cssClass}__resit-score`}
                                  key={index}
                                >
                                  <div
                                    className={`${
                                      this.cssClass
                                    }__resit-score-nth`}
                                  >
                                    {nth}:
                                  </div>
                                  <Marking
                                    label={
                                      typeof resitScoreConverted ===
                                      'undefined' ? (
                                        <a>
                                          <Icon icon="edit" />
                                        </a>
                                      ) : (
                                        resitScoreConverted
                                      )
                                    }
                                    scoreScale={
                                      searchValues && searchValues.score_scale
                                    }
                                    onChange={this.handleNewScoreMarked}
                                  />
                                </li>
                              );
                            }
                            return (
                              <li
                                className={`${this.cssClass}__resit-score`}
                                key={index}
                              >
                                <div
                                  className={`${
                                    this.cssClass
                                  }__resit-score-nth`}
                                >
                                  {nth}:
                                </div>
                                <div>{resitScoreConverted}</div>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </TableRowColumn>
                  )}
                  <TableRowColumn className={`${this.cssClass}__td-score`}>
                    {averageConverted}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {typeof graduated !== 'undefined' && (
                      <span
                        className={`${this.cssClass}__graduated-label\
                        ${
                          graduated
                            ? `${this.cssClass}__graduated-label--passed`
                            : `${this.cssClass}__graduated-label--failed`
                        }`}
                      >
                        {graduated ? t1('passed') : t1('failed')}
                      </span>
                    )}
                    {typeof graduatedOfThisResitOrExam === 'undefined' && (
                      <Finalize
                        Component={(props) => (
                          <a {...props}>
                            <Icon icon="edit" />
                          </a>
                        )}
                        user={user}
                        offlineExamIid={node.iid}
                        node={{ iid: courseIid }}
                        score={average}
                        graduated={graduated}
                      />
                    )}
                  </TableRowColumn>
                </TableRow>
              );
            })(user)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Full.propTypes = {
  className: PropTypes.string,
};

Full.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const { user } = props;
  return {
    progressOfUserCourse: getDataApiResultSelector(state)(getKeyState(user)),
  };
};

export default connect(mapStateToProps)(Full);
