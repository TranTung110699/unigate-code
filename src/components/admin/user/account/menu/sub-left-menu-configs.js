import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

export const allMenuItems = () => [
  {
    id: 'accounts',
    url: getUrl('school/accounts'),
    title: t1('accounts'),
    icon: {
      position: 'left',
      type: 'user',
    },
  },
  {
    id: 'non-logged_in',
    url: getUrl('school/non-login'),
    title: t1('non-logged_in'),
    icon: {
      position: 'left',
      type: 'user-delete',
    },
  },
  {
    id: 'abnormal-accounts',
    url: getUrl('school/abnormal-accounts'),
    title: t1('abnormal_accounts'),
    icon: {
      position: 'left',
      type: 'user-delete',
    },
  },
];

export const menuItems = ({ conf } = {}) => {
  const enableItems = conf && conf.account_available_menus;
  const items = [];
  if (enableItems) {
    allMenuItems().forEach((item) => {
      if (enableItems.includes(item.id)) {
        items.push(item);
      }
    });
  }
  return items;
};
