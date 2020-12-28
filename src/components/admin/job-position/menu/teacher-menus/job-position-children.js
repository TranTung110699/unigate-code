import React from 'react';
import { createSelector } from 'reselect';
import ButtonNew from '../../mainstage/children/ButtonNew';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        id: 'job_position_name',
        href: '#',
        label: node && node.name,
      },
      {
        button: <ButtonNew node={node} />,
        id: 'job_position_new_children',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default menu;
