import React, { Component } from 'react';
import Form from 'components/admin/user/new/Form';

class ResetPassword extends Component {
  render() {
    const { node } = this.props;
    return (
      <Form
        key={`${node.iid}-reset_password`}
        mode="edit"
        node={node}
        alternativeApi="/user/update"
        formid="edit_password"
        title={node.name}
        step="set_pass"
      />
    );
  }
}
export default ResetPassword;
