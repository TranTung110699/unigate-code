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
          {groups.default.fieldNames.major}
          <div className="col-md-6">{groups.default.fieldNames.semester}</div>
          <div className="col-md-6" style={{ marginTop: -10 }}>
            {groups.default.fieldNames.subject_iids}
          </div>
          <div className="col-md-12 text-center">
            {submitButton}
            <Export params={formValues} url={apiUrls.get_export_by_subject} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
