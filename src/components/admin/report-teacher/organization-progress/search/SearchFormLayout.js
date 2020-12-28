import React from 'react';
import '../../learn/student-detail-progress/style.scss';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid  box-search-progress-report">
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.training_plan_iids}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.enrolment_plan_iids}
          </div>
        </div>

        <div className="row ">
          <div className="col-md-12 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
