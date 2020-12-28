import React from 'react';
import get from 'lodash.get';

import apiUrls from 'api-endpoints';
import Export from 'components/admin/report-teacher/Export';

class AmountCollectedAccordingSearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton, formValues } = this.props;
    return (
      <div className="row m-5">
        <div className="col-md-4">
          {get(groups, 'default.fieldNames.school_year')}
        </div>
        <div className="col-md-4">
          {get(groups, 'default.fieldNames.semester')}
        </div>
        <div className="col-md-4">
          {get(groups, 'default.fieldNames.fee_collecting_phase')}
        </div>
        <div className="col-md-6">
          {get(groups, 'default.fieldNames.start_date')}
        </div>
        <div className="col-md-6">
          {get(groups, 'default.fieldNames.end_date')}
        </div>
        <div className="col-md-12">
          {get(groups, 'default.fieldNames.form_of_training')}
        </div>
        <div className="col-md-6">
          {get(groups, 'default.fieldNames.student')}
        </div>
        <div className="col-md-3 m-t-10">
          {get(groups, 'default.fieldNames.fees_type')}
        </div>
        <div className="col-md-3 m-t-30">
          {get(groups, 'default.fieldNames.only_owed_fees')}
        </div>
        <div className="col-md-12 text-center">
          {submitButton}
          <Export
            params={formValues}
            url={apiUrls.export_debit_fees_of_student}
          />
        </div>
      </div>
    );
  }
}

export default AmountCollectedAccordingSearchFormLayout;
