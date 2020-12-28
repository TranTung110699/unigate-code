import React from 'react';
import ExportBtnWithConfirmDialog from 'components/common/action-button/ExportBtnWithConfirmDialog';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';

const SearchFormLayoutFreestyle = ({
  formid,
  formValues,
  groups,
  message,
  readOnly,
  submitButton,
}) => {
  if (readOnly) {
    submitButton = null;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">{groups.default.fieldNames.name}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{groups.default.fieldNames.code}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{groups.default.fieldNames.passed}</div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {groups.default.fieldNames.organizations}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {groups.default.fieldNames.include_sub_organizations}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          {submitButton}
          <ExportBtnWithConfirmDialog
            url={apiUrls.export_enrolment_plan_learners_progress}
            formValues={formValues}
            formid={formid}
            label={t1('export')}
            raisedButton
            primary
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFormLayoutFreestyle;
