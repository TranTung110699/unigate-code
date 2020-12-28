import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import planSchema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_plan');
    const formid = this.props.formid || 'new_plan';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'plan'}
          schema={planSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="plan_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
