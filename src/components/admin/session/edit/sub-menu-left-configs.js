import { t1 } from 'translate';

const menuItems = (node) => {
  return [
    {
      id: 'dashboard',
      url: `/admin/session/${node.iid}/dashboard`,
      title: t1('dashboard'),
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    {
      id: 'update',
      url: `/admin/session/${node.iid}/update`,
      title: t1('session_information'),
      icon: {
        position: 'left',
        type: 'dashboard',
      },
    },
    // {
    //   id: 'attendance',
    //   url: `/admin/session/${node.iid}/attendance`,
    //   title: t1('session_attendance'),
    //   icon: {
    //     position: 'left',
    //     type: 'dashboard',
    //   },
    // },
  ];
};

export default menuItems;
