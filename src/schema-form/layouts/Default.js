import React from 'react';

class DefaultLayout extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const {
      layout,
      groups,
      groupsMetadata,
      formType,
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
        <div className="row">{groupsMetadata.map((g) => groups[g.id])}</div>
        {formType && formType === 'horizontal' && submitButton && (
          <div className="row">
            <div className="col-md-10 col-md-offset-2" style={this.divStyle}>
              {submitButton}
            </div>
          </div>
        )}
        <div className="row">
          <div className="form-button-groups">
            {(!formType || formType !== 'horizontal') && submitButton}
            {showAddNewAndEditButton && addNewAndEditButton}
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
