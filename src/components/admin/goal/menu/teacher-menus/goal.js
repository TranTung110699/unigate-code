import { createSelector } from 'reselect';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        id: 'goal_name',
        href: '#',
        label: node && node.name,
      },
    ];
  },
);

export default menu;
