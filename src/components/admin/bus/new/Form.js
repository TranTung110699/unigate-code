import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import busSchema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_bus');
    const formid = this.props.formid || 'new_bus';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'bus'}
          schema={busSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="bus_search"
          alternativeApi={'/bus/api/new'}
        />
      </div>
    );
  }
}

export default connect()(Form);
