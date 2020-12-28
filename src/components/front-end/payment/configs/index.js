import { t, t1 } from 'translate';

export const paymentMethodOptions = [
  {
    value: 'card',
    primaryText: t1('card'),
  },
  {
    value: 'bank',
    primaryText: t1('transfer_money_to_back_account'),
  },
];

export const cardIdOptions = [
  {
    value: 'vieted',
    primaryText: t('xpeak_card'),
  },
  {
    value: 'MOBI',
    primaryText: t('mobifone_card'),
  },
  {
    value: 'VIETEL',
    primaryText: t('viettel_card'),
  },
  {
    value: 'VINA',
    primaryText: t('vinaphone_card'),
  },
];
