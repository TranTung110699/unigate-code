import React from 'react';
import lodashGet from 'lodash.get';
import routes from 'routes';
import { t1 } from 'translate';
import ApproveToggle from '../common/approve-toggle';

export default (node) => {
  if (!lodashGet(node, 'iid')) {
    return [];
  }

  return [
    {
      component: <ApproveToggle node={node} />,
    },
  ];
};
