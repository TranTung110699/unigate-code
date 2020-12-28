import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values) => ({
  staff_id: {
    type: 'select',
    floatingLabelText: t1('staff_list'),
    options: 'async',
    fullWidth: true,
  },
  staff_ids: {
    nameElement: 'targets',
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
    baseUrl: `/syllabus/api/get-school-approved-staffs?ntype=${
      values.ntype
    }&iid=${values.iid}`,
    dataSourceConfig: {
      text: 'name',
      value: 'id',
    },
    params:
      values && values.credit_syllabus
        ? {
            credit_syllabus: values && values.credit_syllabus,
            start_date: values && values.start_date,
            end_date: values && values.end_date,
          }
        : null,
    floatingLabelText: t1('find_group_or_organization_or_specific_user'),
    fullWidth: true,
  },

  role: {
    type: 'multiCheckbox',
    floatingLabelText: t1('roles'),
    options: 'async',
    inline: true,
    container: 'inline',
    floatingLabelFixed: true,
    fullWidth: true,
    defaultValue: ['staff'],
  },
});

const ui = {
  new: [
    {
      id: 'default',
      fields: ['staff_id', 'role'],
    },
  ],
  edit_add_staffs: [
    {
      id: 'default',
      fields: ['staff_ids', 'role'],
    },
  ],
  edit_add_staff: [
    {
      id: 'default',
      fields: ['staff_id', 'role'],
    },
  ],
  edit_roles: [
    {
      id: 'default',
      fields: ['role'],
    },
  ],
};

const layout = {};

export default { schema, ui, layout };
