import React from 'react';

const LayoutFreestyle = (props) => {
  const { groups, submitButton } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          {groups.default.fieldNames.organizations}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {groups.default.fieldNames.include_sub_organizations}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {groups.default.fieldNames.one_of_ntypes}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">{groups.default.fieldNames.from_ts}</div>
        <div className="col-md-6">{groups.default.fieldNames.to_ts}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">{submitButton}</div>
      </div>
    </div>
  );
};

export default LayoutFreestyle;
