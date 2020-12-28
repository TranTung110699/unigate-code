import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { layouts, schoolTypes } from 'configs/constants';
import getCourseMenus, {
  filterMenuByAvailableMenu,
} from 'components/front-end/dashboard/show-by-tab/left-menu/configs-v2';

const getTeacherMenuItems = ({ node, mode, layout, domainInfo }) => {
  const menus = [
    {
      id: 'teaching-information',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'teaching-information',
      }),
      title: t1('teaching_information'),
      icon: {
        position: 'left',
        type: 'book',
      },
    },
    {
      id: 'teacher-roles',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'teacher-roles',
      }),
      title: t1('teacher_roles'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    // {
    //   id: 'teaching-experiences',
    //   url: getUrl('node_edit', {
    //     ...node,
    //     ntype: mode,
    //     step: 'teaching-experiences',
    //   }),
    //   title: t1('teaching_experiences'),
    //   icon: {
    //     position: 'left',
    //     type: 'hourglass',
    //   },
    //   hidden: layout === layouts.EVN,
    // },
    // deleted 'academic-rank-info', 'contracts', 'teaching-experience',
  ];
  const adminTeacherAvailableMenus =
    lodashGet(domainInfo, 'conf.teacher_available_admin_menus') || [];
  const subMenu = filterMenuByAvailableMenu(menus, adminTeacherAvailableMenus);
  if (!Array.isArray(subMenu) || !subMenu.length) {
    return [];
  }

  return subMenu;
};

export default getTeacherMenuItems;
