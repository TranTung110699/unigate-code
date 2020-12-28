import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import degreeSchema from '../schema/form';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      searchFormId,
      alternativeApi,
      hiddenFields,
    } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_degree';
    return (
      <div>
        <NodeNew
          title={title}
          ntype={'degree'}
          schema={degreeSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId={searchFormId}
          formid={formid}
          hiddenFields={hiddenFields}
          alternativeApi={alternativeApi}
        />
      </div>
    );
  }
}

export default connect()(Form);
