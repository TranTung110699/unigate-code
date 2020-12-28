import React from 'react';
import { t1 } from 'translate';
import SupporterPerformance from '../reports/supporter-performance';

const reportOptions = [
  {
    value: 'supporter_performance',
    primaryText: t1('supporter_performance'),
    form: <SupporterPerformance />,
  },
  {
    value: 'transaction_supporter_performance',
    primaryText: t1('transaction_supporter_performance'),
  },
];

export default reportOptions;
