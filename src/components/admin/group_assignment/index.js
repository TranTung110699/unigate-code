import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isGroupAssignment } from 'common/learn';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import routes from 'routes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { timestampToDateTimeString } from 'common/utils/Date';
import UserAvatarList from 'components/common/users-avatar-list';
import GroupAdd from './group/add';
import fetchData from './fetchData';
import MarkingTeachers from './marking-teachers';
import './stylesheet.scss';

class GroupAssignmentLayout extends React.Component {
  flatButtonLabelStyle = { textTransform: 'none', fontWeight: 'normal' };
  cssClass = 'group-assignment-layout';

  handleAssignGroupButtonClick = (groupAssignment, exercise) => {
    const { dispatch, node, fetchSyllabus } = this.props;
    const contentDialog = (
      <GroupAdd
        course={node}
        exercise={exercise}
        groupAssignment={groupAssignment}
        requestSuccessful={
          typeof fetchSyllabus === 'function' ? fetchSyllabus : null
        }
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('new_student_group'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, syllabus, node: course } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <Table className={`${this.cssClass}__content`} selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow displayBorder={false}>
              <TableHeaderColumn
                rowSpan={2}
                className={`${this.cssClass}__content-name-header`}
              >
                {t1('assignment')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan={2}
                className={`${this.cssClass}__content-info-header`}
              >
                {t1('info')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan={2}
                className={`${this.cssClass}__content-marking-teachers-header`}
              >
                {t1('marking_teachers')}
              </TableHeaderColumn>
              <TableHeaderColumn
                colSpan={3}
                className={`${this.cssClass}__content-exercises-header`}
              >
                {t1('projects')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableHeaderColumn
                className={`${this.cssClass}__content-exercises-name-header`}
              >
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn
                className={`${this.cssClass}__content-exercises-members-header`}
              >
                {t1('students')}
              </TableHeaderColumn>
              <TableHeaderColumn
                className={`${this.cssClass}__content-exercises-actions-header`}
              >
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {syllabus &&
              Array.isArray(syllabus.children) &&
              syllabus.children.map(
                (maybeGroupAssignment) =>
                  isGroupAssignment(maybeGroupAssignment) &&
                  (() => {
                    const filteredExercises =
                      (Array.isArray(maybeGroupAssignment.children) &&
                        maybeGroupAssignment.children.filter(
                          (exercise) => exercise,
                        )) ||
                      [];

                    const scoRowsColumn = [
                      <TableRowColumn
                        key={`${maybeGroupAssignment.iid}-general`}
                        className={`${this.cssClass}__content-cell\
                          ${this.cssClass}__content-cell--general`}
                        rowSpan={filteredExercises.length || 1}
                      >
                        <h2 className={`${this.cssClass}__content-name`}>
                          {maybeGroupAssignment.name}
                        </h2>
                        <h2 className={`${this.cssClass}__content-iid`}>
                          (#
                          {maybeGroupAssignment.iid})
                        </h2>
                      </TableRowColumn>,
                      <TableRowColumn
                        key={`${maybeGroupAssignment.iid}-info`}
                        className={`${this.cssClass}__content-cell\
                          ${this.cssClass}__content-cell--info`}
                        rowSpan={filteredExercises.length || 1}
                      >
                        <div>
                          <span
                            className={`${this.cssClass}__content-time-title`}
                          >
                            {t1('start_time')}:
                          </span>
                          <span
                            className={`${this.cssClass}__content-time-value`}
                          >
                            {maybeGroupAssignment.start_time
                              ? timestampToDateTimeString(
                                  maybeGroupAssignment.start_time,
                                )
                              : ''}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`${this.cssClass}__content-time-title`}
                          >
                            {t1('end_time')}:
                          </span>
                          <span
                            className={`${this.cssClass}__content-time-value`}
                          >
                            {maybeGroupAssignment.end_time
                              ? timestampToDateTimeString(
                                  maybeGroupAssignment.end_time,
                                )
                              : ''}
                          </span>
                        </div>
                      </TableRowColumn>,
                      <TableRowColumn
                        key={`${maybeGroupAssignment.iid}-marking-teachers`}
                        className={`${this.cssClass}__content-cell\
                          ${this.cssClass}__content-cell--marking-teachers`}
                        rowSpan={filteredExercises.length || 1}
                      >
                        <MarkingTeachers
                          course={course}
                          groupAssignment={maybeGroupAssignment}
                        />
                      </TableRowColumn>,
                    ];

                    if (filteredExercises.length === 0) {
                      return (
                        <TableRow displayBorder={false}>
                          {scoRowsColumn}
                          <TableRowColumn />
                          <TableRowColumn />
                          <TableRowColumn />
                        </TableRow>
                      );
                    }

                    return filteredExercises.map(
                      (exercise, exerciseIndex, validatedExercise) => (
                        <TableRow
                          displayBorder={false}
                          className={`${this.cssClass}__content-exercise\
                            ${
                              exerciseIndex === validatedExercise.length - 1
                                ? `${this.cssClass}__content-exercise--last`
                                : ''
                            }`}
                        >
                          {exerciseIndex === 0 && scoRowsColumn}
                          <TableRowColumn
                            className={`${this.cssClass}__exercise-general`}
                          >
                            <h3
                              className={`${
                                this.cssClass
                              }__content-exercise-name`}
                            >
                              {exercise.name}
                            </h3>
                            <h3
                              className={`${
                                this.cssClass
                              }__content-exercise-iid`}
                            >
                              (#
                              {exercise.iid})
                            </h3>
                          </TableRowColumn>
                          <TableRowColumn>
                            <UserAvatarList
                              users={
                                exercise.assignment_group &&
                                exercise.assignment_group.users
                              }
                            />
                          </TableRowColumn>
                          <TableRowColumn
                            className={`${
                              this.cssClass
                            }__content-exercise-info`}
                          >
                            {exercise.assignment_group ? (
                              <FlatButton
                                label={t1('view_details')}
                                icon={<Icon icon="group" />}
                                labelPosition={'after'}
                                labelStyle={this.flatButtonLabelStyle}
                                containerElement={
                                  <Link
                                    to={routes.url(
                                      'node_edit',
                                      Object.assign({}, course, {
                                        step: 'assignments',
                                        stepNodes: [
                                          maybeGroupAssignment,
                                          exercise,
                                        ],
                                      }),
                                    )}
                                  />
                                }
                              />
                            ) : (
                              <FlatButton
                                label={t1('assign_groups')}
                                icon={<Icon icon="add" />}
                                labelPosition={'after'}
                                labelStyle={this.flatButtonLabelStyle}
                                onClick={() =>
                                  this.handleAssignGroupButtonClick(
                                    maybeGroupAssignment,
                                    exercise,
                                  )
                                }
                              />
                            )}
                          </TableRowColumn>
                        </TableRow>
                      ),
                    );
                  })(),
              )}
          </TableBody>
        </Table>

        <div className="m-l-20 m-t-20 m-b-10">
          <Link to={`/admin/syllabus/${this.props.syllabus.iid}`}>
            <RaisedButton label={t1('manage_assignments')} primary />
          </Link>
        </div>
      </div>
    );
  }
}

GroupAssignmentLayout.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  fetchSyllabus: PropTypes.func,
  history: PropTypes.shape(),
  node: PropTypes.shape(),
  syllabus: PropTypes.shape(),
};

GroupAssignmentLayout.defaultProps = {
  className: '',
  dispatch: null,
  fetchSyllabus: null,
  history: null,
  node: null,
  syllabus: PropTypes.shape(),
};

export default fetchData(withRouter(connect()(GroupAssignmentLayout)));
