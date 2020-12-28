import routes from 'routes';
import { t1 } from 'translate';

export default (
  contest,
  field = 'status',
  dataSet = { on: 'approved', off: 'queued' },
  labelSet = { on: t1('approved'), off: t1('queued') },
) => {
  if (!contest || !contest.iid) {
    return [];
  }

  return [
    {
      baseURL: routes.url('node_update', {
        ...contest,
        step: field,
        ntype: 'contest',
      }),
      value: contest[field] || dataSet.off,
      dataSet: dataSet,
      labelSet: labelSet,
      name: field,
      label: true,
    },
  ];
};
