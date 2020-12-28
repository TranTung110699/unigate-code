import React, { Component } from 'react';
import Form from './Form';

class ContractNew extends Component {
  render() {
    const { teacher, formid } = this.props;
    const isSimpleContract = this.props.isSimpleContract || false;

    return (
      <Form
        teacher={teacher}
        isSimpleContract={isSimpleContract}
        formid={formid}
      />
    );
  }
}

export default ContractNew;
