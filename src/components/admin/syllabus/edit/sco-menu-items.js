import routes from 'routes';
import { t1 } from 'translate';
import Links from 'routes/links';

const scoMenuItems = (node) => {
  const { iid, ntype } = node;
  const validateUrl = `/syllabus/index/check-validity?iid=${iid}&ntype=syllabus`;

  return [
    {
      id: 'edit_sco',
      title: t1('edit_sco'),
      url: routes.url('edit_item', {
        ntype: 'sco',
        item: { iid, ntype: 'sco' },
      }),
      icon: {
        position: 'left',
        type: 'edit',
      },
      exact: true,
    },
    {
      id: 'collaborators',
      title: t1('collaborators'),
      url: routes.url('edit_item', {
        mode: 'staff',
        item: { iid, ntype: 'sco' },
      }),
      icon: {
        position: 'left',
        type: 'team',
      },
    },
    {
      id: 'check_validity',
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
      url: routes.url('edit_item', {
        mode: 'papers',
        ntype: 'sco',
        item: { iid },
      }),
      icon: {
        position: 'left',
        type: 'file-text',
      },
    },
    {
      id: 'translate',
      title: t1('translate'),
      url: routes.url('edit_item', {
        mode: 'translate',
        item: { iid, ntype: 'sco' },
      }),
      icon: {
        position: 'left',
        type: 'global',
      },
    },
    {
      id: 'manage_rubrics',
      title: t1('manage_rubrics'),
      url: routes.url('edit_item', {
        mode: 'rubric',
        ntype: 'sco',
        item: { iid, ntype: 'sco' },
      }),
      icon: {
        position: 'left',
        type: 'table',
      },
    },
    {
      id: 'preview',
      title: t1('preview'),
      url: Links.learnCourse(node, null, true),
      options: {
        target: '_blank',
      },
      icon: {
        position: 'left',
        type: 'eye',
      },
    },
  ];
};

export default scoMenuItems;
