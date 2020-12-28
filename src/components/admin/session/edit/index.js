import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import sessionSchema from '../schema/form';
import { t1 } from 'translate';
import apiUrls from '../endpoints';

class SessionEdit extends Component {
  render() {
    const { id, node } = this.props;
    const searchFormId = this.props.searchFormId || `edit_session_${id}`;

    const hiddenFields = {};
    return (
      <div>
        <NodeNew
          ntype="session"
          schema={sessionSchema}
          step={''}
          mode={'edit'}
          formid="session-manage"
          closeModal
          alternativeApi={apiUrls.session_update}
          hiddenFields={hiddenFields}
          searchFormId={searchFormId}
          node={node}
        />
      </div>
    );
  }
}

export default SessionEdit;
