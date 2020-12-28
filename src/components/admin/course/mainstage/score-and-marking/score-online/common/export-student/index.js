import React, { Fragment } from 'react';
import commonSagaActions from 'actions/saga-creators';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { CourseActions } from 'configs/constants/permission';
import { t1 } from 'translate';
import { examSubTypes } from 'configs/constants/index';

class StudentExport extends React.Component {
  handleExportStudentByCourse = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_students_by_course_ums,
        { course_iid: get(this.props, 'node.iid') },
      ),
    );
  };

  handleExportStudentMakeFinalContest = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_student_make_final_contest,
        { course_iid: get(this.props, 'node.iid') },
      ),
    );
  };

  handleExportStudentAttendanceTemplate = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_student_attendance_template,
        { course_iid: get(this.props, 'node.iid') },
      ),
    );
  };

  handleReportStudentAttendance = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_student_attendance_template,
        { course_iid: get(this.props, 'node.iid'), show_attendance: 1 },
      ),
    );
  };

  render() {
    const { permissions, hasPermission, node, style } = this.props;

    const isShowButtonExport =
      get(this.props, 'node.exam_sub_type') !== examSubTypes.ENTERING_SCORES;

    const isPermissionExportStudentScore =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_EXPORT_STUDENTS,
        node && node.iid,
        permissions,
      );

    const isPermissionExportAttendance =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_EXPORT_STUDENTS_ATTENDANCE,
        node && node.iid,
        permissions,
      );

    return (
      <div style={style}>
        {isShowButtonExport && isPermissionExportStudentScore && (
          <Fragment>
            <RaisedButton
              name="export"
              type="button"
              id="export"
              label={t1('export_results_of_course_completed')}
              primary
              onClick={this.handleExportStudentByCourse}
            />
            <div style={{ paddingLeft: 10, display: 'inline' }}>
              <RaisedButton
                name="export"
                type="button"
                id="export"
                label={t1('export_student_make_final_contest')}
                primary
                onClick={this.handleExportStudentMakeFinalContest}
              />
            </div>
          </Fragment>
        )}
        {get(this.props, 'form') === 'attach_results_of_normal_course' &&
          isShowButtonExport &&
          isPermissionExportAttendance && (
            <Fragment>
              <div style={{ paddingLeft: 10, display: 'inline' }}>
                <RaisedButton
                  name="export"
                  type="button"
                  id="export"
                  label={t1('download_student_list_for_attendance_marking')}
                  primary
                  onClick={this.handleExportStudentAttendanceTemplate}
                />
              </div>
              <div style={{ paddingLeft: 10, display: 'inline' }}>
                <RaisedButton
                  name="export"
                  type="button"
                  id="export"
                  label={t1('export_student_attendance')}
                  primary
                  onClick={this.handleReportStudentAttendance}
                />
              </div>
            </Fragment>
          )}
      </div>
    );
  }
}

export default connect()(StudentExport);
