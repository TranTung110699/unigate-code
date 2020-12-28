import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-6">{groups.name}</div>
          <div className="col-md-4">{groups.status}</div>
          <div className="col-md-2">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
