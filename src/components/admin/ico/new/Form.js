import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import icoSchema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_ico');
    const formid = this.props.formid || 'new_ico';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'ico'}
          schema={icoSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="ico_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
