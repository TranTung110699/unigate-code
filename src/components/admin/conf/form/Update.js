import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import confSchema from 'components/admin/conf/schema/form';
import { connect } from 'react-redux';
import { t1 } from 'translate';

class Update extends Component {
  render() {
    const { mode, step, node, schema, dialogKey } = this.props;
    const title = this.props.title || t1('edit_conf');
    const formid = this.props.formid || 'edit_conf';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'conf'}
          schema={schema || confSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal={!!dialogKey}
          dialogKey={dialogKey}
          formid={formid}
          searchFormId="conf_search"
        />
      </div>
    );
  }
}

export default connect()(Update);
