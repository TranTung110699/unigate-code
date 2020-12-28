import React from 'react';

const LayoutFreeStyle = ({
  groups: {
    default: { fieldNames },
  },
  submitButton,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">{fieldNames.organization_iid}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center m-t-20">{submitButton}</div>
      </div>
    </div>
  );
};

export default LayoutFreeStyle;
