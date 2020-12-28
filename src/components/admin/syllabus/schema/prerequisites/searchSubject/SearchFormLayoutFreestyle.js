/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

const SyllabusSearchFormDetailFreestyle = (props) => {
  const { groups, submitButton } = props;
  return (
    <div className="container-fluid elementGroup">
      <div className="row">
        <div className="col-md-8">{groups.id.fieldNames.name}</div>
        <div className="col-md-4 text-center m-t-25">{submitButton}</div>
      </div>
    </div>
  );
};

export default SyllabusSearchFormDetailFreestyle;
