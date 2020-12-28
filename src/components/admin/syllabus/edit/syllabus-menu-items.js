import routes from 'routes';
import { t1 } from 'translate';
import { isScormSyllabus } from 'components/admin/scorm/scorm';

const syllabusMenuItems = (node) => {
  const { iid, ntype } = node;
  const validateUrl = `/syllabus/index/check-validity?iid=${iid}&ntype=syllabus`;

  return [
    {
      id: 'dashboard',
      title: t1('dashboard'),
      url: routes.url('edit_item', { mode: 'dashboard', item: node }),
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    {
      id: 'syllabus_information',
      divider: true,
    },
    {
      id: 'basic_information',
      title: t1('edit_information'),
      url: routes.url('edit_item', { mode: 'edit', item: node }),
      icon: {
        position: 'left',
        type: 'edit',
      },
    },
    {
      id: 'edit_curriculum',
      title:
        node.type === 'credit'
          ? t1('subject_curriculum')
          : node.type === 'syllabus_exam'
          ? t1('exam_list')
          : t1('syllabus_curriculum'),
      url: routes.url('edit_item', { mode: 'children', item: node }),
      hidden: isScormSyllabus(node),
      icon: {
        position: 'left',
        type: 'bars',
      },
      // iconRight: ['approved', 'done_editing'].includes(node.status)
      //   ? {
      //       position: 'right',
      //       type: 'check-circle',
      //       theme: 'twoTone',
      //       twoToneColor: '#00bcd4',
      //     }
      //   : null,
      /*
        iconRight: {
          position: 'right',
          type: ['approved', 'done_editing'].includes(node.status)
            ? 'check-circle'
            : 'play-circle',
          theme: 'twoTone',
          twoToneColor: ['approved', 'done_editing'].includes(node.status)
            ? '#00bcd4'
            : '#eb2f96',
        },
        */
    },
    ...(node.type !== 'syllabus_exam'
      ? [
          {
            id: 'approval_flow',
            title: t1('approval_flow'),
            url: routes.url('edit_item', {
              mode: 'approval',
              item: node,
            }),
            icon: {
              position: 'left',
              type: 'rise',
            },
            iconRight: ['approved', 'done_editing'].includes(node.status)
              ? {
                  position: 'right',
                  type: 'check-circle',
                  theme: 'twoTone',
                  twoToneColor: '#00bcd4',
                }
              : null,
          },
        ]
      : []),
    {
      divider: true,
      id: 'roles_sep',
    },
    {
      id: 'roles',
      title: t1('roles'),
      url: routes.url('edit_item', { mode: 'roles', item: node }),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'staff',
      title: t1('staff_&_roles'),
      url: routes.url('edit_item', { mode: 'staff', item: node }),
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      id: 'comments',
      title: t1('comments'),
      url: routes.url('edit_item', { mode: 'comments', item: node }),
      icon: {
        position: 'left',
        type: 'message',
      },
    },
    // {
    //   id: 'avatar',
    //   title: t1('avatar'),
    //   url: routes.url('edit_item', { mode: 'avatar', item: node }),
    //   icon: {
    //     position: 'left',
    //     type: 'picture',
    //   },
    // },
    {
      id: 'validity',
      title: t1('check_validity'),
      url: validateUrl,
      icon: {
        position: 'left',
        type: 'check-circle',
      },
    },
    {
      id: 'exam_papers',
      title: t1('exam_papers'),
      url: routes.url('edit_item', { mode: 'papers', item: node }),
      icon: {
        position: 'left',
        type: 'file-text',
      },
    },
    {
      id: 'attached_programs',
      title: t1('programs'),
      url: routes.url('edit_item', { mode: 'programs', item: node }),
      icon: {
        position: 'left',
        type: 'book',
      },
    },
    {
      id: 'attached_courses',
      title: t1('courses'),
      url: routes.url('edit_item', { mode: 'courses', item: node }),
      icon: {
        position: 'left',
        type: 'fund',
      },
    },
    {
      id: 'translate',
      url: routes.url('edit_item', { mode: 'translate', item: node }),
      title: t1('translate'),
      icon: {
        position: 'left',
        type: 'global',
      },
    },

    {
      id: 'sessions',
      title: t1('session_manager'),
      url: routes.url('edit_item', { mode: 'sessions', item: node }),
      icon: {
        position: 'left',
        type: 'user',
      },
    },

    {
      id: 'manage_rubrics',
      title: t1('manage_rubrics'),
      url: routes.url('edit_item', { mode: 'rubric', item: node }),
      permissions: [],
      hidden: !node.rubric,
      icon: {
        position: 'left',
        type: 'table',
      },
    },
  ];
};

export default syllabusMenuItems;
