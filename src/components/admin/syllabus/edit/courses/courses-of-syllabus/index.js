import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import sagaActions from 'actions/node/saga-creators';
import routes from 'routes';
import { t1 } from 'translate';
import { history } from 'store';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Icon from 'components/common/Icon';
import NewCourseForm from 'components/admin/course/new/Form';
import actions from 'actions/node/creators';
import Links from 'routes/links';
import StaffList from 'components/common/staff-list';

const keyState = 'listCourse';
const width = {
  action: '170px',
};

class CoursesOfSyllabus extends Component {
  style = { marginTop: '10px' };
  spanStyle = { marginLeft: '20px', color: 'red' };

  componentWillMount() {
    const node = this.props.node || {};
    this.getCourses(node.iid);
  }

  getCourses = (syllabus) => {
    const { dispatch } = this.props;
    const url = '/course/my';
    dispatch(sagaActions.getDataRequest({ url, keyState }, { syllabus }));
  };
  addNewCourseSuccess = (response) => {
    const { result } = response;
    if (result) history.push(`/admin/course/${result.iid}/invite/new`);
  };
  handleAddNewCourse = () => {
    const { dispatch, node } = this.props;
    const hiddenFields = {
      use_existing_syllabus: 1,
      syllabus: node.iid,
    };
    const contentDialog = (
      <NewCourseForm
        mode="new"
        formid="new_course"
        step="course_syllabus"
        hiddenFields={hiddenFields}
        requestSuccessful={this.addNewCourseSuccess}
      />
    );
    const title = t1('new_course');
    const optionsProperties = {
      handleClose: true,
      modal: true,

      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { courses, node } = this.props;
    return [
      <Table>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('staff')}</TableHeaderColumn>
            <TableHeaderColumn width={width.action} className="text-center">
              {t1('action')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {courses &&
            courses.map((course, index) => (
              <TableRow
                key={`course-id-key-${index}-${
                  course.id ? course.id : 'emptyCourseId'
                }`}
              >
                <TableRowColumn>
                  <Link to={routes.url('node_edit', course)}>
                    {course.name} - {course.code}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <StaffList staff={course.staff} />
                </TableRowColumn>
                <TableRowColumn
                  width={width.action}
                  className="padding-left-45"
                >
                  <Link to={routes.url('node_edit', course)}>
                    <IconButton title={t1('edit')} iconClassName="mi mi-edit" />
                  </Link>
                  <Link to={Links.overViewCourse(course, true)}>
                    <IconButton
                      title={t1('preview')}
                      iconClassName="mi mi-remove-red-eye"
                    />
                  </Link>
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>,
      <div style={this.style}>
        {
          <RaisedButton
            label={t1('add_course')}
            primary
            disabled={!node || node.status !== 'approved'}
            icon={
              <Icon
                icon="plus"
                style={{
                  color:
                    !node || node.status !== 'approved'
                      ? 'rgba(0, 0, 0, 0.3)'
                      : 'white',
                }}
              />
            }
            onClick={() => this.handleAddNewCourse()}
          />
        }
        {(!node || node.status !== 'approved') && (
          <span style={this.spanStyle}>
            {t1(
              'you_need_to_approve_syllabus_first_in_order_to_create_new_course',
            )}
          </span>
        )}
      </div>,
    ];
  }
}

function mapStateToProps(state) {
  const courses = state.dataApiResults[keyState] || [];
  return {
    courses,
  };
}

export default connect(mapStateToProps)(CoursesOfSyllabus);
