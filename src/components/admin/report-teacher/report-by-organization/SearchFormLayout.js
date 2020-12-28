import React from 'react';
import connect from 'react-redux/es/connect/connect';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          {groups.default.fieldNames.learning_type && (
            <div className="col-md-3">
              {groups.default.fieldNames.learning_type}
            </div>
          )}
          {groups.default.fieldNames.year && (
            <div className="col-md-2">{groups.default.fieldNames.year}</div>
          )}
          <div className="col-md-4" style={{ marginTop: -10 }}>
            {groups.default.fieldNames.organizations}
          </div>
          <div className="col-md-3" style={{ marginTop: 32 }}>
            {groups.default.fieldNames.include_sub_organizations}
          </div>
          <div className="row">
            <div className="col-md-8">
              {groups.default.fieldNames.enrolment_plan_status}
            </div>
            <div className="col-md-4 m-t-20">{submitButton}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SearchFormLayout);
