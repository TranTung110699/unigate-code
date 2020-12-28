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
    const { groups, message, readOnly } = this.props;
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
          <div className="col-md-12">{groups.default.fieldNames.pIids}</div>
          <div className="col-md-12">{groups.default.fieldNames.text}</div>
          <div className="col-md-12">
            {groups.default.fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-12">{groups.default.fieldNames.sub_type}</div>
          <div className="col-md-12 text-center" style={{ paddingTop: '15px' }}>
            {submitButton}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
