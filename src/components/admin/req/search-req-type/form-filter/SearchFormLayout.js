import React from 'react';

export default ({ groups, submitButton }) => (
  <div className="container-fluid elementGroup">
    <div className="row">
      <div className="col-md-12">{groups.id.fieldNames.type}</div>
      <div className="col-md-6">{groups.id.fieldNames.name}</div>
      <div className="col-md-6 m-t-5">{groups.id.fieldNames.status}</div>
      <div className="col-md-12 m-t-20 text-center">{submitButton}</div>
    </div>
  </div>
);
