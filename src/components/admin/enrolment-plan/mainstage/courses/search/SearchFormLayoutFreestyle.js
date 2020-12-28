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
      <div style={this.style} className="container-fluid border-round">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                {groups.default.fieldNames.credit_syllabus}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">{groups.default.fieldNames.text}</div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {groups.default.fieldNames.status}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                {groups.default.fieldNames.organizations}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {groups.default.fieldNames.include_sub_organizations}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
