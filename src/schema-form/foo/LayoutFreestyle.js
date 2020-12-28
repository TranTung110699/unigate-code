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
    const { layout, groups, message, hideSubmitButton, readOnly } = this.props;
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
          <div className="col-md-6" />
          <div className="col-md-4" />
          <div className="col-md-2" style={{ paddingTop: '15px' }}>
            {submitButton}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default LayoutFreestyle;
