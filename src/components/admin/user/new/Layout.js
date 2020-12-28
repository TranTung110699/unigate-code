import React, { Component } from 'react';
import Form from './Form';

class UserNew extends Component {
  render() {
    return <Form {...this.props} />;
  }
}

export default UserNew;
