/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';

class SearchFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

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
          <div className="col-md-8">{groups.default.fieldNames.filterset}</div>

          <div className="col-md-4">
            {groups.default.fieldNames.rt}
            {groups.default.fieldNames.reject_reason_type}
            {submitButton}
          </div>
        </div>

        {/*
        <div className="row">
          <div className="col-md-2" />
          <div className="p-l-25 col-md-8">
            {groups.default.fieldNames.reject_reason_type}
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12 valign-wrapper text-center"
            style={middleLine}
          >
            {submitButton}
          </div>
        </div>

           */}
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
