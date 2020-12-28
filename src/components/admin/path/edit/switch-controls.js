import { t1 } from 'translate';
import routes from 'routes';

export default (node) => [
  {
    baseURL: routes.url('node_update', {
      ...node,
      step: 'status',
      ntype: 'path',
    }),
    value: node.status || 'queued',
    dataSet: { on: 'approved', off: 'queued' },
    labelSet: { on: t1('approved'), off: t1('queued') },
    name: 'status',
    label: true,
  },
];
