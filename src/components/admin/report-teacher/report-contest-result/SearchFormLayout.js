import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.contest_iids}
          </div>
          <div className="col-md-3">
            {groups.default.fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-3">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
