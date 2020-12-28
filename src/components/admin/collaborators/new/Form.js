import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from '../schema/form';

class Form extends Component {
  render() {
    const {
      alternativeApi,
      requestSuccessful,
      formid,
      closeModal,
      ...props
    } = this.props;
    return (
      <div>
        <NodeNew
          {...props}
          ntype={'collaborator'}
          schema={schema}
          closeModal={closeModal}
          alternativeApi={alternativeApi}
          formid={formid || 'collaborator'}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

export default connect()(Form);
