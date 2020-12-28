import React, { Component } from 'react';
import Form from './Form';

class IcoNew extends Component {
  render() {
    const { teacher } = this.props;

    return <Form teacher={teacher} />;
  }
}

export default IcoNew;
