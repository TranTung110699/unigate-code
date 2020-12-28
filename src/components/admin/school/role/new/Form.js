import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from 'components/admin/school/role/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const formid = this.props.formid || 'new_role';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype={'role'}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          alternativeApi={alternativeApi}
          searchFormId="role_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
