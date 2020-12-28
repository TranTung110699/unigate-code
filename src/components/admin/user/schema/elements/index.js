import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import {
  dateGreaterThan,
  isEmail,
  isPhoneNumber,
  required,
} from 'common/validators';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import { constants, languages, nationalities } from 'configs/constants';
import lodashGet from 'lodash.get';
import admissionSchema from './admission_documents';
import { isEmailString } from 'common/utils/string';
import DatePicker from 'schema-form/elements/date-picker';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import Toggle from 'schema-form/elements/toggle';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

export const admission_documents = {
  type: 'section',
  schema: admissionSchema,
};

export const code = (props = {}) => ({
  type: 'text',
  hintText: t1('enter_user_code'),
  floatingLabelText: t1('user_code'),
  defaultValue: '',
  errorText: '',
  normalize: slugifier,
  ...props,
  //    validate: [matchRegex(/^[0-9]{4,6}$/, t1('invalid_staff_code'))],
});

export const mail = (props = {}) => ({
  type: 'text',
  floatingLabelText: props.floatingLabelText || `${t1('email')}`,
  validate: [
    // required(t1('email_cannot_be_empty')),
    isEmail(t1('this_is_not_a_valid_email')),
  ],
  defaultValue: '',
  errorText: '',
  ...props,

  // fullWidth: true,
});

export const name = (props = {}) => ({
  type: 'text',
  floatingLabelText: props.floatingLabelText || `${t1('display_name')} (*)`,
  defaultValue: '',
  errorText: '',
  validate: [required(t1('name_cannot_be_empty'))],
  ...props,
  // fullWidth: true,
});

export const first_name = (props = {}) => ({
  type: 'text',
  hintText: t1('first_name'),
  floatingLabelText: `${t1('first_name')} (*)`,
  defaultValue: '',
  errorText: '',
  validate: [required(t1('firse_name_cannot_be_empty'))],
  ...props,
  fullWidth: true,
});

export const last_name = (props = {}) => ({
  type: 'text',
  hintText: t1('last_name'),
  floatingLabelText: `${t1('last_name')} (*)`,
  defaultValue: '',
  errorText: '',
  validate: [required(t1('last_name_cannot_be_empty'))],
  ...props,
  fullWidth: true,
});

export const phone = (props = {}) => ({
  type: 'text',
  floatingLabelText: t1('phone'),
  defaultValue: '',
  errorText: '',
  // fullWidth: true,
  validate: [isPhoneNumber(t1('invalid_phone_number'))],
  ...props,
});

export const positionText = () => ({
  type: 'text',
  floatingLabelText: `${t1('position')} (*)`,
  validate: [required(t1('position_cannot_be_empty'))],
  defaultValue: '',
  errorText: '',
  fullWidth: true,
});

export const address = (props = {}) => ({
  type: 'text',
  hintText: t1('user_address'),
  floatingLabelText: t1('address'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
  ...props,
});

export const user_level = () => ({
  type: 'select',
  floatingLabelText: t1('level'),
  floatingLabelFixed: true,
  options: 'async',
  fullWidth: true,
});

export const grade_of_student = () => ({
  type: 'select',
  floatingLabelText: t1('grade_of_student'),
  floatingLabelFixed: true,
  options: 'async',
  fullWidth: true,
});

export const grade_name = (floatingLabelText) => ({
  type: 'text',
  hintText: t1('grade_name'),
  floatingLabelText: floatingLabelText || t1('grade_name'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
});

export const description = () => ({
  type: RTE,
  floatingLabelText: t1('description'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
});

export const support_note = () => ({
  type: RTE,
  floatingLabelText: t1('support_note'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
});

export const password = (floatingLabelText, hintText, props = {}) => ({
  type: 'password',
  hintText: hintText || t1('password'),
  floatingLabelText: floatingLabelText || t1('password'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
  ...props,
});

export const passwordRetype = (
  formid,
  floatingLabelText,
  hintText,
  props = {},
) => ({
  type: 'password',
  hintText: hintText || t1('password_again'),
  floatingLabelText: floatingLabelText || t1('password_again'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
  ...props,
});

export const ad_username = (floatingLabelText) => ({
  type: 'text',
  hintText: t1('ad_username'),
  floatingLabelText: floatingLabelText || t1('ad_username'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
});

export const ga_enabled = () => ({
  type: 'checkbox',
  label: t1('only_you_can_see_this_syllabus'),
  defaultValue: 1,
  normalize: convertBooleanValueToInt, // parseInt(value),
});

export const insert_new = () => ({
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('insert_new_if_user_not_found'),
});

export const roles = () => ({
  type: 'multiCheckbox',
  floatingLabelText: t1('roles'),
  errorText: t1('loading_roles_list_from_server'),
  options: 'async',
  vertical: true,
  validate: [required(t1('name_cannot_be_empty'))],
  fullWidth: true,
});

export const emails = (props = {}) => ({
  type: 'text',
  hintText: t1('enter_email'),
  floatingLabelText: t1('email'),
  defaultValue: '',
  errorText: '',
  fullWidth: true,
  ...props,
});

export const lname = (props = {}) => ({
  type: 'text',
  hintText: t1('login_name'),
  floatingLabelText: props.floatingLabelText || t1('login_name'),
  normalize: slugifier,
  ...props,
});

export const intro = () => ({
  type: RTE,
  hintText: t1('user_intro'),
  floatingLabelText: t1('user_intro'),
});

export const lintro = () => ({
  type: RTE,
  hintText: t1('staff_detailed_intro'),
  floatingLabelText: t1('staff_detailed_intro'),
});

export const counter__mark_fee = () => ({
  type: 'number',
  min: 0,
  hintText: `${t1('e.g')}: ${t1('500_for_500_tokens/hour')}`,
  floatingLabelText: t1('mark_fee_per_hour'),
  floatingLabelFixed: false,
});

export const guide_video = () => ({
  type: 'youtubeUrl',
  hintText: 'z61WNFk_71A',
  floatingLabelText: t1('guide_video'),
  floatingLabelFixed: false,
});

export const settings__home = () => ({
  type: 'select',
  floatingLabelText: t1('home_page'),
  options: [
    {
      value: 0,
      primaryText: t1('study_corner'),
    },
    {
      value: 1,
      primaryText: t1('teacher_corner'),
    },
  ],
});

export const relationship_of_parent = () => ({
  type: 'select',
  floatingLabelText: t1('relationship_of_parent'),
  options: [
    {
      value: 'father',
      primaryText: t1('father'),
    },
    {
      value: 'mother',
      primaryText: t1('mother'),
    },
  ],
});

export const birthday = (
  {
    floatingLabelText = t1('birthday'),
    readOnly,
    required,
    validate,
    formatDate,
  } = {},
  conf,
) => ({
  type: DatePicker,
  name: 'birthday',
  minDate: lodashGet(conf, 'min_birthday'),
  maxDate: lodashGet(conf, 'max_birthday'),
  defaultValue: lodashGet(conf, 'max_birthday'),
  container: 'inline',
  floatingLabelText,
  fullWidth: true,
  readOnly,
  autoOk: true,
  required,
  validate,
  formatDate, // kinda hacky, maybe we should have a global config for this
});

export const startdate = (props = {}) => ({
  type: DatePicker,
  name: 'startdate',
  container: 'inline',
  floatingLabelText: t1('user_join_date'),
  fullWidth: true,
  getStartDate: true,
  maxDate: new Date(),
  autoOk: true,
  ...props,
});

export const settings__language = () => ({
  type: 'select',
  floatingLabelText: t1('language'),
  floatingLabelFixed: true,
  options: languages,
  fullWidth: true,
  defaultValue: 'en',
});

export const settings__session_reminder = () => ({
  type: Toggle,
  label: t1('session_reminder'),
  labelPosition: 'right',
});

export const academic_rank = (props = {}) => ({
  // học hàm: giáo sư, phó giáo sư
  ...props,
  type: 'text',
  hintText: t1('academic_rank'),
  floatingLabelText: t1('academic_rank'),
});

export const academic_degree = (props = {}) => ({
  // học vị: Tiến sĩ, cử nhân
  ...props,
  type: 'text',
  hintText: t1('academic_degree'),
  floatingLabelText: t1('academic_degree'),
});

export const admission_code = (props = {}) => ({
  type: 'text',
  hintText: t1('admission_code'),
  floatingLabelText: t1('admission_code'),
  readOnly: true,
  ...props,
});

export const sex = (props = {}) => ({
  type: 'radio',
  hintText: `${t1('sex')}`,
  defaultValue: 'male',
  options: constants.sexOptions(),
  errorText: '',
  // validate: required(t1('sex_cant_be_empty')),
  ...props,
});

export const ethnicity = ({
  hintText = t1('ethnicity'),
  floatingLabelText = t1('ethnicity'),
  ...rest
} = {}) => ({
  type: 'text',
  hintText,
  floatingLabelText,
  ...rest,
});

export const birthplace = (props = {}) => ({
  type: 'text',
  hintText: t1('birthplace'),
  floatingLabelText: t1('birthplace'),
  ...props,
});

export const nationality = (props = {}) => ({
  type: 'select',
  options: nationalities(),
  floatingLabelText: t1('nationality'),
  floatingLabelFixed: t1('nationality'),
  defaultValue: 'vietnamese',
  ...props,
});

export const parent__name = (props = {}) => ({
  type: 'text',
  floatingLabelText: `${t1('the_name_of_parent')} (*)`,
  floatingLabelFixed: t1('the_name_of_parent'),
  validate: required(t1('parent_name_cant_be_empty')),
  ...props,
});

export const parent__phone = (props = {}) => ({
  type: 'text',
  floatingLabelText: `${t1('the_phone_of_parent')} (*)`,
  floatingLabelFixed: t1('the_phone_of_parent'),
  validate: required(t1('parent_phone_cant_be_empty')),
  ...props,
});

export const parent__mail = (props = {}) => ({
  type: 'text',
  floatingLabelText: `${t1('the_email_of_parent')} (*)`,
  floatingLabelFixed: t1('the_email_of_parent'),
  validate: [
    required(t1('email_cannot_be_empty')),
    isEmail(t1('this_is_not_a_valid_email')),
  ],
  ...props,
});

export const department = (props = {}) => ({
  type: 'text',
  floatingLabelText: t1('department'),
  floatingLabelFixed: t1('department'),
  ...props,
});

export const identification_card = (props = {}) => ({
  type: 'text',
  floatingLabelText: t1('identification_card'),
  floatingLabelFixed: t1('identification_card'),
  ...props,
});

export const training = (props = {}) => ({
  type: 'text',
  floatingLabelText: t1('training'),
  floatingLabelFixed: t1('training'),
  ...props,
});

export const scholarship = () => ({
  type: 'text',
  floatingLabelText: t1('scholarship'),
  floatingLabelFixed: t1('scholarship'),
});

export const facebook_address = (props = {}) => ({
  ...props,
  type: 'text',
  floatingLabelText: t1('facebook_address'),
  floatingLabelFixed: t1('facebook_address'),
});

export const has_enough_records_or_not = () => ({
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('has_enough_records_or_not'),
});

export const check_policy = (agreePolicyText = null) => ({
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: agreePolicyText
    ? agreePolicyText
    : t1('do_you_agree_with_our_policy?'),
  validate: required(t1('you_have_to_agree_with_policy_first')),
});

export const english_score_12 = () => ({
  type: 'number',
  floatingLabelText: t1('english_score_12'),
  floatingLabelFixed: t1('english_score_12'),
});

export const average_score_12 = () => ({
  type: 'number',
  floatingLabelText: t1('average_score_12'),
  floatingLabelFixed: t1('average_score_12'),
});

export const note = () => ({
  type: RTE,
  floatingLabelText: t1('note'),
  floatingLabelFixed: t1('note'),
});

export const scan_attach_files = () => ({
  label: t1('scan_attach_files'),
  type: Attachments,
  floatingLabelText: t1('scan_attach_files'),
  allowDownload: true,
  multiple: true,
  fullWidth: true,
});

export const student_types = () => ({
  nameElement: 'student_types',
  type: InputAutoComplete,
  baseUrl: '/category/index/search',
  floatingLabelText: t1('student_types'),
  fullWidth: true,
  dataSourceConfig: {
    text: 'key',
    value: 'data',
    transformData: 'name',
  },
  clearOnBlur: false,
  params: {
    _sand_step: 'user_group',
    type: ['student_type'],
  },
});

export const graduated = () => ({
  type: 'radio',
  floatingLabelFixed: true,
  options: [
    {
      value: '1',
      primaryText: t1('pass'),
      label: t1('pass'),
    },
    {
      value: '0',
      primaryText: t1('fail'),
      label: t1('fail'),
    },
  ],
  validate: [required(t1('result_cannot_be_empty'))],
});

export const allowed_to_test = () => ({
  type: 'radio',
  floatingLabelFixed: true,
  options: [
    {
      value: '1',
      primaryText: t1('yes'),
      label: t1('yes'),
    },
    {
      value: '0',
      primaryText: t1('no'),
      label: t1('no'),
    },
  ],
});

export const external = () => ({
  type: Toggle,
  labelPosition: 'right',
  label: {
    on: t1('external'),
    off: t1('internal'),
  },
});

export const creditSyllabuses = () => ({
  nameElement: 'credit_syllabuses',
  type: InputAutoComplete,
  baseUrl: '/syllabus/api/get-approved-list?type=credit',
  floatingLabelText: t1('choose_subject_teacher_can_teach'),
  fullWidth: true,
  dataSourceConfig: {
    text: 'name',
    value: 'syllabus',
    transformData: (res) =>
      res.map((syllabus) => ({
        name: `${syllabus.code} - ${syllabus.name}`,
        syllabus,
      })),
  },
  validate: [required(t1('syllabus_cannot_be_empty'))],
});

export const startDate = () => ({
  type: DatePicker,
  floatingLabelText: t1('contract_start_date'),
  fullWidth: true,
});

export const endDate = (values) => ({
  type: DatePicker,
  floatingLabelText: t1('contract_end_date'),
  fullWidth: true,
  validate: [
    dateGreaterThan(
      values && values.start_date,
      t1('end_time_must_be_after_start_time'),
    ),
  ],
});

export const users = ({
  formid,
  label,
  isRequired,
  limit,
  isStaff,
  isStudent,
  onChange,
  fullWidth,
  valueKey,
  organizations,
}) => ({
  type: InputAutoComplete,
  baseUrl: apiUrls.user_search,
  params: {
    ...(isStaff ? { _sand_step: 'staff' } : {}),
    ...(isStudent ? { _sand_step: 'students' } : {}),
    ...(organizations ? { user_organizations: organizations } : {}),
  },
  dataSourceConfig: {
    text: 'name',
    value: 'iid',
    transformData: (res) => {
      return res.map((user) => {
        if (typeof user.code !== 'undefined') {
          return {
            name: `${lodashGet(user, 'name')} (${lodashGet(user, 'code')} ${
              lodashGet(user, 'code') ? lodashGet(user, 'code') : ''
            })`,
            iid: isStudent
              ? user.iid
              : valueKey
              ? lodashGet(user, valueKey)
              : user,
          };
        } else {
          return {
            name: `${lodashGet(user, 'name')}`,
            iid: isStudent
              ? user.iid
              : valueKey
              ? lodashGet(user, valueKey)
              : user,
          };
        }
      });
    },
  },
  floatingLabelText: label || t1('find_user'),
  fullWidth,
  validate: isRequired ? [required(t1('users_cannot_be_empty'))] : undefined,
  onChange,
  limit,
});

export const emailsAsInputToken = () => ({
  type: InputToken,
  hintText: 'example@ex.com',
  floatingLabelText: t1('or_enter_emails'),
  fullWidth: true,
  multiLine: true,
  validate: [
    (values) => {
      if (!values) {
        return '';
      }
      if (Array.isArray(values) && values.every((str) => isEmailString(str))) {
        return '';
      }
      return t1('some_values_are_not_emails');
    },
  ],
});

export const have_certificate = () => ({
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1(
    'does_user_have_certificate?_(if_yes_user_will_be_included_in_trainers_report)',
  ),
});
