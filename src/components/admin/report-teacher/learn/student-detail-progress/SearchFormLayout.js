import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-6">{groups.default.fieldNames.province}</div>
          <div className="col-md-6">
            {groups.default.fieldNames.organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            {groups.default.fieldNames.training_plan_iids}
          </div>
          <div className="col-md-3">
            {groups.default.fieldNames.enrolment_plan_iids}
          </div>
          <div className="col-md-3">{groups.default.fieldNames.from_date}</div>
          <div className="col-md-3">{groups.default.fieldNames.to_date}</div>
        </div>

        <div className="row">
          <div className="col-md-3">{groups.default.fieldNames.text}</div>
          <div className="col-md-3">
            {groups.default.fieldNames.credit_syllabus_iids}
          </div>

          <div className="col-md-3">
            {groups.default.fieldNames.course_iids}
          </div>
          <div className="col-md-3 p-t-20">{submitButton}</div>
        </div>

        <div className="row text-center" />
      </div>
    );
  }
}

export default SearchFormLayout;
