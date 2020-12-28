import { t1 } from 'translate';
import get from 'lodash.get';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';

const processorTypes = [
  {
    label: t1('department'),
    value: 'org_iids',
  },
  {
    label: t1('job_position'),
    value: 'positions',
  },
  {
    label: t1('users'),
    value: 'user_iids',
  },
];

const schema = (props) => {
  const processorPositions = get(props, 'formValues.processor.positions');
  const processorOrgIids = get(props, 'formValues.processor.org_iids');
  const processorTypesValue = get(props, 'formValues.processor.type', []) || [];
  return {
    type: {
      fullWidth: true,
      type: 'multiCheckbox',
      hintText: t1('status'),
      inline: true,
      options: processorTypes,
      defaultValue: ['user_iids', 'positions', 'org_iids'],
    },
    org_types: {
      type: 'select',
      floatingLabelText: t1('type_of_department'),
      floatingLabelFixed: true,
      fullWidth: true,
      multiple: true,
      options: get(props, 'orgTypeOptions', []),
    },
    org_iids: organizations({
      formid: props.formid,
    }),
    positions: positions(
      get(props, 'formid'),
      {},
      get(props, 'formValues.processor.org_iids'),
    ),
    user_iids: {
      type: InputAutoComplete,
      baseUrl: 'user/api/search',
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
      },
      fieldSearch: 'text',
      floatingLabelText: t1('users'),
      fullWidth: true,
      params: {
        statuses: ['activated'],
        is_staff: true,
        ntype: 'user',
        _sand_step: 'students',
        positions: processorTypesValue.includes('positions')
          ? processorPositions
          : null,
        user_organizations: processorTypesValue.includes('org_iids')
          ? processorOrgIids
          : null,
      },
    },
  };
};

/**
 * Lấy danh dách các fields cho form
 * @param values
 * @returns {string[]}
 */
const getFields = (values) => {
  const fields = ['type'];
  const processors = get(values, 'processor.type', []) || [];
  if (processors.includes('org_iids')) {
    fields.push('org_iids');
  }
  if (processors.includes('positions')) {
    fields.push('positions');
  }
  if (processors.includes('user_iids')) {
    fields.push('user_iids');
  }

  return fields;
};

const ui = (step, values) => [
  {
    id: 'processor',
    title: 'processor',
    fields: getFields(values),
  },
];

export default (props) => ({ schema: schema(props), ui });
