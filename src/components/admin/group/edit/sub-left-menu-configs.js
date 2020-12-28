import { t1 } from 'translate';
import routes from 'routes';
import { getSubMenuLink } from 'routes/links';
import { categoryRelationTypes, socialFunctionGroups } from 'configs/constants';

// const handleStatusToggle = (event, toggled, node) => {
//   store.dispatch(
//     sagaActions.updateNodeRequest({
//       iid: node.iid,
//       step: 'status',
//       data: {
//         id: node.id,
//         iid: node.iid,
//         ntype: node.ntype,
//         status: toggled ? 'active' : 'inactive',
//       },
//       alternativeApi: 'category/update',
//     }),
//   );
// };

export const updateStatusControl = (node) => {
  return {
    baseURL: routes.url('node_update', {
      ...node,
      step: 'status',
      ntype: 'category',
    }),
    value: node.status || 'inactive',
    dataSet: { on: 'active', off: 'inactive' },
    labelSet: { on: t1('active'), off: t1('inactive') },
    name: 'status',
    label: true,
  };
};

export const menuItems = (node) => {
  if (!node || !node.ntype) {
    return [];
  }

  if (Object.values(socialFunctionGroups).includes(node && node.type)) {
    return [
      {
        id: 'dashboard',
        url: getSubMenuLink(node.ntype, node, 'dashboard'),
        title: t1('dashboard'),
        icon: {
          position: 'left',
          type: 'dashboard',
        },
      },
      {
        id: 'current_members',
        url: getSubMenuLink(node.ntype, node, 'members'),
        title: t1('current_members'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'import_members',
        url: getSubMenuLink(node.ntype, node, 'import-members'),
        title: t1('import_members'),
        icon: {
          position: 'left',
          type: 'upload',
        },
      },
      {
        id: 'edit_information',
        url: getSubMenuLink(node.ntype, node, 'info'),
        title: t1('edit_information'),
        icon: {
          position: 'left',
          type: 'edit',
        },
      },
    ];
  } else if (
    [
      categoryRelationTypes.ADMISSION,
      categoryRelationTypes.STUDENT_RECOGNITION,
      categoryRelationTypes.FINISHING_SENIOR,
      categoryRelationTypes.GRADUATING_SENIOR,
      categoryRelationTypes.EXPULSION_GROUP,
    ].includes(node && node.type)
  ) {
    return [
      {
        id: 'dashboard',
        url: getSubMenuLink(node.ntype, node, 'dashboard'),
        title: t1('dashboard'),
        icon: {
          position: 'left',
          type: 'dashboard',
        },
      },
      {
        id: 'members',
        url: getSubMenuLink(node.ntype, node, 'members'),
        title: t1('members'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'edit_information',
        url: getSubMenuLink(node.ntype, node, 'info'),
        title: t1('edit_information'),
        icon: {
          position: 'left',
          type: 'edit',
        },
      },
    ];
  }

  const ret = [
    {
      id: 'dashboard',
      url: getSubMenuLink(node.ntype, node, 'dashboard'),
      title: `${t1('dashboard')}`,
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    {
      id: 'edit_information',
      url: getSubMenuLink(node.ntype, node, 'info'),
      title: t1('edit_information'),
      icon: {
        position: 'left',
        type: 'edit',
      },
    },
    {
      id: 'current_members',
      url: getSubMenuLink(node.ntype, node, 'members'),
      title: `${t1('current_members')} (${node.current_members || 0})`,
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      id: 'pending_members',
      url: getSubMenuLink(node.ntype, node, 'pending_members'),
      title: `${t1('pending_members')} (${node.pending_members || 0})`,
      icon: {
        position: 'left',
        type: 'team',
      },
      hidden: !node.smart,
    },
    {
      id: 'score',
      url: getSubMenuLink(node.ntype, node, 'score'),
      title: `${t1('learning_result')}`,
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'supervisor',
      url: getSubMenuLink(node.ntype, node, 'supervisor'),
      title: t1('supervisor'),
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    // {
    //   url: getSubMenuLink(node.ntype, node, 'redundant_members'),
    //   title: `${t1('redundant_members')} (${node.redundant_members ||
    //     0})`,
    //   icon: {
    //     position: 'left',
    //     type: 'team',
    //   },
    //   hidden: !node.smart,
    // },
    // {
    //   url: getSubMenuLink(node.ntype, node, 'learning-items'),
    //   title: t1('manage_learning_items'),
    //   icon: {
    //     position: 'left',
    //     type: 'ordered-list',
    //   },
    // },
  ];

  if (node && node.smart) {
    ret.push({
      id: 'filter_conditions',
      url: getSubMenuLink(node.ntype, node, 'filtersets'),
      title: t1('filter_conditions'),
      icon: {
        position: 'left',
        type: 'filter',
      },
    });
  }

  return ret;
};
