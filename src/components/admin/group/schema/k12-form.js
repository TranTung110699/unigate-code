/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
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
import Major from 'components/admin/user/schema/form-of-training/Major';
import filterset from 'components/admin/group/schema/elements/filterset/filterset';
import { getGroupMemberAddElement } from 'components/admin/group_assignment/group/manage/member/add/schema';
import { organizations } from 'components/admin/organization/schema/elements';
import RTE from 'schema-form/elements/richtext';

import {
  gradeElement,
  schoolYearSelect,
  semesterElement,
  trainingModeElement,
} from 'common/utils/form';
import DatePicker from 'schema-form/elements/date-picker';
import Attachments from 'schema-form/elements/attachments';

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

const schema = (formid, values, step, xpath, props, domainInfo) => {
  // const schema = (formid, values, step, xpath, props) => {
  let displayFields = [];

  return {
    grade: gradeElement(domainInfo, false, t1('grade')),
    training_mode: trainingModeElement(),
    score_scale: {
      type: 'select',
      floatingLabelText: t1('score_scale'),
      options: 'async',
      paramsasync: {
        __url__: '/skill/api/get-all-score-scale',
      },
    },
    venue_iids: {
      type: 'select',
      floatingLabelText: t1('venue'),
      options: 'async',
      multiple: true,
      paramsasync: {
        __url__: '/venue/api/get-venue-by-parent?type=venue',
        value: {
          k12: 1,
        },
      },
      // onChange: (event, value) => handleTypeChange(formid, values, value),
    },
    room_iids: {
      type: 'select',
      options: 'async',
      floatingLabelText: t1('rooms'),
      multiple: true,
      paramsasync: {
        __url__: `/venue/api/get-venue-by-parent`,
        value: {
          parent_iids: values.venue_iids,
          type: 'room',
          k12: 1,
        },
      },
    },

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
      floatingLabelText: t1('code'),
      defaultValue: '',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
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
      component: (
        <Major
          {...props}
          options={{
            floatingLabelText: t1('applicable_for_major'),
            displayFields,
            notValidate: true,
            forSearch: false,
          }}
        />
      ),
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
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: required(t1('organization_can_not_empty')),
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
    school_year_iid: schoolYearSelect(),
    semester_iids: semesterElement(values, true),
  };
};

const getUi = ({ mode, step, values, themeConfig, fieldsFilter }) => {
  const isSIS = themeConfig && themeConfig.type === schoolTypes.SIS;

  const newFieldsFilter = Array.isArray(fieldsFilter) ? [...fieldsFilter] : [];

  const id = `category-${step}`;

  // let fields = ['name', 'code', 'type'];
  let fields = [
    'training_mode',
    'grade',
    'name',
    'code',
    'score_scale',
    'type',
    // 'venue',
    // 'room',
  ];

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
      // if (values && values.type === categoryRelationTypes.USER_GROUP)
      //   fields.push('smart');
      //
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
        fields = [
          'training_mode',
          'grade',
          'code',
          'name',
          'score_scale',
          'school_year_iid',
          'semester_iids',
        ];
        // 'venue', 'room'];

        // if (!isSIS) {
        //   fields.push('organizations');
        // }
      }

      break;
    }
  }

  return [
    {
      id,
      fields: fields.filter((field) => !newFieldsFilter.includes(field)),
    },
    {
      id: 'location',
      fields: ['venue_iids', 'room_iids'],
      title: t1('class_rooms'),
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
