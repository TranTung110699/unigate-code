import { t1 } from 'translate';
import routes from 'routes';
import { getSubMenuLink } from 'routes/links';
import { schoolTypes } from 'configs/constants';

export const menuItems = (node) => {
  switch (node.type) {
    case 'path':
      return [
        {
          id: 'path_dashboard',
          url: getSubMenuLink('path', node, 'dashboard'),
          title: t1('dashboard'),
          icon: {
            position: 'left',
            type: 'dashboard',
          },
        },
        {
          id: 'path_users',
          url: getSubMenuLink('path', node, 'users'),
          title: t1('users'),
          icon: {
            position: 'left',
            type: 'team',
          },
        },
        {
          id: 'path_groups',
          url: getSubMenuLink('path', node, 'groups'),
          title: t1('groups'),
          icon: {
            position: 'left',
            type: 'team',
          },
        },
        {
          id: 'path_invite',
          url: getSubMenuLink('path', node, 'enrolment'),
          title: t1('enrolment'),
          icon: {
            position: 'left',
            type: 'user-add',
          },
        },
        {
          id: 'path_children',
          url: getSubMenuLink('path', node, 'children'),
          title: t1('curriculum'),
          icon: {
            position: 'left',
            type: 'rise',
          },
        },
        {
          id: 'path_graduation',
          url: getSubMenuLink('path', node, 'graduation'),
          title: t1('graduation'),
          icon: {
            position: 'left',
            type: 'star',
          },
        },
        {
          id: 'path_update',
          url: getSubMenuLink('path', node, 'update'),
          title: t1('update'),
          icon: {
            position: 'left',
            type: 'edit',
          },
        },
        {
          id: 'path_avatar',
          url: getSubMenuLink('path', node, 'avatar'),
          title: t1('avatar'),
          icon: {
            position: 'left',
            type: 'picture',
          },
        },
      ];
    case 'program':
      return [
        {
          id: 'program_dashboard',
          url: getSubMenuLink('program', node, 'dashboard'),
          title: t1('dashboard'),
          icon: {
            position: 'left',
            type: 'dashboard',
          },
        },
        {
          id: 'program_children',
          url: getSubMenuLink('program', node, 'children'),
          title: t1('curriculum'),
          icon: {
            position: 'left',
            type: 'book',
          },
        },
        {
          id: 'program_update',
          url: getSubMenuLink('program', node, 'update'),
          title: t1('update_info'),
          icon: {
            position: 'left',
            type: 'edit',
          },
        },
        {
          id: 'program_majors',
          url: getSubMenuLink('program', node, 'majors'),
          title: t1('applied_majors'),
          icon: {
            position: 'left',
            type: 'radar-chart',
          },
          schoolTypes: [schoolTypes.SIS],
        },
        {
          id: 'prerequisites',
          url: getSubMenuLink('program', node, 'prerequisites'),
          title: t1('prerequisites'),
          icon: {
            position: 'left',
            type: 'ordered-list',
          },
          schoolTypes: [schoolTypes.SIS],
        },
      ];
    case 'classgroup':
      return [
        {
          id: 'classgroup_children',
          url: getSubMenuLink('classgroup', node, 'children'),
          title: t1('subjects'),
          icon: {
            position: 'left',
            type: 'read',
          },
        },
        {
          id: 'classgroup_users',
          url: getSubMenuLink('classgroup', node, 'user'),
          title: t1('users'),
          icon: {
            position: 'left',
            type: 'team',
          },
        },
        {
          id: 'classgroup_invite',
          url: getSubMenuLink('classgroup', node, 'invite'),
          title: t1('enrolment'),
          icon: {
            position: 'left',
            type: 'user-add',
          },
        },
        {
          id: 'classgroup_update',
          url: getSubMenuLink('classgroup', node, 'update'),
          title: t1('update_info'),
          icon: {
            position: 'left',
            type: 'edit',
          },
        },
      ];
    case 'subjectgroup': {
      let items = [
        {
          id: 'subjects_ingroup_update',
          url: getSubMenuLink('subjects-ingroup', node, 'update'),
          title: t1('update_info'),
          icon: {
            position: 'left',
            type: 'edit',
          },
        },
        {
          id: 'subjects_ingroup_children',
          url: getSubMenuLink('subjects-ingroup', node, 'children'),
          title: t1('curriculum'),
          icon: {
            position: 'left',
            type: 'appstore',
          },
        },
      ];

      if (node && node.applicable_to_all_subjects) {
        items = items.filter((item) => item.id !== 'subjects_ingroup_children');
      }

      return items;
    }
    default:
      return [];
  }
};
