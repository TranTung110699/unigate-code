import React from 'react';

class AssetSearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

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
          <div className="col-md-5">{groups.id.fieldNames.code}</div>
          <div className="col-md-5">{groups.id.fieldNames.category_iid}</div>
          <div className="col-md-2 valign-wrapper">{submitButton}</div>
        </div>
        <div className="row">
          <div className="col-md-5">{groups.id.fieldNames.start_date}</div>
          <div className="col-md-5">{groups.id.fieldNames.end_date}</div>
        </div>
      </div>
    );
  }
}

export default AssetSearchFormDetailFreestyle;
