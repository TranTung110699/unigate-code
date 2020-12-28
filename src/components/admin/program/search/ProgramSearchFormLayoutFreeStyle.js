/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';

class ProgramSearchFormDetailFreestyle extends React.PureComponent {
  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    const width = groups.id.fieldNames.organizations ? 'col-md-3' : 'col-md-3';
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className={width}>{groups.id.fieldNames.name}</div>
          <div className={width}>{groups.id.fieldNames.program_type}</div>
          <div className={width}>{groups.id.fieldNames.status}</div>
          <div className="col-md-2 m-t-20">{submitButton}</div>
        </div>
        {groups.id.fieldNames.organizations ? (
          <div className="row">
            <div className="col-md-4">{groups.id.fieldNames.organizations}</div>
            <div className="col-md-4 m-t-30">
              {groups.id.fieldNames.include_sub_organizations}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect()(ProgramSearchFormDetailFreestyle);
