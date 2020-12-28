/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormDetailFreestyleEnterprise extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly, isSIS } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-6">
            {groups.id.fieldNames.name}
            {groups.id.fieldNames.status}
            {groups.id.fieldNames.public}
            {groups.id.fieldNames.learning_type}
            {groups.id.fieldNames.sub_type}
          </div>
          <div className="col-md-4">
            {groups.id.fieldNames.academic_categories}
            {groups.id.fieldNames.organizations}
            {groups.id.fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-2 m-t-15">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyleEnterprise;
