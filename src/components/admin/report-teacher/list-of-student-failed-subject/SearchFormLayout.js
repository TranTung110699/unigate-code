import React from 'react';
import apiUrls from 'api-endpoints';
import Export from 'components/admin/report-teacher/Export';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton, formValues } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">{groups.default.fieldNames.major}</div>
        <div className="row">
          <div className="col-md-8">{groups.default.fieldNames.semester}</div>
          <div className="col-md-4 m-t-30">
            {groups.default.fieldNames.allow_retaking}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" style={{ marginTop: -10 }}>
            {groups.default.fieldNames.syllabus}
          </div>
          <div className="col-md-4">{groups.default.fieldNames.name}</div>
          <div className="col-md-4 m-t-20 text-center">
            {submitButton}
            <Export
              params={formValues}
              url={apiUrls.get_list_of_student_failed_subject_export}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
