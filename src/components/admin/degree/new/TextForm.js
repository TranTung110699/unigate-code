import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';

class Form extends Component {
  render() {
    const { mode, step, node, searchFormId } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_degree';
    return (
      <div>
        <NodeNew
          title={title}
          ntype={'degree'}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId={searchFormId}
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
