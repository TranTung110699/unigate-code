import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from '../schema/form';
import schemaK12 from '../schema/k12-schema-form';
import { isK12 } from 'common/k12';

class Form extends Component {
  render() {
    const { mode, step, node, params, k12, dialogKey } = this.props;
    const formid = this.props.formid || 'new_training_plan';
    const alternativeApi = this.props.alternativeApi;

    return (
      <NodeNew
        ntype={'training_plan'}
        schema={k12 ? schemaK12 : schema}
        mode={mode}
        step={step}
        node={node}
        closeModal={!!dialogKey}
        alternativeApi={alternativeApi}
        formid={formid}
        searchFormId="training_plan_search"
        params={params}
        dialogKey={dialogKey}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    k12: isK12(state),
  };
};

export default connect(mapStateToProps)(Form);
