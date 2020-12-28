import React from 'react';
import get from 'lodash.get';

import apiUrls from 'api-endpoints';
import Export from 'components/admin/report-teacher/Export';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton, formValues } = this.props;
    return (
      <div className="row m-5">
        <div className="col-md-12">
          {get(groups, 'default.fieldNames.form_of_training')}
        </div>
        <div className="col-md-12">
          {get(groups, 'default.fieldNames.ico_school_year_and_semester')}
        </div>
        {get(groups, 'default.fieldNames.student_name')}
        {get(groups, 'default.fieldNames.score_scale')}
        {get(groups, 'default.fieldNames.score')}
        {get(groups, 'default.fieldNames.not_have_to_retake')}
        <div className="col-md-12 m-t-20 text-center">
          {submitButton}
          <Export
            params={formValues}
            url={apiUrls.export_gpa_of_student_by_semester}
          />
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
