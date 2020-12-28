import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';
import { schoolTypes } from 'configs/constants';
import { getCategoryStructureLevelNameFromConfig } from 'common/category-structure';

export const menuItems = (props) => {
  const { conf, themeConfig, node } = props;
  const currentLevel = (node && node.level) || 0;
  const type = node && node.type;

  const nextLevelName = getCategoryStructureLevelNameFromConfig(
    node,
    conf,
    currentLevel + 1,
  );

  // const nextLevelName = t1('child_organizations');

  let configs = [
    {
      url: getSubMenuLink('organization', node, 'dashboard'),
      title: t1('dashboard'),
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    {
      id: 'info',
      url: getSubMenuLink('organization', node, 'info'),
      title: t1('information'),
      icon: {
        position: 'left',
        type: 'info-circle',
      },
    },
    {
      id: 'roles',
      url: getSubMenuLink('organization', node, 'roles'),
      title: t1('roles'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'staff',
      url: getSubMenuLink('organization', node, 'staff'),
      title: t1('trainers'),
      icon: {
        position: 'left',
        type: 'team',
      },
    },
  ];

  if (themeConfig && themeConfig.type === schoolTypes.ENTERPRISE) {
    configs = [
      ...configs,
      {
        id: 'accounts',
        url: getSubMenuLink('organization', node, 'accounts'),
        title: t1('accounts'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'students',
        url: getSubMenuLink('organization', node, 'students'),
        title: t1('students'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
    ];
  }

  if (
    themeConfig &&
    themeConfig.type === schoolTypes.SIS &&
    currentLevel === 0
  ) {
    configs = [
      ...configs,
      {
        id: 'major-students',
        url: getSubMenuLink('organization', node, 'major-students'),
        title: t1('students'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'majors',
        url: getSubMenuLink('organization', node, 'majors'),
        title: t1('major'),
        icon: {
          position: 'left',
          type: 'radar-chart',
        },
      },
      {
        id: 'credits',
        url: getSubMenuLink('organization', node, 'credits'),
        title: t1('subjects'),
        icon: {
          position: 'left',
          type: 'read',
        },
      },
      {
        id: 'courses',
        url: getSubMenuLink('organization', node, 'courses'),
        title: t1('course'),
        icon: {
          position: 'left',
          type: 'fund',
        },
      },
    ];
  }

  configs.push({
    id: 'job-positions',
    url: getSubMenuLink('organization', node, 'job-positions'),
    title: t1('job_positions'),
    icon: {
      position: 'left',
      type: 'shopping',
    },
  });

  if (nextLevelName) {
    configs = [
      ...configs,
      {
        id: 'children',
        url: getSubMenuLink('organization', node, 'children'),
        title: nextLevelName,
        icon: {
          position: 'left',
          type: 'cluster',
        },
      },
    ];
  }

  configs = [
    ...configs,
    {
      id: 'group',
      url: getSubMenuLink('organization', node, 'group'),
      title: t1('class'),
      icon: {
        position: 'left',
        type: 'info-circle',
      },
    },
  ];

  return node && node.iid && configs;
};
