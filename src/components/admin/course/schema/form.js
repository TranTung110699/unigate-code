/* eslint-disable camelcase,jsx-a11y/anchor-is-valid */
/**
 * Created by hungvo on 18/04/2017.
 */
import { change } from 'redux-form';
import { inRange, required } from 'common/validators';
import { dateToTimestamp, timestampToDateTimeString } from 'common/utils/Date';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import Store from 'store';
import { t1 } from 'translate';
import get from 'lodash.get';
import {
  courseLearningTypes,
  examSubTypeOptions,
  examSubTypes,
  layouts,
  learnNavMenuTemplate,
  schoolTypes,
} from 'configs/constants';
import {
  checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo,
  hasAcademicCategories,
  hasOrganization,
  hasTemplateOfCourseCode,
} from 'common/conf';
import { hasRemindFinishCourseSettings } from 'common/school';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import apiUrls from 'api-endpoints';
import { ip_ranges, publish_level } from './elements/publish_level';
import { getNodeSelector } from 'components/admin/node/utils';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import InputFile from 'schema-form/elements/input-file';
import DatePicker from 'schema-form/elements/date-picker';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import InputToken from 'schema-form/elements/input-token';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';
import { rootRubricElement } from 'components/admin/rubric/schema/elements';

const getErrorTextRegister = (min, max) => {
  if (!max) {
    return t1('must_be_after_%s', timestampToDateTimeString(min));
  }
  return t1('must_be_after_%s_and_before_%s', [
    timestampToDateTimeString(min),
    timestampToDateTimeString(max),
  ]);
};

const updateCertificateConfigSchema = {
  certificate: {
    type: 'checkbox',
    label: t1('certificate'),
    defaultValue: 0,
    normalize: convertBooleanValueToInt,
  },
  percent_complete: {
    type: 'number',
    floatingLabelText: t1('percent_complete'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
};

/**
 * For non-online courses we definitely require start & end date
 * @param step
 * @param values
 * @returns {boolean}
 */
const shouldStartEndDateBeRequired = (step, values) =>
  [
    'new_exam_shift',
    'edit_exam_shift',
    'new_offline_exam',
    'edit_offline_exam',
  ].includes(step) || values.learning_type != courseLearningTypes.ONLINE;

const startDateValidationData = (step, values) => {
  let minDate;
  const maxDate = values && values.end_date && new Date(values.end_date * 1000);

  if (['edit_exam_shift', 'edit_offline_exam'].includes(step)) {
    // no minDate
  } else {
    minDate = new Date();
  }

  return {
    validate: [
      (value, values) => {
        const isRequired = shouldStartEndDateBeRequired(step, values);
        if (isRequired)
          return required(t1('start_time_cannot_be_empty'))(value);
      },
    ],
    minDate,
    maxDate,
  };
};

const endDateValidationData = (step, values) => {
  const minDate =
    (values && values.start_date && new Date(values.start_date * 1000)) ||
    new Date();
  let maxDate;

  return {
    validate: [
      (value, values) => {
        const isRequired = shouldStartEndDateBeRequired(step, values);
        if (isRequired) return required(t1('end_time_cannot_be_empty'))(value);
      },
    ],
    minDate,
    maxDate,
  };
};

const getNameLabel = (step) => {
  if (['new_exam_shift', 'edit_exam_shift'].includes(step)) {
    return t1('exam_shift_name');
  }
  if (['new_offline_exam', 'edit_offline_exam'].includes(step)) {
    return t1('offline_exam_name');
  }
  return t1('course_name');
};

/**
 * If we already have credit syllabus name, we can choose credit syllabus name as default course name
 * @param values
 * @returns {string}
 */
const getDefaultCourseName = (values) => {
  if (!values.name && values.credit_syllabus) {
    const state = Store.getState();
    const creditSyllabus = getNodeSelector(state)(values.credit_syllabus);
    if (creditSyllabus && creditSyllabus.name) return creditSyllabus.name;
  }

  return '';
};

const getCodeFieldLabelForBatchInsertForm = (values) => {
  if (values.number_to_create == 1) return t1('course_code');

  return t1('prefix_of_course_code');
};

/**
 * For offline course, we don't wanna put Time in the input field.
 * For online courses, especially exam shifts, we need exact time
 * @param step
 * @param themeConfig
 * @returns {string}
 */
const startAndEndDateFormat = (step, themeConfig, values) =>
  [
    'new_exam_shift',
    'edit_exam_shift',
    'new_offline_exam',
    'edit_offline_exam',
  ].includes(step) ||
  (get(themeConfig, 'type') === schoolTypes.ENTERPRISE &&
    values.learning_type === courseLearningTypes.ONLINE)
    ? DateTimePicker
    : DatePicker;

// are we adding a new shift or not
const isExamShift = (step) =>
  step === 'new_exam_shift' || step === 'edit_exam_shift';

const getEPStartDate = (step, props) => {
  if (step === 'new_batch' && props.enrolmentPlanStartDate) {
    return {
      defaultValue: props.enrolmentPlanStartDate,
    };
  }
  return {};
};

const getEPEndDate = (step, props) => {
  if (step === 'new_batch' && props.enrolmentPlanEndDate) {
    return {
      defaultValue: props.enrolmentPlanEndDate,
    };
  }
  return {};
};

const newCourseSchema = (
  formid,
  values,
  step,
  props,
  domainInfo,
  themeConfig,
) => {
  const showCode = !hasTemplateOfCourseCode(domainInfo);
  const codeLabel =
    step === 'new_batch'
      ? getCodeFieldLabelForBatchInsertForm(values)
      : t1('course_code');

  const venueIids = get(values, 'campus_iids') || [];

  return {
    name: {
      type: 'text',
      floatingLabelText: getNameLabel(step),
      floatingLabelFixed: false,
      defaultValue: getDefaultCourseName(values),
      errorText: '',
      fullWidth: true,
      validate: [required(t1('name_cannot_be_empty'))],
    },
    code: {
      type: 'text',
      hintText: codeLabel,
      floatingLabelText: codeLabel,
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
      readOnly: !showCode,
      classWrapper: showCode ? null : 'display-none',
      // readOnly: (step !== 'new')
    },
    name_mobile: {
      type: 'text',
      hintText: t1('course_name_on_mobile'),
      floatingLabelText: t1('course_name_on_mobile'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    // guest_can_learn_item: {
    //   type: 'switch',
    //   label: {
    //     on: t1('guest_can_learn_item'),
    //     off: t1('guest_cannot_learn_item'),
    //   },
    //   dataSet: {
    //     on: 1,
    //     off: 0,
    //   },
    //   labelPosition: 'right',
    //   defaultValue: get(props, 'themeConfig.type') === schoolTypes.ENTERPRISE,
    // },
    guest_can_learn_item: {
      type: 'checkbox',
      label: t1('guests_can_access_the_course'),
      defaultValue: get(props, 'themeConfig.type') === schoolTypes.ENTERPRISE,
      normalize: convertBooleanValueToInt,
    },
    private: {
      type: 'checkbox',
      label: t1('private_course_(students_must_be_enrolled_to_learn)'),
      hintText: t1('private'),
      defaultValue: get(props, 'themeConfig.type') === schoolTypes.ENTERPRISE,
      normalize: convertBooleanValueToInt,
    },
    publish_level: publish_level(),
    slogan: {
      type: 'text',
      floatingLabelText: t1('slogan'),
      errorText: '',
      fullWidth: true,
    },
    bg_color: {
      type: 'text',
      hintText: 'ex: #ffffff',
      floatingLabelText: t1('background_color'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    content: {
      type: RTE,
      floatingLabelText: t1('course_detailed_description'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
    content_mobile: {
      type: RTE,
      floatingLabelText: t1('short_content_mobile'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
    overview: {
      type: 'text',
      multiLine: true,
      floatingLabelText: t1('course_overview_description'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
    use_existing_syllabus: {
      type: 'checkbox',
      label: t1('use_existing_syllabus'),
      onChange: (event, toggled) => {
        if (!toggled) {
          Store.dispatch(change(formid, 'syllabus', []));
        }
      },
    },
    syllabus: {
      nameElement: 'syllabus',
      type: InputAutoComplete,
      limit: 1,
      baseUrl:
        '/site/api/get-data-schema?ntype=course&type=syllabus&permission=1',
      floatingLabelText: t1('choose_syllabus'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'primaryText',
        value: 'value',
      },
      validate: values.use_existing_syllabus
        ? [required(t1('syllabus_is_required', 1))]
        : null,
    },
    learning_type: {
      type: 'radio',
      floatingLabelText: t1('learning_type'),
      errorText: t1('loading_learning_type....'),
      floatingLabelFixed: true,
      options: 'async',
      defaultValue: 'online',
      fullWidth: true,
      inline: true,
      wrapperClass: checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(
        domainInfo,
      )
        ? 'display-none'
        : '',
    },
    remind_finish_course_setting: {
      type: 'select',
      floatingLabelText: t1('remind_finish_course_setting'),
      errorText: t1('loading_remind_finish_course_setting....'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: '/school/api/get-remind-finish-course-settings',
        key: 'remind-finish-course-settings',
      },
      fullWidth: true,
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    avatar_disabled: {
      type: InputFile,
      floatingLabelText: t1('avatar_disabled_mobile'),
      defaultValue: '',
      fullWidth: true,
    },
    contest_code: {
      type: 'select',
      floatingLabelText: t1('choose_contest'),
      options: 'async',
      fullWidth: true,
      defaultValue: values.contest_code,
      validate: [required(t1('contest_cannot_be_empty'))],
      readOnly: true,
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
    max_student: {
      type: 'number',
      floatingLabelText: t1('maximum_number_of_students'),
      defaultValue: isExamShift(step) ? 3000 : 30,
      errorText: '',
    },
    start_date: {
      floatingLabelText: `${t1('start_time')}`,
      type: startAndEndDateFormat(step, themeConfig, values), // 'dateTimePicker' 'datePicker',
      fullWidth: true,
      getStartDate: true,
      ...startDateValidationData(step, values),
      ...getEPStartDate(step, props),
    },
    end_date: {
      floatingLabelText: `${t1('end_time')}`,
      type: startAndEndDateFormat(step, themeConfig, values), // 'dateTimePicker' 'datePicker',
      fullWidth: true,
      getEndDate: true,
      ...endDateValidationData(step, values),
      ...getEPEndDate(step, props),
    },
    allowed_late_duration: {
      type: 'number',
      min: 1,
      floatingLabelText: `${t1('allowed_late_duration')} (${t1('minute')}) (*)`,
      validate: [required(t1('allowed_late_duration_cant_be_empty'))],
      defaultValue: 15,
      fullWidth: true,
    },
    start_reg_time: {
      type: DateTimePicker,
      validate: [
        step !== 'edit' &&
          inRange(
            dateToTimestamp(),
            values && values.end_reg_time,
            getErrorTextRegister(
              dateToTimestamp(),
              values && values.end_reg_time,
            ),
          ),
        // required(t1('cannot_be_empty')),
      ].filter(Boolean),
      floatingLabelText: t1('start_register_time'),
      fullWidth: true,
    },
    end_reg_time: {
      type: DateTimePicker,
      validate: [
        inRange(
          values && values.start_reg_time,
          null,
          getErrorTextRegister(values && values.start_reg_time),
        ),
        // required(t1('cannot_be_empty')),
      ],
      floatingLabelText: t1('end_register_time'),
      fullWidth: true,
    },
    withdraw_deadline: {
      type: DateTimePicker,
      validate: [
        inRange(
          (values && values.start_reg_time) || dateToTimestamp(),
          null,
          t1('withdraw_deadline_is_incorrect'),
        ),
      ],
      floatingLabelText: t1('withdraw_deadline'),
      fullWidth: true,
    },
    learn_nav_menu_template: {
      type: 'select',
      fullWidth: true,
      defaultValue: 'default',
      floatingLabelText: t1('learn_nav_menu_template'),
      options: learnNavMenuTemplate(),
    },
    academic_categories: academicCategories(formid, {
      label: t1('categories'),
      hintText: t1('click_to_add_categories'),
      readOnly: step && step.includes('edit'),
      validate: [required(t1('academic_categories_cannot_be_empty'))],
    }),
    semester: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        displayFields: ['school_year', 'semester'],
        notValidate: false,
        wrapperClass: 'cleanPadding',
      }),
    },
    credit_syllabus: {
      nameElement: 'syllabus',
      type: InputAutoComplete,
      limit: 1,
      baseUrl: `/site/api/get-data-schema?ntype=course&type=credit${
        values && typeof values.semester !== 'undefined'
          ? `&semester=${values.semester}`
          : ''
      }${
        get(values, 'exam_sub_type')
          ? `&exam_sub_type=${get(values, 'exam_sub_type')}`
          : ''
      }`,
      floatingLabelText: t1('choose_credit_syllabus'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'primaryText',
        value: 'value',
      },
    },
    exam_sub_type: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('exam_sub_type'),
      defaultValue: examSubTypeOptions()[0]['value'],
      options: examSubTypeOptions(),
      onChange: (event, value) =>
        Store.dispatch(
          change(
            formid,
            'exam_resit_nth',
            value === examSubTypes.FINAL_RESIT ? 1 : null,
          ),
        ),
    },
    exam_resit_nth:
      values.maxNumberOfExamResit > 1
        ? {
            type: 'select',
            fullWidth: true,
            floatingLabelText: t1('resit_time'),
            options: [...Array(values.maxNumberOfExamResit || 1).keys()].map(
              (n) => ({
                value: n + 1,
                primaryText: n + 1,
              }),
            ),
          }
        : {
            type: 'text',
            fullWidth: true,
            floatingLabelText: t1('resit_time'),
            defaultValue: 1,
            readOnly: true,
          },
    allow_adding_students_not_yet_taking_the_previous_exam: {
      type: 'checkbox',
      fullWidth: true,
      label: t1('allow_adding_students_not_yet_taking_the_previous_exam'),
    },
    ip_ranges: ip_ranges(),
    allow_feedback: {
      type: 'checkbox',
      label: t1('gather_feedback_from_students'),
      defaultValue: props && props.allowFeedback,
    },
    allow_comment: {
      type: 'checkbox',
      label: t1('learners_comments_allowed'),
      defaultValue: props && props.allowComment,
    },
    organizations: organizations({
      formid,
      multiple: false,
      label: `${t1('course_organizations')} (*)`,
      validate: [required()],
      defaultValue: props.orgIids,
      rootIids: values.organizationRootIids,
    }),
    number_to_create: {
      type: 'number',
      min: 1,
      floatingLabelText: t1('number_of_courses_to_create'),
      validate: [required(t1('number_of_courses_cannot_be_empty'))],
      defaultValue: 1,
    },
    score_scale: {
      type: 'select',
      hiddenWhenOptionEmpty: true,
      floatingLabelText: t1('score_scale'),
      options: 'async',
      paramsasync: {
        __url__: apiUrls.get_all_score_scale,
      },
      fullWidth: true,
      inline: true,
      validate: [required(t1('score_scale_cannot_be_empty'))],
    },
    rubric_of_course_exam: {
      type: 'select',
      floatingLabelText: t1('rubric_of_course_exam'),
      options: 'async',
      fullWidth: true,
      inline: true,
      paramsasync: {
        key: `${get(values, 'credit_syllabus[0]')}_rubric_of_course_exam`,
        valueKey: 'iid',
        __url__: `/api/v2/skill/get-academic-score-list-by-subject?subject_iid=${get(
          values,
          'credit_syllabus[0]',
        )}`,
      },
      validate: [required(t1('rubric_cannot_be_empty'))],
    },
    campus_iids: {
      type: 'select',
      floatingLabelText: t1('venue'),
      options: 'async',
      format: (value) => (Array.isArray(value) ? value[0] : null),
      normalize: (value) => [value],
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      paramsasync: {
        __url__: '/venue/api/get-venue-by-parent',
        value: {
          type: 'venue',
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((val) => ({
            value: val.iid,
            label: `${val.name} (${val.address})`,
            primaryText: `${val.name} (${val.address})`,
          }));
        },
      },
    },
    room_iids: {
      type: 'select',
      options: 'async',
      floatingLabelText: t1('rooms'),
      format: (value) => (Array.isArray(value) ? value[0] : null),
      normalize: (value) => [value],
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      paramsasync: {
        __url__: `/venue/api/get-venue-by-parent`,
        key: `room_by_${venueIids.join('_')}`,
        value: {
          parent_iids: venueIids,
          type: 'room',
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((val) => ({
            value: val.iid,
            label: val.name,
            primaryText: val.name,
          }));
        },
      },
    },
    rubric_iid: rootRubricElement('course'),
  };
};

const schema = (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
  themeConfig,
) => {
  switch (formid) {
    case 'update_certificate_config':
      return updateCertificateConfigSchema;
    default:
      return newCourseSchema(
        formid,
        values,
        step,
        props,
        domainInfo,
        themeConfig,
      );
  }
};

const getPrivacyGroupFields = (publishLevel, isPrivate) => {
  const privacyGroupFields = ['private'];

  if (!isPrivate) {
    privacyGroupFields.push('guest_can_learn_item');
  }

  privacyGroupFields.push('publish_level');

  if (publishLevel === 'office') {
    privacyGroupFields.push('ip_ranges');
  }

  return privacyGroupFields;
};

const privacyGroup = (publishLevel, isPrivate) => ({
  id: 'privacy',
  title: t1('privacy_settings'),
  fields: getPrivacyGroupFields(publishLevel, isPrivate),
});

const getNewDefaultFields = (
  values,
  fieldFilters = [],
  themeConfig,
  showCode,
  showRemindFinishCourseSetting,
  showOrganization,
  showAcademicCategories,
) => {
  let defaultFields = [
    'name',
    ...(showCode ? ['code'] : []),
    ...(!values.use_existing_syllabus && showAcademicCategories
      ? ['academic_categories']
      : []),
    ...(showOrganization ? ['organizations'] : []),
  ];

  defaultFields.push('use_existing_syllabus');
  defaultFields.push(
    themeConfig && themeConfig.layout === layouts.XPEAK
      ? 'syllabus'
      : 'credit_syllabus',
  );

  defaultFields = defaultFields.filter(
    (field) => !fieldFilters.includes(field),
  );

  defaultFields.push('content');

  let ret;
  if (themeConfig.layout === layouts.XPEAK) {
    ret = [
      {
        id: 'left',
        title: t1('course_information'),
        fields: defaultFields,
      },
      {
        title: t1('mobile'),
        fields: ['name_mobile', 'content_mobile'],
      },
    ];
  } else {
    ret = [
      {
        id: 'left',
        fields: [
          ...defaultFields,
          'learning_type',
          ...(showRemindFinishCourseSetting
            ? ['remind_finish_course_setting']
            : []),
          'allow_feedback',
          'allow_comment',
          'max_student',
          'tags',
          // 'learn_nav_menu_template',
        ],
      },
    ];
  }

  if (themeConfig && themeConfig.type !== schoolTypes.SIS) {
    ret.push(privacyGroup(values.publish_level, values.private));
  }

  ret.push({
    id: 'date_learning',
    title: t1('learning_timeframe'),
    subTitle: t1('learning_timeframe_is_mandatory_for_instructor_led_courses'),
    fields: ['start_date', 'end_date'],
  });

  return ret;
};

const getEditDefaultFields = (
  values,
  themeConfig,
  showCode,
  showRemindFinishCourseSetting,
  showOrganization,
  showAcademicCategories,
) => {
  let result = [];

  if (themeConfig && themeConfig.layout === layouts.XPEAK) {
    result = [
      {
        id: 'left',
        title: t1('course_information'),
        fields: [
          'name',
          'overview',
          'content',
          'bg_color',
          'slogan',
          'tags',
          'prefix_apply',
        ],
      },
      {
        title: t1('mobile'),
        fields: ['name_mobile', 'content_mobile', 'avatar_disabled'],
      },
    ];
  } else {
    result = [
      {
        id: 'left',
        title: t1('course_information'),
        fields: [
          'name',
          'code',
          ...(showAcademicCategories ? ['academic_categories'] : []),
          ...(showOrganization ? ['organizations'] : []),
          'overview',
          'content',
          /* 'prefix_apply', */
          'learning_type',
          ...(showRemindFinishCourseSetting
            ? ['remind_finish_course_setting']
            : []),
          'allow_feedback',
          'allow_comment',
          'max_student',
          'tags',
        ],
      },
    ];
  }

  result.push({
    id: 'date_learning',
    title: t1('date_learning'),
    fields: ['start_date', 'end_date'],
  });

  if (values && values.learning_type === courseLearningTypes.ILT) {
    result.push({
      id: 'ilt',
      title: t1('ilt_course_settings'),
      fields: [
        'max_student',
        'start_reg_time',
        'end_reg_time',
        'withdraw_deadline',
      ],
    });
  }

  if (themeConfig && themeConfig.type !== layouts.SIS) {
    result.push(privacyGroup(values.publish_level, values.private));
  }

  return result;
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
  const showCode = !hasTemplateOfCourseCode(domainInfo);
  const showOrganization =
    themeConfig &&
    themeConfig.type !== schoolTypes.SIS &&
    hasOrganization(domainInfo);
  const showAcademicCategories = hasAcademicCategories(domainInfo);

  const showRemindFinishCourseSetting = hasRemindFinishCourseSettings(
    domainInfo,
  );

  const isLayoutXpeak = themeConfig && themeConfig.layout === layouts.XPEAK;

  switch (step) {
    case 'new':
      return getNewDefaultFields(
        values,
        values.use_existing_syllabus
          ? []
          : [isLayoutXpeak ? 'syllabus' : 'credit_syllabus'],
        themeConfig,
        showCode,
        showRemindFinishCourseSetting,
        showOrganization,
        showAcademicCategories,
      );
    case 'new_batch':
      return [
        {
          id: 'default',
          fields: [
            'learning_type',
            'number_to_create',
            'max_student',
            'code',
            ...(showOrganization ? ['organizations'] : []),
            'name',
            'start_date',
            'end_date',
          ],
        },
      ];
    case 'edit':
      return getEditDefaultFields(
        values,
        themeConfig,
        showCode,
        showRemindFinishCourseSetting,
        showOrganization,
        showAcademicCategories,
      );
    case 'edit_exam_shift':
    case 'new_exam_shift':
      let fields = [
        'name',
        'start_date',
        'end_date',
        'max_student',
        'allowed_late_duration',
        'campus_iids',
      ];
      if (themeConfig && themeConfig.layout === layouts.ETEC) {
        const fields = [
          'name',
          'overview',
          'start_date',
          'end_date',
          'campus_iids',
        ];
      }

      const venueIids = get(values, 'campus_iids');
      if (Array.isArray(venueIids) && venueIids.length) {
        fields.push('room_iids');
      }

      return [
        {
          id: 'default',
          fields,
        },
      ];
    case 'edit_offline_exam':
    case 'new_offline_exam':
      return [
        {
          fields: [
            'name',
            'exam_sub_type',
            values.exam_sub_type === examSubTypes.FINAL_RESIT &&
              'exam_resit_nth',
            values.exam_resit_nth > 1 &&
              'allow_adding_students_not_yet_taking_the_previous_exam',
            'semester',
            'credit_syllabus',
            get(values, 'credit_syllabus.length', 0) > 0 &&
              'rubric_of_course_exam',
            ![examSubTypes.FINAL, examSubTypes.FINAL_RESIT].includes(
              get(values, 'exam_sub_type'),
            ) && 'score_scale',
            'overview',
            'start_date',
            'end_date',
          ].filter(Boolean),
        },
      ];
    case 'edit_certificate':
      return [
        {
          fields: ['certificate', 'percent_complete'],
        },
      ];
    case 'edit_rubric':
      return [
        {
          fields: ['rubric_iid'],
        },
      ];

    case 'new_course_syllabus':
      return getNewDefaultFields(
        values,
        ['use_existing_syllabus', 'syllabus'],
        themeConfig,
      );
    default:
      return [];
  }
};

// const layout = {};

export const schemaNewCourseByCreditSyllabus = {
  schema: {
    number_to_create: {
      type: 'number',
      min: 1,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('number_of_courses_to_create'),
      validate: [required(t1('number_of_courses_cannot_be_empty'))],
      defaultValue: 1,
      fullWidth: true,
    },
    max_student: {
      type: 'number',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('number_of_expected_students_in_each_course'),
      fullWidth: true,
    },
  },
  ui: () => [
    {
      fields: ['number_to_create', 'max_student'],
    },
  ],
  layout: {
    new_credit_syllabus: 'one-field',
  },
};
export default { schema, ui };
