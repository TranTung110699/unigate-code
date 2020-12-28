import React from 'react';
import Search from './search';

const NotAssignedMembers = ({ node }) => {
  return (
    <Search formid={`not_assigned_members_${node && node.iid}`} node={node} />
  );
};

export default NotAssignedMembers;
