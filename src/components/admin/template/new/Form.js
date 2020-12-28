import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import template from 'components/admin/template/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_template');
    const formid = this.props.formid || 'new_template';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'template'}
          schema={template}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="template_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
