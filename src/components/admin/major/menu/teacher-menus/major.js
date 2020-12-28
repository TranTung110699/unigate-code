import { createSelector } from 'reselect';

const major = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        id: 'search_major',
        href: '#',
        label: node && node.name,
      },
    ];
  },
);

export default major;
