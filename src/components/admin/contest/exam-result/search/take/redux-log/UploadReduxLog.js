import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new/index';
import contestApiUrls from 'components/admin/contest/endpoints/index';
import reduxLogSchema from './redux-log-schema';

class UploadReduxLog extends Component {
  render() {
    const { node } = this.props;
    const formid = `redux_log-${node.id}`;

    const take = { id: node.id };

    return (
      <NodeNew
        ntype={'take'}
        schema={reduxLogSchema}
        mode={'edit'}
        step={'redux_log'}
        alternativeApi={contestApiUrls.upload_take_redux_log}
        node={take}
        formid={formid}
      />
    );
  }
}

export default UploadReduxLog;
