import React from 'react';
import store from 'store';
import ScormProcessingStatus from 'components/admin/scorm/scorm-processing-status';
import routes from 'routes';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import { isScormSyllabus } from 'components/admin/scorm/scorm';

export const statusSwitch = (node) => ({
  baseURL: routes.url('node_update', {
    ...node,
    step: 'status',
    ntype: node.ntype,
  }),
  value: node.status || 'queued',
  dataSet: { on: 'approved', off: 'queued' },
  labelSet: { on: t1('approved'), off: t1('queued') },
  name: 'status',
  label: true,
  handleChange: (res) => {
    if (res.success) {
      store.dispatch(
        actions.fetchNode({
          ...node,
          depth: -1,
        }),
      );
    }
  },
});

export default (node) => {
  const { iid, ntype } = node;

  if (!ntype) {
    return [];
  }

  switch (ntype) {
    case 'syllabus':
    case 'sco':
      {
        let ret =
          // TODO: fix bug that TwoSideToggle doesn't toggle when clicked
          // data: [
          //   {
          //     onLabel: t1('approved'),
          //     offLabel: t1('queued'),
          //     toggled: node.status === 'approved',
          //     onToggle: (event, toggled) =>
          //       handleStatusToggle(event, toggled, node),
          //     componentType: 'TwoSideToggle',
          //   },
          //   {
          //     onLabel: t1('frozen'),
          //     offLabel: t1('editing'),
          //     toggled: node.freeze,
          //     onToggle: (event, toggled) =>
          //       handleFreezeToggle(event, toggled, node),
          //     componentType: 'TwoSideToggle',
          //   },
          // ],
          [
            ...(node.type !== 'syllabus_exam'
              ? [
                  statusSwitch(node),
                  // {
                  //   baseURL: routes.url('node_update', {
                  //     ...node,
                  //     step: 'active_status',
                  //     type: 'credit',
                  //     ntype,
                  //   }),
                  //   value: node.active_status || 'activated',
                  //   dataSet: { on: 'activated', off: 'closed' },
                  //   labelSet: { on: t1('activated'), off: t1('closed') },
                  //   name: 'active_status',
                  //   label: true,
                  // },
                ]
              : []),
            {
              baseURL: routes.url('node_update', {
                ...node,
                step: 'freeze',
                ntype,
              }),
              hidden: !node.iid,
              value: node.freeze || 0,
              dataSet: { on: 1, off: 0 },
              labelSet: { on: t1('frozen'), off: t1('editing') },
              name: 'freeze',
              label: true,
              handleChange: (res) => {
                if (res.success) {
                  store.dispatch(
                    actions.fetchNode({
                      iid,
                      ntype,
                      depth: -1,
                    }),
                  );
                }
              },
            },
          ];

        if (isScormSyllabus(node)) {
          ret = ret.concat([
            {
              id: 'label_processing_scorm',
              type: 'component',
              component: <ScormProcessingStatus item={node} />,
            },
          ]);
        }

        return ret;
      }
      return [];
  }
};
