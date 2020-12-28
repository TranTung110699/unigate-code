/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  render() {
    const { groups } = this.props;
    return (
      <div className="container-fluid elementGroup">
        {groups.id.fieldNames.q}
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
