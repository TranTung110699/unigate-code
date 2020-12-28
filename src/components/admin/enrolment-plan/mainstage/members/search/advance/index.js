import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';
import { t1 } from 'translate';
import {
  searchByRubricElement,
  passFailedRubric,
} from 'components/admin/rubric/schema/elements';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    text: {
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
      labelText: t1('user_name,_email,_id_or_code...'),
    },
    learning_status: {
      type: 'radio',
      floatingLabelText: t1('learning_status'),
      floatingLabelFixed: true,
      fullWidth: true,
      inline: true,
      options: [
        {
          value: '',
          label: t1('all'),
        },
        {
          value: 'assigned',
          label: t1('assigned_to_learn'),
        },
        {
          value: 'unassigned',
          label: t1('not_yet_assigned'),
        },
        {
          value: 'completed',
          label: t1('passed'),
        },
        {
          value: 'not_yet_completed',
          label: t1('not_yet_completed'),
        },
      ],
    },
    selected_rubric_iid: searchByRubricElement(values.rubric_iid, 'col-md-4'),
    rubric_passed: passFailedRubric('col-md-3'),
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  return [
    {
      id: 'id',
      fields: [
        'text',
        'learning_status',
        'selected_rubric_iid',
        'rubric_passed',
      ],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
