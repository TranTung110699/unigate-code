import React from 'react';

class LayoutFreestyle extends React.PureComponent {
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
          <div className="col-md-6">{groups.default.fieldNames.from_date}</div>
          <div className="col-md-6">{groups.default.fieldNames.to_date}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{submitButton}</div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default LayoutFreestyle;
