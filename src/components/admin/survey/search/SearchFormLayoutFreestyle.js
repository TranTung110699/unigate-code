import React from 'react';
import get from 'lodash.get';

const searchFormLayoutFreestyle = ({ readOnly, submitButton, ...props }) => {
  return (
    <div className="white-box">
      <div className="row">
        {get(props, 'groups.default.fieldNames.form_of_training_apply')}
        {get(props, 'groups.default.fieldNames.text')}
        {get(props, 'groups.default.fieldNames.apply_survey_for')}
        {get(props, 'groups.default.fieldNames.status')}
        <div className="col-md-12 text-center">{!readOnly && submitButton}</div>
      </div>
    </div>
  );
};

export default searchFormLayoutFreestyle;
