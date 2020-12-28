import React from 'react';
import { createSelector } from 'reselect';
import ButtonNew from '../../mainstage/children/ButtonNew';

const feeCategory = createSelector(
  (state, props) => props && props.node,
  (node) => [
    {
      id: 'fee_category_name',
      href: '#',
      label: node && node.name,
    },
    {
      button: <ButtonNew node={node} />,
      id: 'fee_category_new_children',
      type: 'modal',
      floatRight: true,
      icon: 'plus',
    },
  ],
);

export default feeCategory;
