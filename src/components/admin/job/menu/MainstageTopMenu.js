import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const systemJobs = () => [
  {
    id: 'system-jobs',
    href: getUrl('jobs'),
    label: t1('system_jobs'),
    icon: 'cogs',
  },
];

export default systemJobs;
