import React from 'react';
import apiUrls from 'api-endpoints';
import Export from 'components/admin/report-teacher/Export';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton, formValues } = this.props;
    return (
      <div
        className="container-fluid elementGroup"
        style={{ marginLeft: -15, marginRight: -15 }}
      >
        <div className="row">
          <div
            className="col-md-12"
            style={{ marginLeft: -15, marginRight: -15 }}
          >
            {groups.default.fieldNames.major}
          </div>
          <div className="col-md-3">{groups.default.fieldNames.user_name}</div>
          <div className="col-md-3" style={{ marginTop: -10 }}>
            {groups.default.fieldNames.subject_iids}
          </div>
          <div className="col-md-3" style={{ marginTop: -10 }}>
            {groups.default.fieldNames.course_iids}
          </div>
          <div className="col-md-3">
            {groups.default.fieldNames.min_number_of_absences}
          </div>
          <div className="col-md-12 text-center">
            {submitButton}
            <Export params={formValues} url={apiUrls.get_attendance_export} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
