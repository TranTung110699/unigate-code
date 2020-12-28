import { createSelector } from 'reselect';

const feeCategory = createSelector(
  (state, props) => props && props.node,
  (node) => [
    {
      id: 'fee_category_name',
      href: '#',
      label: node && node.name,
    },
  ],
);

export default feeCategory;
