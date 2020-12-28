/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormFreestyle extends React.PureComponent {
  render() {
    const { groups } = this.props;
    let { submitButton } = this.props;

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-3">{groups.id.fieldNames.name}</div>
          <div className="col-md-3">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormFreestyle;
