import get from 'lodash.get';

import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';
import { schoolTypes } from 'configs/constants';
import { getCategoryStructureLevelNameFromConfig } from 'common/category-structure';

const getMenuItems = (props, allowedMenuItems) => {
  const { conf, category } = props;
  const currentLevel = get(category, 'level') || 0;
  const type = get(category, 'type');
  const nextLevelName = getCategoryStructureLevelNameFromConfig(
    { type },
    conf,
    currentLevel + 1,
  );

  let configs = [
    {
      icon: {
        position: 'left',
        type: 'dashboard',
      },
      id: 'dashboard',
      title: t1('dashboard'),
      url: getSubMenuLink('major', category, 'dashboard'),
    },
    {
      icon: {
        position: 'left',
        type: 'info-circle',
      },
      id: 'info',
      title: t1('information'),
      url: getSubMenuLink('major', category, 'info'),
    },
    {
      icon: {
        position: 'left',
        type: 'table',
      },
      id: 'forms_of_training',
      title: t1('forms_of_training'),
      url: getSubMenuLink('major', category, 'forms-of-training'),
    },
    {
      icon: {
        position: 'left',
        type: 'radar-chart',
      },
      id: 'program_majors',
      title: t1('applied_programs'),
      url: getSubMenuLink('major', category, 'programs'),
    },
  ];

  if (nextLevelName) {
    configs = [
      ...configs,
      {
        icon: {
          position: 'left',
          type: '',
        },
        id: 'children',
        title: nextLevelName,
        url: getSubMenuLink('major', category, 'children'),
      },
    ];
  }

  const labelStudents =
    category && category.degrees && category.degrees.length
      ? t1('students_&_graduation')
      : t1('students');

  configs = [
    ...configs,
    {
      icon: {
        position: 'left',
        type: '',
      },
      id: 'students',
      title: labelStudents,
      url: getSubMenuLink('major', category, 'students'),
    },
  ];

  return (
    category &&
    category.iid &&
    configs.filter((item) => allowedMenuItems.indexOf(item.id) !== -1)
  );
};

export const menuItems = (props) => {
  const { category, schoolType } = props;
  const allowedMenuItems = ['info', 'dashboard', 'students'];

  if (schoolType === schoolTypes.SIS && category && category.type === 'major') {
    allowedMenuItems.push('forms_of_training');
    allowedMenuItems.push('program_majors');
  } else {
    allowedMenuItems.push('children');
  }

  return getMenuItems(props, allowedMenuItems);
};
