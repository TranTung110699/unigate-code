/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly } = this.props;
    const middleLine = { paddingTop: '45px' };

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-6">{groups.default.fieldNames.code}</div>
          <div className="col-md-4" style={{ paddingTop: '12px' }}>
            {groups.default.fieldNames.status}
            <div className="clearfix" />
          </div>
          <div className="col-md-2 valign-wrapper" style={middleLine}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
