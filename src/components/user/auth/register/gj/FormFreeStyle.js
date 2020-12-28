import React from 'react';

class FormFreeStyle extends React.Component {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="register-container">
        <div className="row register-item">{groups.id.fieldNames.name}</div>
        <div className="row register-item">{groups.id.fieldNames.mail}</div>
        <div className="row register-item">{groups.id.fieldNames.lname}</div>
        <div className="row register-item">{groups.id.fieldNames.pass}</div>
        <div className="row register-item">
          {groups.id.fieldNames.pass_retype}
        </div>
        <div className="row register-item">{groups.id.fieldNames.phone}</div>
        <div className="row register-item text-center p-t-10">
          {submitButton}
        </div>
      </div>
    );
  }
}

export default FormFreeStyle;
