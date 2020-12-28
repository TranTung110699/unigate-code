/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { dateGreaterThan, required } from 'common/validators';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import {
  categoryRelationTypes,
  levelSocialFunctionGroups,
  schoolTypes,
  socialFunctionGroups,
  targetsApplyForCategory,
  userGroupSubTypes,
} from 'configs/constants';
import { getTimestampTheStartADay } from 'common/utils/Date';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import filterset from 'components/admin/group/schema/elements/filterset/filterset';
import { getGroupMemberAddElement } from 'components/admin/group_assignment/group/manage/member/add/schema';
import { organizations } from 'components/admin/organization/schema/elements';
import DatePicker from 'schema-form/elements/date-picker';
import Attachments from 'schema-form/elements/attachments';
import RTE from 'schema-form/elements/richtext';

const validateStartDateByFormValues = (formValues = {}) => {
  const validate = [
    dateGreaterThan(getTimestampTheStartADay(), t1('time_must_start_today')),
  ];
  if (
    formValues &&
    formValues.type === socialFunctionGroups.INSURANCE_CATEGORY
  ) {
    validate.push(required(t1('start_date_cannot_be_empty')));
  }
  return validate;
};

const validateEndDateByFormValues = (formValues) => {
  const validate = [
    // dateGreaterThan((formValues && formValues.start_date) || getTimestampTheStartADay(),
    //   t1((formValues && formValues.start_date) ?
    //     'end_date_must_be_after_start_date' :
    //     'end_date_must_be_after_today')),
  ];
  if (
    formValues &&
    formValues.type === socialFunctionGroups.INSURANCE_CATEGORY
  ) {
    validate.push(required(t1('start_date_cannot_be_empty')));
  }
  return validate;
};

const schema = (formid, values, step, xpath, props) => {
  let displayFields = [];
  if (
    values &&
    values.targets_applied &&
    values.targets_applied.includes(targetsApplyForCategory.MAJOR)
  ) {
    displayFields = ['faculty', 'major', 'training_mode', 'training_level'];
  }

  if (
    values &&
    values.targets_applied &&
    values.targets_applied.includes(targetsApplyForCategory.ICO)
  ) {
    displayFields.push('ico');
  }

  return {
    filtersets: {
      type: 'array',
      schema: filterset,
      limit: 1,
    },
    type: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('type'),
      floatingLabelFixed: true,
      options: Object.values(socialFunctionGroups).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
      disabled: step !== 'new',
      validate: required(),
    },
    level: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('use_type'),
      floatingLabelFixed: true,
      options: Object.keys(levelSocialFunctionGroups).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: levelSocialFunctionGroups[val],
      })),
      validate: required(),
    },
    targets_applied: {
      type: 'multiCheckbox',
      inline: true,
      fullWidth: true,
      floatingLabelText: t1('targets_applied'),
      options: Object.values(targetsApplyForCategory).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
    },
    code: {
      type: 'text',
      floatingLabelText: [
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(values.type)
        ? t1('decision_number')
        : t1('code'),
      defaultValue: '',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
      normalize: [
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(values.type)
        ? null
        : slugifier,
      disabled: values && values.id,
    },
    name: {
      type: 'text',
      floatingLabelText: t1('name'),
      defaultValue: '',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
      validate: required(),
    },
    pid: {
      type: 'select',
      floatingLabelText: t1('parent_category'),
      floatingLabelFixed: true,
      options: 'async',
      fullWidth: true,
    },
    sub_type: {
      type: 'checkbox',
      defaultValue: '',
      label: `${
        values && values.type === categoryRelationTypes.INSURANCE_CATEGORY
          ? t1('automatic_enroll')
          : t1('is_branch')
      }?`,
      normalize: convertBooleanValueToInt,
    },
    slug: {
      type: 'text',
      floatingLabelText: t1('slug'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    members: getGroupMemberAddElement(values),
    form_expression: {
      type: Attachments,
      label: t1('form_expression'),
      allowDownload: true,
      limit: 1,
      multiple: false,
      fullWidth: true,
    },
    content: {
      type: RTE,
      hintText: t1('content'),
      floatingLabelText: t1('content'),
      defaultValue: '',
      multiLine: true,
      fullWidth: true,
    },
    applicable_for_major: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        floatingLabelText: t1('applicable_for_major'),
        displayFields,
        notValidate: true,
        forSearch: false,
      }),
    },
    semester: {
      type: 'select',
      floatingLabelText: t1('semester'),
      options: 'async',
      paramsasync: {
        key: `${formid}-semester`,
        value: {
          effective_time: Math.floor(new Date().getTime() / 1000),
        },
        valueKey: 'iid',
      },
      fullWidth: true,
    },
    smart: {
      type: 'checkbox',
      defaultValue: 0,
      // classWrapper: 'col-md-12',
      label: t1('smart_group_(group_has_filters_attached)'),
      normalize: convertBooleanValueToInt,
    },
    start_date: {
      type: DatePicker,
      floatingLabelText: t1('start_date'),
      getStartDate: true,
      fullWidth: true,
      validate: validateStartDateByFormValues(values),
    },
    end_date: {
      type: DatePicker,
      floatingLabelText: t1('expried_date'),
      fullWidth: true,
      getEndDate: true,
      validate: validateEndDateByFormValues(values),
    },
    organizations: organizations({
      formid,
      multiple: false,
      label: t1('organizations'),
      defaultValue: props.orgIids,
    }),
    attachments: {
      type: Attachments,
      floatingLabelText: t1('upload_file'),
      allowDownload: true,
      multiple: true,
      fullWidth: true,
    },
    note: {
      type: RTE,
      floatingLabelText: t1('note'),
      multiple: true,
      fullWidth: true,
    },
  };
};

const getUi = ({ mode, step, values, themeConfig, fieldsFilter }) => {
  const isSIS = themeConfig && themeConfig.type === schoolTypes.SIS;

  const newFieldsFilter = Array.isArray(fieldsFilter) ? [...fieldsFilter] : [];

  const id = `category-${step}`;

  let fields = ['name', 'code', 'type'];

  if (
    !values ||
    !values.type ||
    (Object.values(socialFunctionGroups).includes(values.type) &&
      mode === 'new')
  ) {
    fields.push('type');
    if (values.type === socialFunctionGroups.STUDENT_TYPE) {
      fields = fields.concat(['level']);
    }
  }

  if (!isSIS && values.type === categoryRelationTypes.USER_GROUP) {
    fields.push('organizations');
  }

  // if (values.type === socialFunctionGroups.INSURANCE_CATEGORY) {
  if (
    [
      categoryRelationTypes.FINISHING_SENIOR,
      categoryRelationTypes.GRADUATING_SENIOR,
      categoryRelationTypes.ADMISSION,
      categoryRelationTypes.STUDENT_RECOGNITION,
      categoryRelationTypes.EXPULSION_GROUP,
    ].includes(values.type)
  ) {
    fields = fields.concat(['attachments', 'note']);
  } else if (isSIS) {
    fields = fields.concat(['start_date', 'end_date']);
  }

  if (
    !values ||
    !values.type ||
    (Object.values(socialFunctionGroups).includes(values.type) &&
      mode === 'new')
  ) {
    if (!isSIS && values.type === categoryRelationTypes.USER_GROUP) {
      fields.push('organizations');
    }

    fields.push('targets_applied');
  }

  switch (mode) {
    case 'new': {
      if (
        values &&
        values.type === categoryRelationTypes.USER_GROUP &&
        values.sub_type === userGroupSubTypes.ASSIGNMENT_GROUP
      ) {
        fields.push('members');
      }

      break;
    }
    default: {
      // edit
      if (step === 'edit_filtersets') {
        fields = ['filtersets'];
        break;
      }
      if (values && values.type === categoryRelationTypes.USER_GROUP) {
        fields = ['code', 'name'];

        if (!isSIS) {
          fields.push('organizations');
        }
      }

      break;
    }
  }

  if (fields.includes('targets_applied')) {
    if (
      values &&
      values.targets_applied &&
      values.targets_applied.length &&
      (values.targets_applied.includes(targetsApplyForCategory.MAJOR) ||
        values.targets_applied.includes(targetsApplyForCategory.ICO))
    ) {
      fields.push('applicable_for_major');
    }
    if (
      values &&
      values.targets_applied &&
      values.targets_applied.length &&
      values.targets_applied.includes(targetsApplyForCategory.SEMESTER)
    ) {
      fields.push('semester');
    }
  }

  return [
    {
      id,
      fields: fields.filter((field) => !newFieldsFilter.includes(field)),
    },
  ];
};

const layout = {
  new: '',
};

const getForm = (hiddenFields = {}) => ({
  schema,
  ui: (step, values, themeConfig, xpath, formid, props, mode) =>
    getUi({
      step,
      values,
      themeConfig,
      fieldsFilter: Object.keys(hiddenFields),
      mode,
    }),
  layout,
});

export default getForm;
