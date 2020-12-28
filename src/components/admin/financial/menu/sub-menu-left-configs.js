import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

export const menuItems = () => [
  {
    icon: {
      position: 'left',
      type: 'dashboard',
    },
    url: getUrl('financial/dashboard'),
    id: 'dashboard',
    title: t1('dashboard'),
  },
  {
    id: 'fee_setup',
    title: t1('fee_setup'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'tags',
        },
        url: getUrl('financial/fee-categories'),
        id: 'fee-categories',
        title: t1('fee_categories'),
      },
      {
        icon: {
          position: 'left',
          type: 'table',
        },
        url: getUrl('financial/finance-templates'),
        id: 'finance-templates',
        title: t1('finance_templates'),
      },
      {
        icon: {
          position: 'left',
          type: 'appstore',
        },
        url: getUrl('financial/subjectgroup'),
        id: 'subjectgroup',
        title: t1('subject_groups'),
      },
      {
        icon: {
          position: 'left',
          type: 'rise',
        },
        url: getUrl('financial/benefits'),
        id: 'benefits',
        title: t1('benefits'),
      },
    ],
  },
  {
    id: 'generate_fees',
    title: t1('generate_fees'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'table',
        },
        url: getUrl('financial/applied-fee-templates'),
        id: 'applied-fee-templates',
        title: t1('applied_fee_templates'),
      },
      {
        icon: {
          position: 'left',
          type: 'schedule',
        },
        url: getUrl('financial/fee-collecting-phase'),
        id: 'fee-collecting-phase',
        title: t1('fee_collecting_phase'),
      },
      {
        icon: {
          position: 'left',
          type: 'project',
        },
        url: getUrl('financial/invoice'),
        id: 'invoices',
        title: t1('invoices'),
      },
      {
        icon: {
          position: 'left',
          type: 'project',
        },
        url: getUrl('financial/cancel-invoice'),
        id: 'cancel-invoice',
        title: t1('cancel_invoice'),
      },
      {
        icon: {
          position: 'left',
          type: 'download',
        },
        url: getUrl('financial/deposits'),
        id: 'deposits',
        title: t1('deposits'),
      },
      {
        icon: {
          position: 'left',
          type: 'wallet',
        },
        url: getUrl('financial/wallets'),
        id: 'wallets',
        title: t1('wallets'),
      },
      {
        icon: {
          position: 'left',
          type: 'line-chart',
        },
        url: getUrl('financial/pay'),
        id: 'pay',
        title: t1('automatically_pay'),
      },
      {
        icon: {
          position: 'left',
          type: 'team',
        },
        url: getUrl('financial/fee-users'),
        id: 'fee-users',
        title: t1('fees'),
      },
    ],
  },
  {
    id: 'other',
    title: t1('other'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'setting',
        },
        url: getUrl('financial/fee-cron-jobs'),
        id: 'fee-cron-jobs',
        title: t1('fee_cron_jobs'),
      },
    ],
  },
];
