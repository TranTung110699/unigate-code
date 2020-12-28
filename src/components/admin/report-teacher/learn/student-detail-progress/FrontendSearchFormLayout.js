import React from 'react';
import './style.scss';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid box-search-progress-report">
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.organizations}
          </div>
          <div className="col-md-6"> </div>
        </div>

        <div className="row">
          <div className="col-md-6">{groups.default.fieldNames.province}</div>
          <div className="col-md-6">{groups.default.fieldNames.text}</div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.credit_syllabus_iids}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
