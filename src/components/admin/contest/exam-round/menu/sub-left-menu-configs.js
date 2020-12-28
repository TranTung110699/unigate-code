import { t1 } from 'translate';
import routes from 'routes';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';

export const allMenuItems = (node = {}, contest = {}) => [
  {
    id: 'information',
    title: t1('information'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'info-circle',
        },
        id: 'information',
        title: t1('information'),
        url: routes.url(
          'node_edit',
          Object.assign(contest, {
            step: `exam-round/${node.iid}/information`,
          }),
        ),
      },
    ],
  },
  {
    id: 'manage',
    title: t1('manage'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'block',
        },
        url: routes.url(
          'node_edit',
          Object.assign(contest, {
            step: `exam-round/${node.iid}/exam-shifts`,
          }),
        ),
        id: 'exam-shifts',
        title: `${t1('exam_shifts')} (${
          node && node.number_exam_shifts ? node.number_exam_shifts : 0
        })`,
      },
      {
        icon: {
          position: 'left',
          type: 'team',
        },
        url: routes.url(
          'node_edit',
          Object.assign(contest, {
            step: `exam-round/${node.iid}/contestants`,
          }),
        ),
        id: 'contestants',
        title: `${t1('contestants')} (${
          node && node.number_contestants ? node.number_contestants : 0
        })`,
      },
    ],
  },
  {
    id: 'academic',
    title: t1('academic'),
    open: true,
    subMenu: [
      {
        icon: {
          position: 'left',
          type: 'shop',
        },
        url: routes.url(
          'node_edit',
          Object.assign(contest, {
            step: `exam-round/${node.iid}/exam-stores`,
          }),
        ),
        id: 'exam-stores',
        title: `${t1('exam_stores')} (${
          node && node.number_exam_stores ? node.number_exam_stores : 0
        })`,
      },
    ],
  },
];

export const menuItems = (node, itemAncestors) => {
  const menuIdsAvailable = [
    'information',
    'exam-shifts',
    'contestants',
    'exam-stores',
    'report-spent-time',
  ];
  let contest = {};
  if (itemAncestors) {
    contest = itemAncestors[0];
  }

  return filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node, contest),
    menuIdsAvailable,
  );
};

export const switchControls = (node) => {
  if (!node || !node.idd) {
    return {};
  }

  return {
    position: 'left',
    data: [
      {
        baseURL: routes.url('node_update', {
          ...node,
          step: 'is_close',
          ntype: 'exam-round',
        }),
        value: node.status || false,
        dataSet: { on: true, off: false },
        labelSet: { on: t1('closed'), off: t1('open') },
        name: 'is_close',
        label: true,
      },
    ],
  };
};
