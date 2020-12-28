import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { constants } from 'configs/constants';
import Elemets from 'components/common/elements';
import DatePicker from 'schema-form/elements/date-picker';
import Toggle from 'schema-form/elements/toggle';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const { schoolYear, semester } = Elemets;

const schema = (formid, values, step, xpath, props) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'school_year',
        'semester',
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
  name: {
    type: 'text',
    hintText: t1('sis_course_name'),
    floatingLabelText: t1('sis_course_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: formid === 'plan_search' ? '' : 'col-md-6',
  },
  credit_syllabus: {
    type: 'text',
    hintText: t1('search_subject_name_or_iid_or_code'),
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    classWrapper: formid === 'plan_search' ? '' : 'col-md-6',
    fullWidth: true,
  },
  program: {
    type: 'select',
    floatingLabelText: t1('program'),
    options: 'async',
    classWrapper: values && values.create ? 'col-md-12' : 'display-none',
    paramsasync: {
      key: `program-by-${values && values.major}-${values &&
        values.training_level}-${values && values.training_mode}`,
      value: {
        major: values && values.major,
        training_level: values && values.training_level,
        training_mode: values && values.training_mode,
      },
    },
    fullWidth: true,
    // validate: formid === 'plan_search' ? [] : [required(t1('program_cannot_be_empty'))],
  },
  school_year: schoolYear({
    formid,
    classWrapper: 'col-md-4',
  }),
  semester: semester({
    classWrapper: 'col-md-8',
    formid,
    values,
    type: 'select',
  }),
  start_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('from_date'),
    container: 'inline',
  },
  end_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('to_date'),
    container: 'inline',
  },
  option_filter: {
    type: Toggle,
    classWrapper: 'col-md-4',
    style: { maxWidth: 300, marginTop: 40 },
    dataSet: {
      off: 'semester',
      on: 'timers',
    },
    twoSide: true,
    offLabel: t1('choose_semesters'),
    onLabel: t1('choose_dates'),
  },
  status: {
    type: 'multiCheckbox',
    options: [
      {
        name: 'finished',
        value: 'finished',
        label: t1('finished'),
        primaryText: t1('finished'),
      },
    ].concat(constants.StatusOptions()),
    defaultValue: ['approved', 'queued'],
    inline: true,
    classWrapper: formid === 'plan_search' ? 'col-md-12' : 'col-md-3 col-xs-6',
    floatingLabelText: t1('course_status'),
    floatingLabelFixed: false,
  },
  timetable_status: {
    type: 'multiCheckbox',
    options: constants.timetableStatusOptions(),
    inline: true,
    classWrapper:
      formid === 'plan_search' ? 'display-none' : 'col-md-3 col-xs-6',
    floatingLabelText: t1('timetable_status'),
    floatingLabelFixed: false,
  },
  transcript_status: {
    type: 'multiCheckbox',
    options: constants.transcriptStatusOptions(),
    inline: true,
    classWrapper: 'col-md-3 col-xs-6',
    floatingLabelText: t1('transcript_status'),
    floatingLabelFixed: false,
  },
  attach_result_files_uploaded: {
    type: 'multiCheckbox',
    options: constants.attachResultFilesStatusOptions(),
    inline: true,
    classWrapper: 'col-md-3 col-xs-6',
    floatingLabelText: t1('result_files_uploaded'),
    floatingLabelFixed: false,
  },
  teacher: {
    type: InputAutoComplete,
    nameElement: 'teacher',
    baseUrl: apiUrls.user_search,
    params: {
      _sand_step: 'staff',
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
    },
    floatingLabelText: t1('find_user'),
    classWrapper: 'col-xs-12',
    fullWidth: true,
  },
});

const getDefaultFields = (formId, hiddenFields) => {
  let fields = [];
  switch (formId) {
    case 'plan_search':
      fields = [
        'major',
        'school_year',
        'semester',
        'name',
        'status',
        'credit_syllabus',
      ];
      break;
    case 'offline_exam_search':
      fields = ['school_year', 'semester', 'name', 'credit_syllabus'];
      break;
    default:
      fields = ['major', 'name', 'credit_syllabus'];
  }

  if (!hiddenFields) {
    return fields;
  }

  const keyFilter = Object.keys(hiddenFields);
  return fields.filter(
    (field) => !Array.isArray(keyFilter) || !keyFilter.includes(field),
  );
};

const getStatusFields = [
  'status',
  'timetable_status',
  'transcript_status',
  'attach_result_files_uploaded',
];

const getUi = ({
  step,
  values,
  themeConfig,
  xpath,
  formid,
  hiddenFields = {},
}) => {
  const defaultGroup = {
    id: 'default',
    fields: getDefaultFields(formid, hiddenFields),
  };

  if (formid === 'plan_search') {
    return [defaultGroup];
  }

  const statusGroup = {
    id: 'status',
    fields: getStatusFields,
  };

  const teacherField = {
    id: 'teacher',
    fields: ['teacher'],
  };

  return [
    defaultGroup,
    !['offline_exam_search', 'plan_search'].includes(formid) && teacherField,
    statusGroup,
  ].filter(Boolean);
};

export default (hiddenFields = {}) => ({
  schema,
  ui: (step, values, themeConfig, xpath, formid) =>
    getUi({ step, values, themeConfig, xpath, formid, hiddenFields }),
});
