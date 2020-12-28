import { t1 } from 'translate';
import get from 'lodash.get';
import routes from 'routes';

export const allMenuItems = (node = {}) => [
  {
    icon: {
      position: 'left',
      type: 'dashboard',
    },
    id: 'dashboard',
    title: t1('dashboard'),
    url: routes.url('node_edit', Object.assign(node, { step: 'dashboard' })),
  },
  {
    icon: {
      position: 'left',
      type: 'info-circle',
    },
    id: 'information',
    title: t1('information'),
    url: routes.url('node_edit', Object.assign(node, { step: 'information' })),
  },
  {
    icon: {
      position: 'left',
      type: 'bank',
    },
    id: 'question_banks',
    title: `${t1('question_banks')} (${get(
      node,
      'bank_questions_count',
      0,
    )} ${t1('questions')})`,
    url: routes.url(
      'node_edit',
      Object.assign(node, { step: 'question-banks' }),
    ),
  },
  {
    icon: {
      position: 'left',
      type: 'ordered-list',
    },
    id: 'exercises',
    title: t1('exam_structure'),
    url: routes.url('node_edit', Object.assign(node, { step: 'exercises' })),
  },
  /*  {
    icon: {
      position: 'left',
      type: 'bank',
    },
    id: 'bank',
    title: `${t1('bank')} (${
      node.bank_questions_count ? node.bank_questions_count : 0
    })`,
    url: routes.url('node_edit', Object.assign(node, { step: 'bank' })),
  },*/
];

/*
<ActionToggle
  hideLabel
  baseURL={routes.url('node_update', {
    ...item,
    step: 'status',
    ntype: 'exam-template',
  })}
  dataSet={this.actionToggleDataSet}
  value={item.status || 'queued'}
  readOnly={item.status === 'deleted'}
  name="status"
  title={t1('approve_or_queue_syllabus')}
/>
*/

export const menuItems = (node) => {
  const menuIdsAvailable = ['dashboard', 'exercises', 'information', 'bank'];
  return allMenuItems(node);

  // return filterMenusAvailableForSubLeftMenuV2(
  //   allMenuItems(node),
  //   menuIdsAvailable,
  // );
};
