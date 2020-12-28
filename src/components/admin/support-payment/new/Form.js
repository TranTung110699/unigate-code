import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new';
import unlockSupportSchema from '../schema/form';

class Form extends Component {
  render() {
    const {
      mode,
      node,
      step,
      alternativeApi,
      params,
      hiddenFields,
    } = this.props;
    const formid = this.props.formid || `${step}_${node.id}`;
    return (
      <div>
        <NodeNew
          ntype={'unlock_support'}
          schema={unlockSupportSchema}
          mode={mode}
          node={node}
          step={step}
          hiddenFields={hiddenFields}
          closeModal
          alternativeApi={alternativeApi}
          formid={formid}
          params={params}
        />
      </div>
    );
  }
}

export default connect()(Form);
