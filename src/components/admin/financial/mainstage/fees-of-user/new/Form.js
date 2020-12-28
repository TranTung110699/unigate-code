import React, { Component } from 'react';

import Form from 'schema-form/Form';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import schema from '../schema/form';

class Index extends Component {
  handleSubmit = (data) => {
    const { dispatch } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  render() {
    const { node, formid } = this.props;
    return (
      <Form
        schema={schema}
        step="applicable_benefits"
        mode="new"
        node={node}
        onSubmit={this.handleSubmit}
        formid={formid}
        resetForm
      />
    );
  }
}

export default connect()(Index);
