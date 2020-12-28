/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message } = this.props;
    let { submitButton } = this.props;

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-8 align-top">
            <div className="row">
              <div className="col-md-6 align-top" />
              <div className="col-md-6 align-top">
                {groups.id.fieldNames.status}
              </div>
            </div>
          </div>
          <div className="col-md-4">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
