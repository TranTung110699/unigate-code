import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

const getAccountMenuItems = ({ node, mode, conf, schoolType, layout }) => {
  return [
    {
      id: 'change-password',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'change-password',
      }),
      title: t1('reset_password'),
      icon: {
        position: 'left',
        type: 'key',
      },
    },
    {
      id: 'change-ldap-username',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'change-ldap-username',
      }),
      title: t1('change_ad_username'),
      icon: {
        position: 'left',
        type: 'user',
      },
      hidden: lodashGet(conf, 'ldap_enabled') !== 'yes',
    },
    {
      id: 'status',
      action: 'status',
      url: getUrl('node_edit', { ...node, ntype: mode, step: 'status' }),
      title: t1('account_status'),
      icon: {
        position: 'left',
        type: 'check',
      },
    },
  ];
};

export default getAccountMenuItems;
