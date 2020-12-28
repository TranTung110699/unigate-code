import React from 'react';
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import FormSearchTarget from 'components/admin/invite/new/find-targets/Layout';
import { required } from 'common/validators';
import get from 'lodash.get';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const elementSpecialization = (node, { paramsasync, ...props }) => ({
  type: 'multiCheckbox',
  fullWidth: true,
  floatingLabelText: t1('specialization'),
  floatingLabelFixed: true,
  options: 'async',
  paramsasync: {
    __url__: '/user-major/api/get-specializations-by-form-of-training',
    value: {
      major: get(node, 'major'),
      training_mode: get(node, 'training_mode'),
      training_level: get(node, 'training_level'),
    },
    transformData: (data) =>
      Array.isArray(data) &&
      data
        .map(
          (row) =>
            row.iid && {
              value: row.iid,
              label: row.name,
              primaryText: row.name,
            },
        )
        .filter(Boolean),
    ...paramsasync,
  },
  classWrapper: 'col-md-12',
  ...props,
});

const schema = (formid, values, step, xpath, props) => ({
  user_iids: {
    nameElement: 'user_iids',
    componentElementSearch: FormSearchTarget,
    optionsProperties: {
      classNameWrapper: 'targets-wrapper',
      classNameEditorWrapper: 'targets-wrapper-editor',
      style: {
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        maxHeight: 300,
        paddingRight: 10,
      },
    },
    type: InputAutoComplete,
    baseUrl: '/site/api/get-user-or-group',
    dataSourceConfig: {
      text: 'key',
      value: 'data',
      transformData: 'name',
    },
    floatingLabelText: t1('find_group_or_organization_or_specific_user'),
    fullWidth: true,
  },
  major_from: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: get(props, 'optionsFilter.displayFields') || [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      notValidate: true,
      forSearch: true,
    }),
  },
  specialization: elementSpecialization(values, {
    hiddenWhenOptionEmpty: true,
    paramsasync: {
      key: `specialization-by-${get(values, 'major')}-${get(
        values,
        'training_mode',
      )}-${get(values, 'training_level')}`,
    },
  }),
});

const ui = (step, values) => {
  const fields = ['user_iids', 'major_from'];

  if (values && values.major && values.training_mode && values.training_level) {
    fields.push('specialization');
  }

  const group = {
    id: 'default',
    // title: t1('registration_major'),
    fields,
  };
  return [group];
};

const layout = {
  new: '',
};

const getSchemaEditSpecialization = (node) => ({
  specialization: elementSpecialization(node, {
    validate: [required(t1('specialization_cannot_be_empty'))],
  }),
});

export const editSpecializationSchema = (node) => ({
  schema: getSchemaEditSpecialization(node),
  ui: () => [
    {
      id: 'default',
      fields: ['specialization'],
    },
  ],
});

export const sendSmsSchema = {
  schema: (formid, values) => ({
    confirm: {
      type: 'cascade',
      component: (
        <div>
          {t1(
            'are_you_sure_you_want_to_send_message_with_content:_"%s"',
            get(values, 'messageSMS'),
          )}
        </div>
      ),
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['confirm'],
    },
  ],
};

export default { schema, ui, layout };
