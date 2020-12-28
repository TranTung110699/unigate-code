import get from 'lodash.get';
import { inRange, isNumber, required } from 'common/validators';
import {
  constants,
  schoolTypes,
  syllabusSubTypeOptions,
  syllabusSubTypes,
  truantTypes,
} from 'configs/constants';
import { avatar, shareable } from 'components/common/forms/schema-fields';
import { t1 } from 'translate';
import {
  convertBooleanValueToInt,
  convertFalsyValueToDefault,
  normalizeDate,
  slugifier,
} from 'common/normalizers';
import Store from 'store';
import { change } from 'redux-form';
import apiUrls from 'api-endpoints';
import { equivalentPositions } from 'components/admin/equivalent-job-position/schema/elements';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import {
  checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo,
  contentShareable,
  creditSyllabusHasTags,
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  hasAcademicCategories,
  hasOrganization,
  hasTemplateOfCreditSyllabusCode,
} from 'common/conf';
import { scormUploadUrl } from 'components/admin/scorm/scorm';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

import MaxTruant from './MaxTruant';
import FormSearchCredit from '../find-targets/Layout';
import { generateLevelOptions } from './utils';
import SkillsEditor from '../attach-skills/SkillsEditor';
import { itemDuration } from 'components/common/elements/duration';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';
import DatePicker from 'schema-form/elements/date-picker';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import { rootRubricElement } from 'components/admin/rubric/schema/elements';

function dispatchTotalCreditChange(
  formid,
  currentTotalCredit,
  practiceCredit,
  theoryCredit,
) {
  const theory = theoryCredit ? parseInt(theoryCredit, 10) : 0;
  const practice = practiceCredit ? parseInt(practiceCredit, 10) : 0;
  const newTotal = theory + practice;
  const currentTotal = currentTotalCredit
    ? parseInt(currentTotalCredit, 10)
    : 0;
  if (newTotal !== currentTotal) {
    Store.dispatch(change(formid, 'total_credit', newTotal));
  }
}

export const job_position_codes = () => ({
  type: InputToken,
  hintText: t1('job_position_codes'),
  floatingLabelText: t1('job_position_codes'),
  defaultValue: [],
});

export const tags = () => ({
  type: InputToken,
  floatingLabelText: t1('tags'),
  fullWidth: true,
});

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    name: {
      type: 'text',
      hintText:
        step && ['edit_exam', 'new_exam'].includes(step)
          ? t1('enter_exam_store_name')
          : t1('e.g: Corporate Culture 101'),
      floatingLabelText:
        step && ['edit_exam', 'new_exam'].includes(step)
          ? t1('exam_store_name')
          : t1('syllabus_name'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1('name_cannot_be_empty'))],
    },
    exam_round: {
      type: 'select',
      options: 'async',
      floatingLabelText: t1('choose_exam_round'),
      paramsasync: {
        key: `exam-round-of-${values && values.contest_code}`,
        value: {
          contest_code: values && values.contest_code,
        },
      },
      populateValue: true,
      classWrapper: values.examRound ? 'display-none' : null,
      defaultValue: values.exam_round,
      validate: [required(t1('exam_round_cannot_be_empty'))],
      fullWidth: true,
    },
    english_name: {
      type: 'text',
      hintText: t1('enter_english_name_of_syllabus'),
      floatingLabelText: t1('enter_english_name_of_syllabus'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    sub_type: {
      type: 'radio',
      hintText: t1('syllabus_sub_type'),
      floatingLabelText: t1('syllabus_sub_type'),
      floatingLabelFixed: false,
      options: syllabusSubTypeOptions(),
      fullWidth: true,
      defaultValue: syllabusSubTypes.SYLLABUS_NORMAL,
    },
    scorm_file: {
      type: Attachments,
      uploadUrl: scormUploadUrl(domainInfo),
      label: t1('scorm_file'),
      allowDownload: true,
      limit: 1,
      multiple: false,
      validate: [required(t1('you_must_upload_one_scorm_file'))],
      normalize: (data) => (data && data[0]) || null,
      format: (data) => (data ? [data] : []),
      accept: ['.zip'],
    },
    academic_categories: academicCategories(formid, {
      label: t1('categories'),
      hintText: t1('click_to_add_categories'),
      validate: [required(t1('academic_categories_cannot_be_empty'))],
    }),
    online_only: {
      type: 'checkbox',
      label: t1('all_courses_of_this_credit_syllabus_must_be_online'),
      normalize: convertBooleanValueToInt,
    },
    sequential_learning_type: {
      type: 'select',
      floatingLabelText: t1('sequential_learning_type'),
      floatingLabelFixed: false,
      defaultValue: 'none',
      options: constants.syllabusSequentialLearningTypeOptions(),
      format: (value) => (value === 'none' || !value ? '' : value),
      normalize: convertFalsyValueToDefault('none'),
    },
    content: {
      type: RTE,
      hintText: t1('enter_content'),
      floatingLabelText: t1('content'),
      defaultValue: '',
      errorText: '',
    },
    code: {
      type: 'text',
      hintText:
        step && ['edit_exam', 'new_exam'].includes(step)
          ? t1('enter_exam_store_code')
          : t1('subject_code: MATH1001'),
      floatingLabelText:
        step && ['edit_exam', 'new_exam'].includes(step)
          ? t1('exam_store_code')
          : t1('subject_code'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
      validate: [required(t1('code_cannot_be_empty'))],
    },
    active_status: {
      type: 'select',
      floatingLabelText: t1('active_status'),
      floatingLabelFixed: false,
      defaultValue: 'activated',
      options: constants.creditStatuses(),
      fullWidth: true,
    },
    status: {
      type: 'select',
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
      defaultValue: 'queued',
      options: constants.SkillStatusOptions(),
      fullWidth: true,
    },
    total_credit: {
      type: 'number',
      min: 0,
      floatingLabelText: t1('total_credits'),
      errorText: '',
      readOnly: true,
      fullWidth: true,
    },
    practice_credit: {
      type: 'number',
      hintText: t1('enter_practice_credits'),
      floatingLabelText: t1('practice_credits'),
      defaultValue: '',
      errorText: '',
      onChange: (prefix, value) =>
        dispatchTotalCreditChange(
          formid,
          values.total_credit,
          value,
          values.theory_credit,
        ),
      fullWidth: true,
      validate: [isNumber(t1('practice_credit_must_be_an_integer'))],
    },
    theory_credit: {
      type: 'number',
      hintText: t1('enter_theory_credits'),
      floatingLabelText: t1('theory_credits'),
      defaultValue: '',
      onChange: (prefix, value) =>
        dispatchTotalCreditChange(
          formid,
          values.total_credit,
          values.practice_credit,
          value,
        ),
      errorText: '',
      fullWidth: true,
      validate: [isNumber(t1('theory_credit_must_be_an_integer'))],
    },
    hours: {
      type: 'number',
      min: 0,
      hintText: t1('enter_hours'),
      floatingLabelText: t1('hours'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [isNumber(t1('hours_must_be_an_integer'))],
    },
    valid_from: {
      type: DatePicker,
      normalize: normalizeDate,
      format: (value) => value && new Date(Date.parse(value)),
      formatDate: (value) => normalizeDate(value),
      fullWidth: true,
      floatingLabelText: t1('valid_from'),
      hintText: t1('valid_from'),
      validate: [
        required(t1('valid_from_cannot_be_empty')),
        // dateGreaterThan(new Date().toString(), t1('valid_from_must_be_after_today')),
      ],
    },
    valid_to: {
      type: DatePicker,
      normalize: normalizeDate,
      format: (value) => value && new Date(Date.parse(value)),
      formatDate: (value) => normalizeDate(value),
      fullWidth: true,
      floatingLabelText: t1('valid_to'),
      hintText: t1('valid_to'),
      validate: [
        required(t1('valid_to_cannot_be_empty')),
        // dateGreaterThan(values.valid_from, t1('valid_to_must_be_after_valid_from')),
      ],
    },
    prerequisites: {
      nameElement: 'targets',
      componentElementSearch: FormSearchCredit,
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
      fieldSearch: 'name',
      baseUrl: '/syllabus/my?type=credit',
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
      floatingLabelText: t1('prerequisites'),
      fullWidth: true,
    },
    equivalent_credits: {
      nameElement: 'targets',
      componentElementSearch: FormSearchCredit,
      fieldSearch: 'name',
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
      baseUrl: '/syllabus/my?type=credit',
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
      floatingLabelText: t1('equivalent_credits'),
      fullWidth: true,
    },
    // organization: {
    //   type: 'select',
    //   options: 'async',
    //   floatingLabelText: t1('subject_area'),
    //   floatingLabelFixed: true,
    //   fullWidth: true,
    // },
    max_truant: {
      type: MaxTruant,
      validate: [
        (value) => {
          const min = 0;
          const max =
            value && value.type === truantTypes.PERCENT ? 100 : Infinity;

          const valueErrorText =
            required()(value && value.value) ||
            inRange(min, max)(value && value.value) ||
            undefined;

          const typeUnitErrorText =
            required()(value && value.type) ||
            required()(value && value.unit) ||
            undefined;

          if (valueErrorText || typeUnitErrorText) {
            return {
              value: valueErrorText,
              typeUnit: typeUnitErrorText,
            };
          }

          return undefined;
        },
      ],
    },
    avatar: avatar(),
    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [required()],
    }),
    shareable: shareable(),
    tags: tags(),
    duration: itemDuration({
      defaultValue: '01:00:00',
      formatTime: durationDisplayFormats.TIME_IN_SECOND_FORMAT,
    }),
    level: {
      type: 'select',
      options: generateLevelOptions(creditSyllabusLevels(domainInfo)),
      floatingLabelText: t1('syllabus_level'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    skills_to_attach: {
      type: InputAutoComplete,
      nameElement: 'skills_to_attach',
      componentElementEditor: SkillsEditor,
      baseUrl: apiUrls.skill_search,
      params: {
        level: values.level,
        job_position_codes: values.job_position_codes,
        academic_categories: values.academic_categories,
      },
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        valueKeys: ['name', 'iid', 'id'],
        transformData: true,
      },
      floatingLabelText: t1('find_skills_to_attach'),
      fullWidth: true,
    },
    equivalent_positions: equivalentPositions(formid, {}),
    top_equivalent_positions: evnEquivalentPositions(formid, {}),
    download_materials: {
      type: Attachments,
      label: t1('download_materials'),
      allowDownload: true,
      multiple: true,
    },
    rubric_iid: rootRubricElement('course'),
    update_rubric_for_related_courses: {
      type: 'multiCheckbox',
      options: [
        // {
        //   value: 'future',
        //   label: t1('effective_for_future_courses'),
        // },
        {
          value: 'present',
          label: t1('update_score_for_current_courses'),
        },
        {
          value: 'past',
          label: t1('update_score_for_finished_courses'),
        },
      ],
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
  // console.log({themeConfig});
  const isContentShareable = contentShareable(domainInfo);
  const showOrganization = hasOrganization(domainInfo);
  const showCode = !hasTemplateOfCreditSyllabusCode(domainInfo);
  const showAcademicCategories = hasAcademicCategories(domainInfo);
  const showOnlineOnly = !checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(
    domainInfo,
  );
  const showSkillsToAttach =
    get(values, 'level') && get(values, 'academic_categories', []).length > 0;

  const defaultStep = [
    {
      // title: t1('basic_information'),
      fields: [
        'name',
        ...(values.sub_type === syllabusSubTypes.SYLLABUS_SCORM
          ? ['scorm_file']
          : []),
      ],
    },
    {
      // title: t1('categorize_information'),
      fields: [
        ...(showAcademicCategories ? ['academic_categories'] : []),
        ...(showOrganization ? ['organizations'] : []),
        ...(creditSyllabusLevels(domainInfo) ? ['level'] : []),
        ...(creditSyllabusHasTopEquivalentPositionCode(domainInfo)
          ? ['top_equivalent_positions']
          : []),
      ],
    },
    {
      // title: t1('advanced_information'),
      fields: [
        ...(showCode ? ['code'] : []),
        ...(showSkillsToAttach ? ['skills_to_attach'] : []),
        'content',
        ...(showOnlineOnly ? ['online_only'] : []),
        ...(values.type === 'syllabus_exam' ? [] : ['hours']),
        ...(creditSyllabusHasTags(domainInfo) ? ['tags', 'duration'] : []),
        ...(isContentShareable ? ['shareable'] : []),
      ],
    },
    {
      // title: t1('download_materials'),
      fields: ['download_materials'],
    },

    // {
    //   fields: [],
    //   title: t1('privacy_settings'),
    // },
  ];

  const creditStep = [
    {
      fields: [
        ...(showCode ? ['code'] : []),
        'name',
        'english_name',
        'practice_credit',
        'theory_credit',
        'total_credit',
        'hours',
        // 'prerequisites',
        // 'equivalent_credits',
        'active_status',
        'status',
        'content',
        ...(showOrganization ? ['organizations'] : []),
      ],
    },
  ];
  const getSyllabusExamFields = [
    {
      fields: !values.examRound
        ? ['code', 'name', 'exam_round']
        : ['code', 'name'],
    },
  ];
  const config = {
    new: defaultStep,
    edit: defaultStep,
    new_credit: themeConfig.type === schoolTypes.SIS ? creditStep : defaultStep,
    edit_credit:
      themeConfig.type === schoolTypes.SIS ? creditStep : defaultStep,
    new_exam: getSyllabusExamFields,
    edit_exam: getSyllabusExamFields,
    edit_sequential: [
      {
        fields: ['sequential_learning_type'],
      },
    ],
    edit_max_truant: [
      {
        title: t1('maximum_amount_that_students_can_be_truant'),
        fields: ['max_truant'],
      },
    ],
    edit_rubric: [
      {
        title: t1('edit_syllabus_rubric'),
        fields: ['rubric_iid', 'update_rubric_for_related_courses'],
      },
    ],
  };

  return config[step];
};

const syllabus = {
  schema,
  ui,
};

export default syllabus;
