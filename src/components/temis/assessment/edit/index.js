import React, { Component } from 'react';
import Form from './Form';

class TcnnEdit extends Component {
  render() {
    const { rubricIid, userIid } = this.props.match.params;

    return <Form rubricIid={rubricIid} userIid={userIid} />;
  }
}

export default TcnnEdit;
