import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import get from 'lodash.get';
import { schoolTypes } from 'configs/constants';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import {
  org_district_id,
  org_province_id,
} from 'components/admin/pds/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import {
  organizationHasDistrict,
  organizationHasProvince,
  organizationIsPhongBan,
} from 'common/conf';

const getIdentifierFromValues = (values) =>
  values.identifier || t1('organization');

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const isSIS = get(domainInfo, 'school.type') === schoolTypes.SIS;

  const identifier = getIdentifierFromValues(values);
  const fieldsNotAllowedToEdit = get(props, 'fieldsNotAllowedToEdit', []);

  return {
    name: {
      type: 'text',
      hintText: t1('name_of_%s', [identifier]),
      floatingLabelText: `${t1('name')}(*)`,
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('name'),
    },
    short_name: {
      type: 'text',
      hintText: t1('short_name_of_%s', [identifier]),
      floatingLabelText: t1('short_name'),
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('short_name'),
    },
    code: {
      type: 'text',
      hintText: t1('code_of_%s', [identifier]),
      floatingLabelText: `${t1('code')}(*)`,
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
      readOnly: fieldsNotAllowedToEdit.includes('code'),
    },
    sub_type: {
      type: 'radio',
      options: values.orgTypes || [],
      defaultValue:
        Array.isArray(values.orgTypes) && values.orgTypes.length === 1
          ? values.orgTypes[0].value
          : null,
      inline: true,
      floatingLabelText: `${t1('organization_sub_types')}(*)`,
      validate: isSIS ? [] : [required(t1('sub_type_cannot_be_empty'))],
      errorText: '',
      readOnly: fieldsNotAllowedToEdit.includes('sub_type'),
    },
    pid: {
      nameElement: 'ids',
      type: InputAutoComplete,
      fieldSearch: 'text',
      format: (value) => [value],
      normalize: (value) => (Array.isArray(value) ? value[0] : null),
      params: {
        pid: -1,
        type: 'organization',
        view: 'grid',
        items_per_page: -1,
      },
      limit: 1,
      baseUrl: '/organization/api/search-pid',
      floatingLabelText: t1('parent_organization'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'id',
        transformData: (res) =>
          res.map(({ id, name, code }) => ({
            name,
            id,
          })),
      },
      readOnly: fieldsNotAllowedToEdit.includes('pid'),
    },
    academic_categories: academicCategories(formid, {
      label: t1('corresponding_academic_categories'),
      readOnly: fieldsNotAllowedToEdit.includes('academic_categories'),
    }),
    mail: {
      type: 'text',
      hintText: t1('typing_email'),
      floatingLabelText: t1('email'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('mail'),
    },
    address: {
      type: 'text',
      hintText: t1('address'),
      floatingLabelText: t1('address'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('address'),
    },
    org_province_id: org_province_id({
      fullWidth: true,
    }),
    org_district_id: org_district_id(values),
    phone: {
      type: 'phone',
      hintText: t1('phone'),
      floatingLabelText: t1('phone'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('phone'),
    },
    slug: {
      type: 'text',
      hintText: t1('slug_of_%s', [identifier]),
      floatingLabelText: t1('slug'),
      validate: [required(t1('slug_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      readOnly: fieldsNotAllowedToEdit.includes('slug'),
    },
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
  const isSIS = themeConfig && themeConfig.type === schoolTypes.SIS;

  const contact = {
    id: 'contact',
    title: t1('contact'),
    fields: ['phone', 'mail', 'address'],
  };

  const config = {
    new: [
      {
        id: 'default',
        fields: [
          'name',
          'short_name',
          'code',
          'sub_type',
          'pid',
          ...(values &&
          values.sub_type &&
          organizationIsPhongBan(domainInfo, values.sub_type) &&
          !isSIS
            ? ['academic_categories']
            : []),
          'address',
          ...(organizationHasProvince(domainInfo, values.sub_type)
            ? ['org_province_id']
            : []),
          ...(organizationHasDistrict(domainInfo, values.sub_type)
            ? ['org_district_id']
            : []),
          'phone',
        ],
      },
      contact,
    ],
    edit_organization: [
      {
        id: 'default',
        fields: [
          'name',
          'short_name',
          'code',
          'sub_type',
          'pid',
          ...(values &&
          values.sub_type &&
          organizationIsPhongBan(domainInfo, values.sub_type) &&
          !isSIS
            ? ['academic_categories']
            : []),
          ...(organizationHasProvince(domainInfo, values.sub_type)
            ? ['org_province_id']
            : []),
          ...(organizationHasDistrict(domainInfo, values.sub_type)
            ? ['org_district_id']
            : []),
        ],
      },
      contact,
    ],
  };
  return config[step];
};

export default { schema, ui };
