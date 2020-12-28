/* eslint-disable jsx-a11y/anchor-is-valid */
import { required } from 'common/validators';
import { t1 } from 'translate';
import {
  abacRoleAppliedScopeOptions,
  abacRoleAppliedScopes,
} from 'configs/constants';
import { change } from 'redux-form';
import Store from 'store';
import { organizations } from 'components/admin/organization/schema/elements';
import { slugifier, convertBooleanValueToInt } from 'common/normalizers';
import modulePermissionListSchema from './modulePermissionListSchema';
import Toggle from 'schema-form/elements/toggle';
import { courseLearningTypes } from '../../../../configs/constants';

const schema = (formid, values, step) => {
  let readOnlyOrganization = false;
  let disableAllOrganization = false;

  let organizationIids = [];

  if (values.applied_target && values.applied_target.type === 'organization') {
    // Organization abac rule
    const organizationIid = parseInt(
      (values.applied_target && values.applied_target.iid) || '',
      10,
    );

    if (organizationIid > 0) {
      organizationIids = [organizationIid];
    }
  } else {
    // Other abac rule
    organizationIids =
      (values.applied_target && values.applied_target.organizations) || [];
  }

  switch (step) {
    case 'new_organization':
    case 'new_contest':
    case 'new_course':
    case 'new_syllabus':
      readOnlyOrganization = true;
      disableAllOrganization = true;
      break;

    default:
      readOnlyOrganization = false;
      disableAllOrganization = false;
  }

  // If entity not in any department then show choose department
  if (step.includes('new') && !organizationIids.length) {
    readOnlyOrganization = false;
    disableAllOrganization = false;
  }

  // If edit then can not change organization
  if (step.includes('edit')) {
    readOnlyOrganization = true;
    disableAllOrganization = true;
  }

  return {
    abstract_role: {
      type: 'select',
      options: 'async',
      paramsasync: {
        key: `abstract-roles-of-${values.type}`,
        valueKey: 'iid',
        value: {
          type: values.type,
        },
      },
      floatingLabelText: t1('abstract_role'),
      populateValue: true,
    },
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      floatingLabelFixed: false,
      validate: [required(t1('name_cannot_be_empty'))],
      fullWidth: true,
    },
    code: {
      type: 'text',
      hintText: t1('code'),
      floatingLabelText: t1('code'),
      floatingLabelFixed: false,
      validate: [required(t1('code_cannot_be_empty'))],
      fullWidth: true,
      normalize: slugifier,
    },
    freeze_actions: {
      type: 'checkbox',
      defaultValue: 0,
      label: t1('freeze_actions'),
      normalize: convertBooleanValueToInt,
      fullWidth: true,
    },
    // whether this role always created for some specific kinds of course/organization/syllabus...
    compulsory_role: {
      type: 'checkbox',
      defaultValue: 0,
      label: t1('compulsory_for_some_entities'),
      fullWidth: true,
      normalize: convertBooleanValueToInt,
    },
    applied_course_type: {
      type: 'select',
      defaultValue: 1,
      options: [
        {
          value: '1',
          label: t1('all_courses'),
        },
        {
          value: courseLearningTypes.ILT,
          label: t1('ilt'),
        },
        {
          value: courseLearningTypes.ONLINE,
          label: t1('online'),
        },
      ],
      label: t1('automatically_applied_for_all_course_of_type'),
    },
    organizations: organizations({
      formid,
      label: `${t1('organizations')}`,
      defaultValue: organizationIids,
      validate: required(t1('organization_can_not_empty')),
      readOnly: readOnlyOrganization,
    }),
    all_organizations: {
      type: Toggle,
      labelPosition: 'right',
      label: {
        on: t1('any_where'),
        off:
          t1('can_choose_one_or_many_departments') +
          t1(
            '(system_will_create_a_respective_role_for_each_selected_department)',
          ),
      },
      disabled: disableAllOrganization,
    },
    description: {
      type: 'text',
      hintText: t1('description'),
      floatingLabelText: t1('description'),
      floatingLabelFixed: false,
      multiLine: true,
      fullWidth: true,
    },
    applied_scope: {
      type: 'select',
      floatingLabelText: t1('apply_to'),
      fullWidth: true,
      options: abacRoleAppliedScopeOptions(),
      validate: [required(t1('applied_scope_cannot_be_empty'))],
      readOnly: values.type !== 'abstract',
      onChange: () =>
        Store.dispatch(change(formid, 'module_permissions', null)),
    },
    update_applied_roles_permission: {
      type: 'checkbox',
      label: t1('update_applied_roles_permission'),
    },
    module_permissions: {
      type: 'section',
      schema: modulePermissionListSchema,
    },
    sub_types: {
      type: 'multiCheckbox',
      options: values.orgTypes || [],
      defaultValue: [],
      inline: true,
      floatingLabelText: t1('sub_types'),
      floatingLabelFixed: false,
    },
  };
};

const newAbstractRoleUI = (values) => {
  const fields = [
    'applied_scope',
    'name',
    'code',
    'description',
    'freeze_actions',
  ];
  if (values.applied_scope === abacRoleAppliedScopes.SCHOOL) {
    fields.push('sub_types');
  }

  if (values.applied_scope === abacRoleAppliedScopes.COURSE) {
    fields.push('compulsory_role');
  }
  if (values.compulsory_role) {
    fields.push('applied_course_type');
  }

  return [
    {
      id: 'default',
      title: t1('general'),
      fields: [...fields],
    },
    {
      id: 'module_permissions',
      title: t1('modules'),
      fields: ['module_permissions'],
    },
  ];
};

const editAbstractRoleUI = (values) => {
  const fields = ['name', 'code', 'description', 'freeze_actions'];
  if (values.applied_scope === abacRoleAppliedScopes.SCHOOL) {
    fields.push('sub_types');
  }

  if (values.applied_scope === abacRoleAppliedScopes.COURSE) {
    fields.push('compulsory_role');
  }
  if (values.compulsory_role) {
    fields.push('applied_course_type');
  }

  return [
    {
      id: 'default',
      title: t1('general'),
      fields: [...fields],
    },
    {
      id: 'module_permissions',
      title: t1('modules'),
      fields: ['module_permissions'],
    },
    {
      id: 'others',
      title: t1('others'),
      fields: ['update_applied_roles_permission'],
    },
  ];
};

const newConcreteRoleUI = (values) => {
  const organizationFields = values.all_organizations
    ? ['all_organizations']
    : ['all_organizations', 'organizations'];

  return [
    {
      id: 'default',
      title: t1('general'),
      fields: [
        ...['abstract_role', 'name', 'code'],
        ...organizationFields,
        ...['description', 'applied_scope'],
      ],
    },
    {
      id: 'module_permissions',
      title: t1('modules'),
      fields: ['module_permissions'],
    },
  ];
};

const editConcreteRoleUI = (values) => {
  const organizationFields = values.all_organizations
    ? ['all_organizations']
    : ['all_organizations', 'organizations'];

  return [
    {
      id: 'default',
      title: t1('general'),
      fields: [...['name', 'code'], ...organizationFields, 'description'],
    },
    {
      id: 'module_permissions',
      title: t1('modules'),
      fields: ['module_permissions'],
    },
  ];
};

const ui = (step, values) => {
  const config = {
    new_abstract: newAbstractRoleUI(values),
    edit_abstract: editAbstractRoleUI(values),
    new_organization: newConcreteRoleUI(values),
    edit_organization: editConcreteRoleUI(values),
    new_academic_category: newConcreteRoleUI(values),
    edit_academic_category: editConcreteRoleUI(values),
  };

  if (config[step]) {
    return config[step];
  }

  if (step.includes('new')) {
    return newConcreteRoleUI(values);
  }

  return editConcreteRoleUI(values);
};

export default { schema, ui };
