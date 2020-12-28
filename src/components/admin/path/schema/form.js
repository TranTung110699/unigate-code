import { t1 } from 'translate';
import { isNumber, required } from 'common/validators';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import apiUrls from 'api-endpoints';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import Elements from 'components/common/elements';
import { hasAcademicCategories, hasOrganization } from 'common/conf';
import { layouts, schoolTypes } from 'configs/constants';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import organizationTreeSelect from 'components/admin/organization/schema/elements/organization-tree-select';
import RTE from 'schema-form/elements/richtext';

const { schoolYear, semester } = Elements;

const schema = (formid, values, step, xpath, props) => ({
  name: {
    type: 'text',
    hintText: t1(values && values.type ? `${values.type}_name` : 'input_name'),
    floatingLabelText: `${t1('name')} (*)`,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    // onChange: (event, value) => {
    //   if (step === 'new') generateSlug(formid, value, 'slug');
    // },
  },
  type: {
    type: 'hidden',
    defaultValue: 'program',
  },
  code: {
    type: 'text',
    hintText: t1(values && values.type ? `${values.type}_code` : 'code'),
    floatingLabelText: `${t1('code')} (*)`,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    normalize: slugifier,
    // readOnly: (step !== 'new')
  },
  credit: {
    type: 'number',
    min: 1,
    floatingLabelFixed: false,
    floatingLabelText: t1('number_of_credits'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [isNumber(t1("value_is_required_and_can't_be_empty"))],
  },
  slug: {
    type: 'text',
    hintText: t1('unique_text_id'),
    floatingLabelText: `${t1('slug')} (*)`,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    normalize: slugifier,
  },
  title: {
    type: 'text',
    hintText: t1('title'),
    floatingLabelText: t1('title'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  display_type: {
    type: 'text',
    hintText: t1('display_type'),
    floatingLabelText: t1('display_type'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  sequential_learning: {
    type: 'checkbox',
    label: t1('check_if_path_has_to_be_learned_in_sequence'),
    fullWidth: true,
    normalize: convertBooleanValueToInt,
  },
  applicable_to_all_subjects: {
    type: 'checkbox',
    label: t1('applicable_to_all_subjects'),
    fullWidth: true,
  },
  price: {
    type: 'number',
    hintText: t1('path_price'),
    floatingLabelText: t1('price'),
    defaultValue: 0,
    fullWidth: true,
  },
  description: {
    type: RTE,
    hintText: t1('description'),
    floatingLabelText: t1('description'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  color: {
    type: 'text',
    hintText: '#354678',
    floatingLabelText: t1('input_color_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  status: {
    type: 'select',
    floatingLabelText: t1('status'),
    errorText: t1('loading_status'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
  },
  prefix_apply: {
    type: 'multiCheckbox',
    floatingLabelText: t1('prefix_apply_(use_for_searching)'),
    options: [
      { value: 'hocvet', label: 'hocvet' },
      { value: 'xpeak', label: 'xpeak' },
      { value: 'etec', label: 'etec' },
    ],
  },
  semester_count: {
    type: 'number',
    floatingLabelFixed: false,
    floatingLabelText: t1('number_of_semesters'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    min: 1,
    validate: [isNumber(t1('value_must_be_a_number'))],
  },
  faculty: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('forms_of_training'),
      displayFields: [
        'faculty',
        'major',
        'ico',
        'training_mode',
        'training_level',
      ],
      notValidate: true,
      forSearch: true,
    }),
  },
  school_year: schoolYear({
    formid,
    classWrapper: 'col-md-4',
    paramsasync: {
      values: {
        type: 'school_year',
        status: ['approved'],
        effective_time: Math.floor(new Date().getTime() / 1000),
      },
    },
  }),
  semester: semester({
    classWrapper: 'col-md-8',
    formid,
    values,
    type: 'select',
    multiple: false,
    paramsasync: {
      values: {
        type: 'semester',
        status: ['approved'],
        effective_time: Math.floor(new Date().getTime() / 1000),
        school_year: values && values.school_year,
      },
    },
    validate: [required(t1('semester_cannot_be_empty'))],
  }),
  organization_iid: organizationTreeSelect('organization_iid', formid),
  academic_categories: academicCategories(formid, {
    label: t1('categories'),
    hintText: t1('click_to_add_categories'),
  }),
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('content_organizations')} (*)`,
    defaultValue: props.orgIids,
    validate: [required()],
  }),
});

const getBasicProgramFields = (
  themeConfig,
  showOrganization,
  showAcademicCategories,
) => ({
  id: 'default',
  isBlock: 1,
  // title: t1('basic_information'),
  fields: [
    'name',
    'code',
    ...(showAcademicCategories ? ['academic_categories'] : []),
    ...(themeConfig &&
    themeConfig.type === schoolTypes.ENTERPRISE &&
    showOrganization
      ? ['organizations']
      : []),
    ...(themeConfig && themeConfig.layout !== layouts.EVN ? ['credit'] : []),
  ],
});

const basicSubjectGroupFields = (values) => {
  const fields = ['name', 'code'];
  if (values && values.is_credit_transfert_group) {
    fields.push('applicable_to_all_subjects');
  }
  return {
    id: 'default',
    fields,
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
  const showOrganization = hasOrganization(domainInfo);
  const showAcademicCategories = hasAcademicCategories(domainInfo);

  switch (step) {
    case 'edit':
      return [
        {
          id: 'default',
          title: t1('edit_path'),
          fields: [
            'slug',
            'name',
            'code',
            'title',
            'sequential_learning',
            'price',
            'description',
            'status',
            'prefix_apply',
            'organization_iid',
            'academic_categories',
          ],
        },
      ];
    case 'new_subjectgroup':
    case 'edit_subjectgroup':
      return [basicSubjectGroupFields(values)];
    case 'new_program':
      return [
        getBasicProgramFields(
          themeConfig,
          showOrganization,
          showAcademicCategories,
        ),
      ];
    case 'new_program-module':
    case 'edit_program-module':
      return [
        getBasicProgramFields(
          themeConfig,
          showOrganization,
          showAcademicCategories,
        ),
        {
          id: 'additional_information',
          fields: ['description'],
        },
      ];
    case 'new_specialization-program':
    case 'edit_specialization-program':
      return [
        getBasicProgramFields(
          themeConfig,
          showOrganization,
          showAcademicCategories,
        ),
      ];
    case 'edit_program':
      return [
        getBasicProgramFields(
          themeConfig,
          showOrganization,
          showAcademicCategories,
        ),
        {
          id: 'additional_information',
          title: t1('additional_information'),
          fields: [
            ...(themeConfig && themeConfig.type === schoolTypes.SIS
              ? ['semester_count']
              : []),
            'description',
          ],
        },
      ];
    case 'new_classgroup':
      return [
        {
          id: 'classgroup',
          fields: ['name', 'faculty', 'school_year', 'semester'],
        },
      ];
    case 'edit_classgroup':
      return [
        {
          id: 'classgroup',
          fields: ['name'],
        },
      ];
    case 'new_assign_users':
      return [
        {
          id: 'assign_users',
          fields: ['faculty'],
        },
      ];
    default:
      // step == new
      return [
        {
          id: 'default',
          title: t1('add_new_path'),
          fields: [
            'name',
            'code',
            'slug',
            'title',
            'sequential_learning',
            'price',
            'description',
            'organization_iid',
            'academic_categories',
          ],
        },
      ];
  }
};
const layout = {
  new: '',
};

const getSchemaEditEquivalentionPrerequisites = (scoreScaleNotYetApply) => ({
  score_scale: {
    type: 'select',
    populateValue: true,
    hiddenWhenOptionEmpty: true,
    classWrapper: 'col-md-12',
    floatingLabelText: t1('score_scale'),
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_all_score_scale,
      transformData: (data) =>
        Array.isArray(data) &&
        data
          .map((row) => {
            if (
              !scoreScaleNotYetApply ||
              !Array.isArray(scoreScaleNotYetApply) ||
              scoreScaleNotYetApply.includes(row && row.id)
            ) {
              return {
                value: row.id,
                label: row.name,
                primaryText: row.name,
              };
            }
            return null;
          })
          .filter(Boolean),
    },
    fullWidth: true,
    inline: true,
    validate: [required(t1("score_scale_can't_be_empty"))],
  },
});

const getUiEditEquivalentionPrerequisites = (hiddenFields) => {
  const fieldsFilter = Object.keys(hiddenFields) || [];

  return [
    {
      id: 'default',
      fields: ['score_scale'].filter((field) => !fieldsFilter.includes(field)),
    },
  ];
};

export const schemEditPrerequisites = ({
  scoreScaleNotYetApply,
  hiddenFields,
}) => ({
  schema: () => getSchemaEditEquivalentionPrerequisites(scoreScaleNotYetApply),
  ui: () => getUiEditEquivalentionPrerequisites(hiddenFields),
});

export default { schema, ui, layout };
