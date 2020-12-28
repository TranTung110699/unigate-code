import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { change } from 'redux-form';
import lodashGet from 'lodash.get';
import Store from 'store';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { required } from '../../../common/validators';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values, step, xpath) => {
  const item = lodashGet(values, xpath);
  const index = values.quickAssignRole.indexOf(item);

  const resetSelectBoxAbstractRole = () => {
    if (values) {
      values.quickAssignRole[index].abstract_role = [];
      Store.dispatch(change(formid, 'quickAssignRole', values.quickAssignRole));
    }
  };

  const orgTypes =
    values.orgTypes &&
    values.orgTypes.map((orgType) => ({
      name: t1(orgType.name),
      value: Number.parseInt(orgType.type, 10),
      label: t1(orgType.name),
      primaryText: t1(orgType.name),
    }));

  const subTypes = values.quickAssignRole[index].sub_type || [];

  return {
    users: {
      type: InputAutoComplete,
      baseUrl: apiUrls.user_search,
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        valueKeys: ['name', 'iid', 'id', 'avatar'],
        transformData: true,
      },
      floatingLabelText: t1('find_user'),
      fullWidth: true,
      validate: [required(t1('users_cannot_be_empty'))],
    },
    applied_scope: {
      type: 'select',
      floatingLabelText: t1('apply_to'),
      fullWidth: true,
      options: values.abacRoleAppliedScopeOptions(),
      validate: [required(t1('applied_scope_cannot_be_empty'))],
      onChange: () => resetSelectBoxAbstractRole(),
    },
    abstract_role: {
      type: InputAutoComplete,
      baseUrl: aApiUrls.abstract_role,
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        transformData: true,
      },
      params: {
        _sand_step: 'abstract_role',
        type: item && item.applied_scope,
        sub_type: subTypes,
      },
      floatingLabelText: t1('abstract_role'),
      fullWidth: true,
      validate: [required(t1('abstract_role_cannot_be_empty'))],
    },
    academicCategories: academicCategories(formid, {
      label: `${t1('academic_categories')}`,
      validate: [required(t1('academic_categories_cannot_be_empty'))],
    }),
    organizations: organizations({
      formid,
      label: `${t1('organization')}`,
      validate: [required(t1('organization_cannot_be_empty'))],
    }),
    sub_type: {
      type: 'multiCheckbox',
      options: orgTypes,
      defaultValue: [],
      inline: true,
      floatingLabelText: t1('sub_types'),
      floatingLabelFixed: false,
      validate: [required(t1('sub_type_cannot_be_empty'))],
      onChange: () => resetSelectBoxAbstractRole(),
    },
  };
};

const ui = (step, values, themeConfig, xpath) => {
  const item = lodashGet(values, xpath);
  const fields = ['users', 'applied_scope'];

  const appliedScope = (item && item.applied_scope) || '';

  switch (appliedScope) {
    case 'school':
      break;
    case 'organization':
      fields.push('sub_type');
      fields.push('organizations');
      break;
    case 'academic_category':
      fields.push('academicCategories');
      break;
    default:
      break;
  }

  fields.push('abstract_role');

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
};
