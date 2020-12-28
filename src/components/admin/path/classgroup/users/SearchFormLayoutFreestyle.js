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
    const { groups, message, readOnly, formValues } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">{groups.default.fieldNames.q}</div>
        </div>
        <div className="row">
          <div className="col-md-3">
            {groups.default.fieldNames.financial_status}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-t-15">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
