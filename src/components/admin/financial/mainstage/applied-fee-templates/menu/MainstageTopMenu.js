import React from 'react';
import { createSelector } from 'reselect';
import ButtonNew from 'components/admin/financial/mainstage/applied-fee-templates/new/ButtonNew';

const menus = [];

const feeCategory = createSelector(
  (state, props) => props && props.node,
  (node) => {
    if (!node || !node.action || node.action !== 'new') {
      return menus.concat([
        {
          component: <ButtonNew />,
          type: 'modal',
          floatRight: true,
          icon: 'plus',
        },
      ]);
    }
    return menus;
  },
);

export default feeCategory;
