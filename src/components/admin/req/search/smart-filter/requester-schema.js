import React from 'react';
import getLodash from 'lodash.get';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import Organizations from 'components/admin/organization/schema/elements/organization-with-include-sub-organization/Organizations';
import { positions } from 'components/admin/job-position/schema/elements';

import { t1 } from 'translate';

const schema = ({ formid, values, xpath, isSis }, props) => {
  const result = {
    text: {
      type: 'text',
      floatingLabelText: t1('search_text'),
      fullWidth: true,
    },
  };
  if (isSis) {
    result.major = {
      type: 'section',
      sectionCascade: true,
      schema: getMajorBoxSchema({
        displayFields: [
          'faculty',
          'major',
          'training_mode',
          'training_level',
          'ico',
        ],
        notValidate: true,
        forSearch: true,
      }),
    };
  } else {
    const userOrganizations = getLodash(values, 'requester.organizations');

    result.positions = positions(formid, {}, userOrganizations);
    result.organizations = {
      type: 'cascade',
      component: (
        <Organizations
          formValues={values}
          formid={formid}
          xpath={xpath}
          fieldName="organizations"
        />
      ),
    };
  }

  return result;
};

const ui = ({ values, isSis }) => {
  const fields = isSis ? ['major'] : ['organizations'];
  const userOrganizations = getLodash(values, 'requester.organizations');

  if (Array.isArray(userOrganizations) && userOrganizations.length) {
    fields.push('positions');
  }

  fields.push('text');

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
