import { t1 } from 'translate';
import routes from 'routes';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import store from 'store';
import actions from 'actions/node/creators';

export const approveSwitch = (node) => ({
  baseURL: routes.url('node_update', {
    ...node,
    step: 'status',
    ntype: 'exam-template',
  }),
  value: node.status || 'queued',
  dataSet: { on: 'approved', off: 'queued' },
  labelSet: { on: t1('approved'), off: t1('queued') },
  name: 'status',
  label: true,
});

export const freezeSwitch = (node) => ({
  baseURL: routes.url('node_update', {
    ...node,
    step: 'freeze',
    ntype: 'exam-template',
  }),
  hidden: !node.iid,
  value: node.freeze || 0,
  dataSet: { on: 1, off: 0 },
  labelSet: { on: t1('frozen'), off: t1('editing') },
  name: 'freeze',
  label: true,
});

export default (node) => [approveSwitch(node), freezeSwitch(node)];
