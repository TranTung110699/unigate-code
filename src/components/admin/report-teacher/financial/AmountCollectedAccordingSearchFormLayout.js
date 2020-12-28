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
        <div className="col-md-4">
          {get(groups, 'default.fieldNames.campus_iids')}
        </div>
        <div className="col-md-8">
          {get(groups, 'default.fieldNames.cashier')}
        </div>
        <div className="col-md-12 text-center">
          {submitButton}
          <Export
            params={formValues}
            url={apiUrls.export_amount_collected_according_to_the_cashier}
          />
        </div>
      </div>
    );
  }
}

export default AmountCollectedAccordingSearchFormLayout;
