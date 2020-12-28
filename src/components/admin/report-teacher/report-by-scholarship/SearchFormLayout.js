import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div
        className="container-fluid elementGroup"
        style={{ marginLeft: -15, marginRight: -15 }}
      >
        <div className="row">
          {groups.default.fieldNames.major}
          <div className="col-md-8">{groups.default.fieldNames.name}</div>
          <div className="col-md-4 m-t-20 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
