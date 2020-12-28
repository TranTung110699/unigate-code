import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import page from 'components/admin/cms/page/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_page';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'page'}
          schema={page}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId="page_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
