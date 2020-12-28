import React from 'react';
import SwitchControls from 'components/common/SwitchControls';
import controls from '../edit/switch-controls';
import t1 from 'translate';

const contestRequireOTP = ({ node }) => (
  <SwitchControls
    node={node}
    items={controls(
      node,
      'require_otp',
      { on: 1, off: 0 },
      { on: t1('yes'), off: t1('no') },
    )}
  />
);

export default contestRequireOTP;
