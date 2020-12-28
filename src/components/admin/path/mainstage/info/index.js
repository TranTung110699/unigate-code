import React from 'react';
import NewForm from 'components/admin/path/new/Form';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import EditAvatar from 'components/admin/node/edit/EditAvatar';

const Info = ({ node }) => {
  if (!node) {
    return null;
  }

  return (
    <div>
      <NewForm
        node={node}
        mode="edit"
        step={!node.type || node.type === 'path' ? '' : node.type}
        title={t1('update_node')}
      />
      <div>
        <Widget title={t1('edit_avatar')}>
          <EditAvatar node={node} />
        </Widget>
      </div>
    </div>
  );
};

export default Info;
