import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'support',
  title: t3('support'),
  icon: {
    position: 'left',
    type: 'pic-right',
  },
  subMenu: [
    {
      id: 'payment_support',
      url: getUrl('support-payments'),
      title: t1('support_payment'),
      icon: {
        position: 'left',
        type: 'credit-card',
      },
    },
    {
      id: 'transaction',
      url: getUrl('transaction'),
      title: t1('transactions'),
      icon: {
        position: 'left',
        type: 'file-sync',
      },
    },
  ],
});
