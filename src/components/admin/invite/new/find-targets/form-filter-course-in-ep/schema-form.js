/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { required } from 'common/validators';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    text: {
      type: 'text',
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      name: 'text',
      floatingLabelText: t1('mutiple_name_or_iid_or_email'),
      floatingLabelFixed: true,
      placeholder: t1('e.g:%s', ['iid, mail@domain.com']),
    },
    user_organizations: organizations({
      formid,
      // multiple: false,
      label: `${t1('organizations')}`,
      defaultValue: props.orgIids,
      validate: [
        ...(values.requireOrganization
          ? [required(t1('organization_can_not_empty'))]
          : []),
      ],
      rootIids: values.organizationRootIids,
      subTypes: values.organizationSubTypes,
      getOnlyOrganizationWhereUserHasPermission:
        values.getOnlyOrganizationWhereUserHasPermission,
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    academic_categories: academicCategories(formid, {
      multiple: true,
      allowClear: true,
      dropdownStyle: {
        maxHeight: '30vh',
      },
    }),
    //   , {
    //   defaultValue: values.defaultAcademicCategories || [],
    // }),
  };
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const fields = [
    'text',
    'user_organizations',
    'include_sub_organizations',
    'academic_categories',
  ];

  // console.log({fields});
  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  // layout: { component: SearchFormLayout, freestyle: 1 },
};
