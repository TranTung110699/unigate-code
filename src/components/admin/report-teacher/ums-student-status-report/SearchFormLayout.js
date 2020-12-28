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
            style={{ marginLeft: -30, marginRight: -30 }}
          >
            {groups.default.fieldNames.major}
          </div>
          <div className="col-md-4">{groups.default.fieldNames.name}</div>
          <div className="col-md-4 m-t-20">
            {submitButton}
            <Export
              params={formValues}
              url={apiUrls.get_student_status_export}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
