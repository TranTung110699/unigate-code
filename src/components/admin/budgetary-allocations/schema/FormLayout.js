import React from 'react';
import { connect } from 'react-redux';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          {groups.default.fieldNames.type && (
            <div className="col-md-12">{groups.default.fieldNames.type}</div>
          )}
          {groups.default.fieldNames.import_file && (
            <div className="col-md-12">
              {groups.default.fieldNames.import_file}
            </div>
          )}
          {groups.default.fieldNames.year && (
            <div className="col-md-12">{groups.default.fieldNames.year}</div>
          )}
          {groups.default.fieldNames.reportBy && (
            <div className="col-md-12">
              {groups.default.fieldNames.reportBy}
            </div>
          )}
          {groups.default.fieldNames.for && (
            <div className="col-md-12">{groups.default.fieldNames.for}</div>
          )}
          {groups.default.fieldNames.start_month && (
            <div className="col-md-12">
              {groups.default.fieldNames.start_month}
            </div>
          )}
          {groups.default.fieldNames.end_month && (
            <div className="col-md-12">
              {groups.default.fieldNames.end_month}
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12 m-t-20 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default connect()(SearchFormLayout);
