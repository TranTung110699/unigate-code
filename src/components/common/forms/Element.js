import React, { Component } from 'react';

class FormElement extends Component {
  render() {
    return (
      <div
        className="form-element-row form-group"
        id={`${this.props.name}-element`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FormElement;
