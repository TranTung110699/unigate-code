import { createSelector } from 'reselect';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        id: 'job_position_name',
        href: '#',
        label: node && node.name,
      },
    ];
  },
);

export default menu;
