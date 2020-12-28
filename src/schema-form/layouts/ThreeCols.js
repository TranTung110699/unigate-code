import React from 'react';

class QuestionEdit extends React.PureComponent {
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
      hideSubmitButton,
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
          <div className="col-md-4">{groups.col1}</div>
          <div className="col-md-4">{groups.col2}</div>
          <div className="col-md-4">{groups.col3}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{groups.last_row_left}</div>
          <div className="col-md-6">{groups.last_row_right}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-button-groups">
              {!hideSubmitButton && submitButton}
              {showAddNewAndEditButton && addNewAndEditButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionEdit;
