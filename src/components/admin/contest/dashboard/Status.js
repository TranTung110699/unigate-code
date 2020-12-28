import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from '../edit/switch-controls';

const contestStatus = ({ node }) => (
  <SwitchControls node={node} items={controls(node)} />
);

export default contestStatus;
