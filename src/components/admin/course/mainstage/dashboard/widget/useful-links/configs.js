import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const getMenuItems = (node) => {
  const menus = [];
  menus.push({
    id: 'edit_course_curriculum',
    icon: 'curriculum',
    href: getUrl(`syllabus/${node.syllabus}`),
    label: t1('curriculum'),
  });
  menus.push({
    id: 'view_course_enrolled_students',
    icon: 'progress',
    href: getUrl(`course/${node.iid}/users`),
    label: t1('progress'),
  });

  menus.push({
    id: 'view_course_assignments',
    icon: 'assignments',
    href: getUrl(`course/${node.iid}/assignments`),
    label: t1('assignments'),
  });

  menus.push({
    id: 'edit_enrolment',
    icon: 'enrolment',
    href: getUrl(`course/${node.iid}/invite`),
    label: t1('enrolment'),
  });

  menus.push({
    id: 'communication',
    icon: 'communication',
    href: getUrl(`course/${node.iid}/communication`),
    label: t1('communication'),
  });

  menus.push({
    id: 'score',
    icon: 'graduation',
    href: getUrl(`course/${node.iid}/score`),
    label: t1('score'),
  });
  return menus;
};

function addItems(total, items) {
  const menus = total || [];
  if (!items) return menus;

  items.forEach((item) => {
    for (let i = 0; i < menus.length; i += 1) {
      const menu = menus[i];
      if ((item && item.id) === (menu && menu.id)) {
        return;
      }
    }
    menus.push(item);
  });
  return menus;
}

export default function(node) {
  let menus = [];
  menus = addItems(menus, getMenuItems(node));

  return menus;
}
