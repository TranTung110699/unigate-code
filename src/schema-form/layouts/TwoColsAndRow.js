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
      readOnly,
      message,
      addNewAndEditButton,
      showAddNewAndEditButton,
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
          <div className="col-md-6">
            {groups.left}
            {groups.left_two}
            {groups.left_three}
          </div>
          <div className="col-md-6">
            {groups.right}
            {groups.right_two}
          </div>
        </div>
        {/* <hr /> */}
        <div className="row">
          <div className="col-md-12">{groups.row}</div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-button-groups">
              {submitButton}
              {showAddNewAndEditButton && addNewAndEditButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwoColsAndRow;
