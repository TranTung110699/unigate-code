/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React from 'react';

class ConfirmSchemaLayoutFreestyle extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.organization}
          </div>
          <div className="col-md-6">
            {groups.default.fieldNames.job_position}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.import_tags}
          </div>
          <div className="col-md-6">{groups.default.fieldNames.used_for}</div>
        </div>
        <div className="row">
          <div className="col-md-12 colLeft">
            {groups.default.fieldNames.skills}
          </div>
        </div>
        <div className="row">
          {groups.default.fieldNames.remove_current_questions}
          <div className="col-md-12 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default ConfirmSchemaLayoutFreestyle;
