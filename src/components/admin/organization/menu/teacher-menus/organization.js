import { createSelector } from 'reselect';

const department = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      // {
      //   id: 'organization_name',
      //   href: '#',
      //   label: node && node.name,
      // },
    ];
  },
);

export default department;
