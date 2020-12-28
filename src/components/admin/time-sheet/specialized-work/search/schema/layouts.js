import React from 'react';

export const SpecializedWorkTimeSheetSearchFormLayout = ({
  groups,
  submitButton,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          {groups.default.fieldNames.organizations}
        </div>
        <div className="col-md-6">{groups.default.fieldNames.user_iid}</div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {groups.default.fieldNames.current_contract_info}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">{groups.default.fieldNames.from_date}</div>
        <div className="col-md-6">{groups.default.fieldNames.to_date}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">{submitButton}</div>
      </div>
    </div>
  );
};

export const SpecializedWorkTimeSheetSearchFormCurrentContractInfoSectionLayout = ({
  groups,
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4">{groups.default.fieldNames.text}</div>
        <div className="col-md-4">
          {groups.default.fieldNames.start_date_from}
        </div>
        <div className="col-md-4">{groups.default.fieldNames.end_date_to}</div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {groups.default.fieldNames.is_full_time_teacher}
        </div>
      </div>
    </React.Fragment>
  );
};
