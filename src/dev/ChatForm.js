import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import chat from 'components/admin/chat/schema/form';

class Form extends Component {
  render() {
    const formid = 'chat';

    return (
      <div>
        <NodeNew
          ntype={'chat'}
          schema={chat}
          closeModal
          showPreview={false}
          alternativeApi="/site/dev/rabbit"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
