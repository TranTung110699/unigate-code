import React from 'react';
import { createSelector } from 'reselect';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';

const ButtonNew = (
  <Link to="/admin/financial/fee-collecting-phase/new" className="button-link">
    <FlatButton
      icon={<Icon icon="plus" />}
      label={t1('new_fee_collecting_phase')}
    />
  </Link>
);

const feeCategory = createSelector(
  (state, props) => props && props.node,
  (node) => {
    if (!node || !node.action || node.action !== 'new') {
      return [
        {
          component: ButtonNew,
          type: 'modal',
          floatRight: true,
          icon: 'plus',
        },
      ];
    }
    return [];
  },
);

export default feeCategory;
