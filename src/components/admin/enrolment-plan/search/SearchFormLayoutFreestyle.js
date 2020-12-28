import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  style = { background: 'white' };

  render() {
    const { groups, message, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div style={this.style} className="container-fluid">
        <div className="row">
          <div className="col-md-12">{groups.default.fieldNames.text}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{groups.default.fieldNames.type}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.academic_categories}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{groups.default.fieldNames.status}</div>
        </div>
        <div className="row">
          <div className="col-md-12 m-t-25 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
