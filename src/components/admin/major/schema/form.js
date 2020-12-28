import React from 'react';
import { t1 } from 'translate';
import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import organizationSelectBox from 'components/admin/organization/schema/elements/organization-select-box';

const getIdentifierFromValues = (values) => values.identifier || t1('major');

const getOrganizationIdentifierFromValues = (values) =>
  values.organizationIdentifier || t1('organization');

const schema = (formid, values) => {
  const identifier = getIdentifierFromValues(values);
  const organizationIdentifier = getOrganizationIdentifierFromValues(values);

  return {
    name: {
      type: 'text',
      hintText: t1('name_of_%s', [identifier]),
      floatingLabelText: t1('name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    code: {
      type: 'text',
      hintText: t1('code_of_%s', [identifier]),
      floatingLabelText: t1('code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    slug: {
      type: 'text',
      hintText: t1('slug_of_%s', [identifier]),
      floatingLabelText: t1('slug'),
      validate: [required(t1('slug_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    organization: organizationSelectBox(organizationIdentifier, {
      paramsasync: {
        params: {
          type: 'organization',
          sub_type: [2],
          pid: -1,
          view: 'grid',
        },
      },
    }),
  };
};

const getConfigForStepEditMajor = (values) => {
  if (values && !values.level) {
    return [
      {
        id: 'default',
        fields: ['name', 'code', 'organization'],
      },
    ];
  }

  return [
    {
      id: 'default',
      fields: ['name', 'code'],
    },
  ];
};

const ui = (step, values) => {
  switch (step) {
    case 'new': {
      return [
        {
          id: 'default',
          fields: ['name', 'code', 'organization'],
        },
      ];
    }
    case 'edit_major': {
      return getConfigForStepEditMajor(values);
    }
    case 'edit_forms-of-training': {
      return [
        {
          id: '',
          fields: ['degrees'],
        },
      ];
    }
    default:
      return [];
  }
};

export const getSchema = () => ({ schema, ui });

export default { schema, ui };
