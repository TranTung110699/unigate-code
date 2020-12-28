import React from 'react';
import get from 'lodash.get';

const searchFormLayout = ({ groups, submitButton }) => (
  <div className="container-fluid elementGroup">
    <div className="row">
      {get(groups, 'default.fieldNames.learning_type') && (
        <div className="col-md-6">
          {get(groups, 'default.fieldNames.learning_type')}
        </div>
      )}
      {get(groups, 'default.fieldNames.year') && (
        <div className="col-md-6">{get(groups, 'default.fieldNames.year')}</div>
      )}
    </div>
    <div className="row">
      <div className="col-md-8">
        {get(groups, 'default.fieldNames.enrolment_plan_status')}
      </div>
      <div className="col-md-4 text-center m-t-20">{submitButton}</div>
    </div>
  </div>
);

export default searchFormLayout;
