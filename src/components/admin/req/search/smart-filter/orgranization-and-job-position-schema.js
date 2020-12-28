import React from 'react';
import get from 'lodash.get';

import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';

const schema = ({ formid, values, xpath, isSis }, props) => {
  return {
    organizations: organizations({
      formid,
    }),
    positions: positions(formid, null, get(values, 'organizations')),
  };
};

const ui = ({ values, isSis }) => {
  const fields = ['organizations', 'positions'];
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default (isSis) => ({
  schema: (formid, values, step, xpath, props) =>
    schema({ formid, values, isSis, xpath }, props),
  ui: (step, values) => ui({ values, isSis }),
});
