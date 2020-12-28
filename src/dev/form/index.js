import React, { Component } from 'react';
import Form from './form';

class DevForm extends Component {
  onSubmit(values) {
    console.log('submited values', values);
  }

  render() {
    return (
      <div className="form-content">
        <h1>Redux form that supports select-image form element</h1>
        <Form onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// Decorate the form component
export default DevForm;
