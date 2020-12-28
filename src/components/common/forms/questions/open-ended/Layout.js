import React from 'react';

const OpenEndedAnswerLayoutFreestyle = ({
  groups: {
    default: { fieldNames },
  },
  submitButton,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">{fieldNames.content}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.attachments}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">{submitButton}</div>
      </div>
    </div>
  );
};

export default OpenEndedAnswerLayoutFreestyle;
