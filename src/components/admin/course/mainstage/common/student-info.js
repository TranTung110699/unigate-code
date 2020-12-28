import React from 'react';
import Avatar from 'components/common/avatar';

export default ({ user }) => (
  <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
    <Avatar user={user} size={30} style={{ margin: 5 }} />
    <div>
      {user.name}
      <br />
      {user.code}
    </div>
  </div>
);
