import React from 'react';
import NodeNew from '../../../node/new';
import schema from './schema';
import { t1 } from 'translate';
import apiUrls from '../../endpoints';

function Status({ node }) {
  return (
    <NodeNew
      node={node}
      step="edit"
      schema={schema}
      submitLabel={t1('save')}
      alternativeApi={apiUrls.updateStatus}
      hiddenFields={{
        iid: node.iid,
      }}
    />
  );
}

export default Status;
