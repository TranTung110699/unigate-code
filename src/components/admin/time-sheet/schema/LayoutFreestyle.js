import React from 'react';

const NewTimeSheetForSpecializedWorkLayoutFreestyle = ({
  groups: {
    default: { fieldNames },
  },
  submitButton,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">{fieldNames.user}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.contract_iid}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.name}</div>
      </div>
      <div className="row">
        <div className="col-md-6">{fieldNames.duration}</div>
        <div className="col-md-6">{fieldNames.time}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.status}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.note}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center m-t-20">{submitButton}</div>
      </div>
    </div>
  );
};

export default NewTimeSheetForSpecializedWorkLayoutFreestyle;
