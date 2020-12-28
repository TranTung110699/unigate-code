import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import RaisedButton from 'components/common/mui/RaisedButton';
import get from 'lodash.get';
import { CourseActions } from 'configs/constants/permission';

class LayoutFreestyle extends React.PureComponent {
  handleExportStudentAttendanceTemplate = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_student_attendance_template,
        { course_iid: get(this.props, 'layoutOptionsProperties.node.iid') },
      ),
    );
  };

  handleReportStudentAttendance = () => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_student_attendance_template,
        {
          course_iid: get(this.props, 'layoutOptionsProperties.node.iid'),
          show_attendance: 1,
        },
      ),
    );
  };

  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    let isShowExport = false;

    const hasPermission = get(
      this.props,
      'layoutOptionsProperties.hasPermission',
    );

    if (typeof hasPermission === 'function') {
      isShowExport = hasPermission(
        CourseActions.COURSE_ACTION_EXPORT_STUDENTS_ATTENDANCE,
        get(this.props, 'layoutOptionsProperties.node.iid'),
        get(this.props, 'layoutOptionsProperties.permissions'),
      );
    }

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-4">{groups.id.fieldNames.q}</div>
          <div className="col-md-8 m-t-20">
            {submitButton}
            {isShowExport && (
              <div style={{ display: 'inline' }}>
                <RaisedButton
                  name="export"
                  type="button"
                  id="export"
                  label={t1('download_student_list_for_attendance_marking')}
                  primary
                  onClick={this.handleExportStudentAttendanceTemplate}
                />
              </div>
            )}
            {isShowExport && (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LayoutFreestyle);
