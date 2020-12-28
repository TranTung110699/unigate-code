import React from 'react';

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
        <div className="col-md-6">{groups.default.fieldNames.name}</div>
        <div className="col-md-6">{groups.default.fieldNames.code}</div>
      </div>
      <div className="row">
        <div className="col-md-9">
          {groups.default.fieldNames.organizations}
        </div>
        <div className="col-md-3 m-t-30">
          {groups.default.fieldNames.include_sub_organizations}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">{submitButton}</div>
      </div>
    </div>
  );
};

export default SearchFormLayoutFreestyle;
