import get from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';
import { isExamShift, isOfflineExam } from 'common/learn';

export default (node) => [
  {
    baseURL: routes.url('node_update', {
      ...node,
      step: 'status',
      ntype: 'course',
    }),
    value: node.status || 'queued',
    dataSet: { on: 'approved', off: 'queued' },
    labelSet: { on: t1('approved'), off: t1('queued') },
    name: 'status',
    label: true,
  },
  ...(isExamShift(node) && node.iid
    ? [
        {
          baseURL: routes.url('node_update', {
            ...node,
            step: 'is_close',
            ntype: 'course',
          }),
          hidden: !node.iid,
          value: node.is_close || false,
          dataSet: { on: true, off: false },
          labelSet: { on: t1('closed'), off: t1('open') },
          name: 'is_close',
          labelStyle: { color: '#a1a1a1' },
          label: true,
        },
      ]
    : []),
];
