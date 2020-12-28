import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import sessionSchema from '../../schema/form';
import { t1 } from 'translate';
import apiUrls from '../../endpoints';

class SessionEdit extends Component {
  render() {
    const { node } = this.props;
    const searchFormId = this.props.searchFormId || `edit_session_${node.id}`;

    const hiddenFields = {};
    return (
      <div>
        <h1>
          {t1('editing_session')}: {node.name}
        </h1>

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
