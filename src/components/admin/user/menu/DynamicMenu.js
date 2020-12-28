/**
 * Created by quandv on 12/05/17.
 */
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const DynamicMenu = (additional) => {
  const coreMenu = [
    // {
    //   id: 'list_user',
    //   href: getUrl('school/users'),
    //   label: t1('users'),
    //   icon: 'user',
    // },
    // {
    //   id: 'teacher_list',
    //   href: getUrl('school/teachers'),
    //   label: t1('teacher_list'),
    //   icon: 'user',
    // },
    {
      id: 'import_students',
      href: getUrl('school/import-students'),
      label: t1('import_students'),
      floatRight: true,
      primary: true,
    },
  ];

  if (additional) {
    return coreMenu.concat(additional);
  }
  return coreMenu;
};

export default DynamicMenu;
