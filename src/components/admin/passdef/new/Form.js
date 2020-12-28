import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import schema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, searchFormId } = this.props;
    const title = this.props.title || t1('new_passdef');
    const formid = this.props.formid || 'new_passdef';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'passdef'}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId={searchFormId}
        />
      </div>
    );
  }
}

export default connect()(Form);
