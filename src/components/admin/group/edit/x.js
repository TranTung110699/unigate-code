import routes from 'routes';
import { getSubMenuLink } from 'routes/links';
import { categoryRelationTypes, socialFunctionGroups } from 'configs/constants';
import { t1 } from 'translate';

export const groupMenuItems = (node) => {
  // if (!node || !node.ntype) {
  //   return [];
  // }

  if (Object.values(socialFunctionGroups).includes(node && node.type)) {
    return [
      {
        url: getSubMenuLink(node.ntype, node, 'members'),
        title: t1('current_members'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        url: getSubMenuLink(node.ntype, node, 'import-members'),
        title: t1('import_members'),
        icon: {
          position: 'left',
          type: 'upload',
        },
      },
      {
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
      categoryRelationTypes.FINISHING_SENIOR,
      categoryRelationTypes.GRADUATING_SENIOR,
    ].includes(node && node.type)
  ) {
    return [
      {
        url: getSubMenuLink(node.ntype, node, 'members'),
        title: t1('members'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        url: getSubMenuLink(node.ntype, node, 'info'),
        title: t1('edit_information'),
        icon: {
          position: 'left',
          type: 'edit',
        },
      },
    ];
  }

  const staffLink =
    node.type != categoryRelationTypes.CATEGORY_USER_BUS_GROUP
      ? getSubMenuLink(node.ntype, node, 'staff')
      : `/admin/bus/${node.bus}`;

  const dashboardLink =
    node.type != categoryRelationTypes.CATEGORY_USER_BUS_GROUP
      ? getSubMenuLink(node.ntype, node, 'dashboard')
      : `/admin/bus/${node.bus}/dashboard`;

  const ret = [
    {
      url: dashboardLink,
      title: `${t1('group_dashboard')}`,
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    // {
    //   url: getSubMenuLink(node.ntype, node, 'roles'),
    //   title: `${t1('roles')}`,
    //   icon: {
    //     position: 'left',
    //     type: 'user',
    //   },
    // },
    {
      url: staffLink,
      title: t1('group_staff'),
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      url: getSubMenuLink(node.ntype, node, 'members'),
      title: `${t1('students')} (${node.current_members || 0})`,
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      url: getSubMenuLink(node.ntype, node, 'pending_members'),
      title: `${t1('pending_members')} (${node.pending_members || 0})`,
      icon: {
        position: 'left',
        type: 'team',
      },
      hidden: !node.smart,
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
    // ...(node.type != categoryRelationTypes.CATEGORY_USER_BUS_GROUP
    //   ? [
    //       {
    //         url: getSubMenuLink(node.ntype, node, 'info'),
    //         title: t1('edit_information'),
    //         icon: {
    //           position: 'left',
    //           type: 'edit',
    //         },
    //       },
    //     ]
    //   : []),
    {
      id: 'divider1',
      divider: true,
    },
    {
      url: getSubMenuLink(node.ntype, node, 'attendance'),
      title: t1('attendance'),
      icon: {
        position: 'left',
        type: 'layout',
      },
    },
    ...(node.type != categoryRelationTypes.CATEGORY_USER_BUS_GROUP
      ? [
          {
            url: getSubMenuLink(node.ntype, node, 'surveys'),
            title: t1('surveys'),
            icon: {
              position: 'left',
              type: 'layout',
            },
          },
        ]
      : []),
  ];

  if (node && node.smart) {
    ret.push({
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

export const schoolYearScoreReport = (node) => [
  // {
  //   id: 'dividerxxx',
  //   divider: true,
  // },
  {
    id: 'school_year_report',
    url: getSubMenuLink(node.ntype, node, 'year-report'),
    title: t1('school_year_report'),
    icon: {
      position: 'left',
      type: 'layout',
    },
  },
];
