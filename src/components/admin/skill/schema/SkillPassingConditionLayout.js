import React from 'react';

class TwoColsAndRow extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  render() {
    const {
      groups,
      isTesting,
      readOnly,
      message,
      hideSubmitButton,
    } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">{groups.row}</div>
          {/*
          <div className="col-md-6">
            &nbsp;
          </div>
            */}
        </div>
        <div className="row">
          <div className="col-md-6">{groups.col_left_1}</div>
          <div className="col-md-6">{groups.col_right_1}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{groups.col_left_2}</div>
          <div className="col-md-6">{groups.col_right_2}</div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {!isTesting && !hideSubmitButton && submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default TwoColsAndRow;
