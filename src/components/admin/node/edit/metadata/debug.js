import React from 'react';
import VarDump from 'components/common/VarDump';

export const Debug = (props, state, showItems) => {
  const { node, maximumDepth, depth } = props;
  return (
    <div>
      <h1>MetadataRenderer</h1>
      <div>
        MetadataRenderer depth=
        {depth} maxDepth=
        {maximumDepth} iid=
        {node.iid}
        <br />
        {node.ntype} - {node.iid} - {node.name}
      </div>
      {showItems && (
        <div>
          <h1>Items</h1>
          <VarDump data={state.items} />
        </div>
      )}
    </div>
  );
};
