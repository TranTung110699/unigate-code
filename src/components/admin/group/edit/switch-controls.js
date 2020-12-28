import { t1 } from 'translate';
import routes from 'routes';

import { categoryRelationTypes, socialFunctionGroups } from 'configs/constants';

/**
 * @param node
 * @returns {null|string|(function(*))}
 */
const getConfirmToChange = (node) => {
  if (node.type !== categoryRelationTypes.STUDENT_RECOGNITION) {
    return null;
  }

  return (logged) => {
    return t1(
      `all_student_in_the_group_to_changing_status_is_${
        logged ? 'studying' : 'qualified'
      }.are_you_sure_you_want_to_do_this`,
    );
  };
};

export default (node) => [
  {
    baseURL: routes.url('node_update', {
      ...node,
      step: 'status',
      ntype: 'category',
    }),
    value: node.status || 'inactive',
    dataSet: { on: 'active', off: 'inactive' },
    labelSet: { on: t1('active'), off: t1('inactive') },
    name: 'status',
    confirmToChange: getConfirmToChange(node),
    // confirmToChange: (toggle) => {
    //   console.log(toggle);
    // },
    label: true,
  },
];
