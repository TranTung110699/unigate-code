import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, params, requestSuccessful } = this.props;
    const formid = this.props.formid || 'new_academic_category';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype={'academic_category'}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="academic_category_search"
          alternativeApi={alternativeApi}
          params={params}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

export default connect()(Form);
