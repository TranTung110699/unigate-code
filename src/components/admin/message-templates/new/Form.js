import React, { Component } from 'react';
import { connect } from 'react-redux';

import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/message-templates/schema/form';
import { t2 } from 'translate';

class Form extends Component {
  render() {
    const ntype = 'message_template';
    const defaultFormId = `new_${ntype}`;

    const {
      mode,
      step,
      node,
      title = t2(defaultFormId),
      formid = defaultFormId,
      readOnly,
    } = this.props;

    return (
      <div>
        <NodeNew
          title={title}
          ntype={ntype}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId={`${ntype}_search`}
          readOnly={readOnly}
        />
      </div>
    );
  }
}

export default connect()(Form);
