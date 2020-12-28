/* eslint-disable no-use-before-define,camelcase,jsx-a11y/anchor-is-valid,no-unused-vars,no-nested-ternary */
import getLodash from 'lodash.get';
import Toggle from 'schema-form/elements/toggle';
import RTE from 'schema-form/elements/richtext';

import { required } from 'common/validators';
import { t1 } from 'translate';
import { layouts, schoolTypes } from 'configs/constants';
import {
  academic_degree,
  academic_rank,
  ad_username,
  address,
  admission_code,
  admission_documents,
  allowed_to_test,
  average_score_12,
  birthday,
  birthplace,
  check_policy,
  code,
  counter__mark_fee,
  creditSyllabuses,
  department,
  description,
  emails,
  endDate,
  english_score_12,
  ethnicity,
  external,
  facebook_address,
  first_name,
  ga_enabled,
  grade_name,
  grade_of_student,
  graduated,
  guide_video,
  has_enough_records_or_not,
  have_certificate,
  identification_card,
  insert_new,
  intro,
  last_name,
  lintro,
  lname,
  mail,
  name,
  nationality,
  note,
  parent__mail,
  parent__name,
  parent__phone,
  password,
  passwordRetype,
  phone,
  positionText,
  relationship_of_parent,
  roles,
  scan_attach_files,
  scholarship,
  settings__home,
  settings__language,
  settings__session_reminder,
  sex,
  startdate,
  startDate,
  student_types,
  support_note,
  training,
  user_level,
  users,
} from 'components/admin/user/schema/elements';
import { examShiftsSelectBox } from 'components/admin/contest/common/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import {
  district,
  province,
  school__district,
  school__id,
  school__province,
} from 'components/admin/pds/schema/elements';
import { positions } from 'components/admin/job-position/schema/elements';

import rubric_scores from 'components/admin/major/schema/rubric-scores';
import RegisterFormLayoutFreestyle from './RegisterFormLayoutFreestyle';
import { commonFormLayouts } from 'schema-form/constants';
import Attachments from 'schema-form/elements/attachments';

const newStudent = (formid, values, props) => {
  const fields = {
    code: code({
      readOnly: readOnlyField('code', values, hrmsEditableFields(props), true),
    }),
    name: name({
      readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
      validate: [],
      floatingLabelText: t1('fullname'),
    }),
    mail: mail({
      readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
    }),
    lname: lname({
      readOnly: readOnlyField('lname', values, hrmsEditableFields(props), true),
      validate: [required(t1('login_name_cannot_be_empty'))],
      floatingLabelText: `${t1('login_name')} (*)`,
    }),
    phone: phone({
      readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
    }),
    birthday: birthday(
      Object.assign(
        {
          readOnly: readOnlyField(
            'birthday',
            values,
            hrmsEditableFields(props),
            true,
          ),
        },
        props.domainInfo.conf,
      ),
    ),
    startdate: startdate(),
    position: positionText({
      readOnly: readOnlyField(
        'position',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    user_organizations: organizations({
      formid,
      readOnly: readOnlyField(
        'user_organizations',
        values,
        hrmsEditableFields(props),
        true,
      ),
      defaultValue: props.orgIids,
    }),
    academic_categories: academicCategories(formid),
    positions: positions(
      formid,
      {
        readOnly: readOnlyField(
          'positions',
          values,
          hrmsEditableFields(props),
          true,
        ),
        defaultValue: [],
      },
      values.user_organizations,
      {
        notRequiredOrganization: 1,
      },
    ),
    user_level: user_level({
      readOnly: readOnlyField(
        'user_level',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    address: address({
      readOnly: readOnlyField(
        'address',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    description: description({
      readOnly: readOnlyField(
        'description',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    pass: password(`${t1('password')} (*)`, null, {
      validate: [required(t1('password_cannot_be_empty'))],
    }),
    pass_retype: password(`${t1('password_again')}`),
    support_note: support_note(),
  };
  if (isSIS(props)) {
    fields.first_name = first_name({
      readOnly: readOnlyField(
        'first_name',
        values,
        hrmsEditableFields(props),
        true,
      ),
    });
    fields.last_name = last_name({
      readOnly: readOnlyField(
        'last_name',
        values,
        hrmsEditableFields(props),
        true,
      ),
    });
  } else {
    fields.name = name({
      readOnly: readOnlyField(
        'first_name',
        values,
        hrmsEditableFields(props),
        true,
      ),
    });
  }

  return fields;
};

//register account on frontend side
const newAccount = (formid, values, props) => {
  const fields = {
    name: name({
      readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
      hintText: `${t1('display_name')} (*)`,
      floatingLabelText: `${t1('display_name')} (*)`,
    }),
    birthday: birthday(
      Object.assign(
        {
          readOnly: readOnlyField(
            'birthday',
            values,
            hrmsEditableFields(props),
            true,
          ),
        },
        props.domainInfo.conf,
      ),
    ),
    sex: sex({
      fullWidth: true,
      inline: true,
      readOnly: readOnlyField('sex', values, hrmsEditableFields(props), true),
    }),
    mail: mail({
      readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
    }),
    phone: phone({
      readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
    }),
    ethnicity: ethnicity({
      fullWidth: true,
      readOnly: readOnlyField(
        'ethnicity',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    province: province({
      fullWidth: true,
    }),
    district: district(values),
    address: address({
      readOnly: readOnlyField(
        'address',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    lname: lname({
      readOnly: readOnlyField(
        'login_name',
        values,
        hrmsEditableFields(props),
        true,
      ),
      hintText: `${t1('login_name')} (*)`,
      floatingLabelText: `${t1('login_name')} (*)`,
      validate: [required(t1('login_name_cannot_be_empty'))],
    }),
    pass: password(`${t1('password')}`, `${t1('password')} (*)`, {
      validate: [required(t1('password_cannot_be_empty'))],
    }),
    pass_retype: passwordRetype(
      formid,
      `${t1('password_again')} (*)`,
      `${t1('password_again')} (*)`,
      {
        validate: [required(t1('password_again_cannot_be_empty'))],
      },
    ),
    user_organizations: organizations({
      formid,
      readOnly: readOnlyField(
        'user_organizations',
        values,
        hrmsEditableFields(props),
        true,
      ),
      label: `${t1('school/_organization')} (*)`,
      multiple: false,
    }),
    positions: positions(
      formid,
      {
        readOnly: readOnlyField(
          'positions',
          values,
          hrmsEditableFields(props),
          true,
        ),
      },
      values.user_organizations,
      {
        notRequiredOrganization: 1,
      },
    ),
    academic_rank: academic_rank(),
    academic_degree: academic_degree(),
    other_degrees: description({
      readOnly: readOnlyField(
        'other_degrees',
        values,
        hrmsEditableFields(props),
        true,
      ),
    }),
    check_policy: check_policy(),
  };

  return fields;
};

const isSIS = (props) => {
  return 1; //Để lấy danh sách các trường nhập cho Vin cũng giống với cho SIS hơn là Enterprise
  return getLodash(props, 'domainInfo.school.type') === schoolTypes.SIS;
};

const isEvn = (props) =>
  getLodash(props, 'domainInfo.school.theme.layout') === layouts.EVN;

const newStaff = (formid, values, props) => ({
  code: code(
    values && values.external
      ? {
          hintText: t1('enter_teacher_code'),
          floatingLabelText: t1('teacher_code'),
          readOnly: readOnlyField(
            'code',
            values,
            hrmsEditableFields(props),
            true,
          ),
        }
      : {
          readOnly: readOnlyField(
            'code',
            values,
            hrmsEditableFields(props),
            true,
          ),
        },
  ),
  lname: lname({
    readOnly: readOnlyField('lname', values, hrmsEditableFields(props), true),
  }),
  external: external({
    readOnly: readOnlyField(
      'external',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  name: name({
    readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
  }),
  mail: mail({
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  user_organizations: organizations({
    formid,
    readOnly: readOnlyField(
      'user_organizations',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  position: positionText({
    readOnly: readOnlyField(
      'position',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  positions: positions(
    formid,
    {
      readOnly: readOnlyField(
        'positions',
        values,
        hrmsEditableFields(props),
        true,
      ),
    },
    values.user_organizations,
    {
      notRequiredOrganization: 1,
    },
  ),
  startdate: startdate(
    values && values.external
      ? {
          floatingLabelText: t1('partner_join_date'),
          readOnly: readOnlyField(
            'startdate',
            values,
            hrmsEditableFields(props),
            true,
          ),
        }
      : {
          readOnly: readOnlyField(
            'startdate',
            values,
            hrmsEditableFields(props),
            true,
          ),
        },
  ),
  have_certificate: have_certificate(),
  address: address({
    readOnly: readOnlyField('address', values, hrmsEditableFields(props), true),
  }),
  description: description({
    readOnly: readOnlyField(
      'description',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  credit_syllabuses: creditSyllabuses(),
  start_date: startDate({
    readOnly: readOnlyField(
      'start_date',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  end_date: endDate(values),
});

const newParent = (formid, values, props) => ({
  code: code({
    readOnly: readOnlyField('code', values, hrmsEditableFields(props), true),
  }),
  lname: lname({
    readOnly: readOnlyField('lname', values, hrmsEditableFields(props), true),
  }),
  name: name({
    readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
  }),
  mail: mail({
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  pass: password(t1('password')),
  children_of_parent: users({
    formid,
    label: t1('find_children_of_parent'),
    isStudent: 1,
    fullWidth: true,
  }),
  relationship_of_parent: relationship_of_parent(),
  description: description({
    readOnly: readOnlyField(
      'description',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
});

const universityTeacher = (formid, values, props) => ({
  code: code({
    readOnly: readOnlyField('code', values, hrmsEditableFields(props), true),
  }),
  name: name({
    readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
  }),
  mail: mail({
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  // teaching_hours: {
  //   type: 'number',
  //   hintText: t1('required_standard_teaching_hours'),
  //   floatingLabelText: t1('required_standard_teaching_hours'),
  //   defaultValue: 0,
  //   fullWidth: true,
  // },
  // specialize_hours: {
  //   type: 'number',
  //   hintText: t1('non-teaching_hours'),
  //   floatingLabelText: t1('non-teaching_hours'),
  //   defaultValue: 0,
  //   fullWidth: true,
  // },
  // is_full_time_teacher: {
  //   type: 'checkbox',
  //   defaultValue: '',
  //   label: `${t1('is_full_time')}?`,
  // },
  description: description({ readOnly: values.hrms }),
});

const newTeacherByMail = (formid, params) => ({
  emails: emails(),
  pass: password(t1('password')),
  insert_new: insert_new(),
});

const newPassword = (formid, params) => ({
  pass: password(),
});

const changeLdapUsername = (formid, params) => ({
  ad_username: ad_username(),
});

const newRole = (formid, params) => ({
  roles: roles(),
});

const editUser = (formid, values, props) => ({
  name: name({
    readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
  }),
  mail: mail({
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  lname: lname({
    readOnly: readOnlyField('lname', values, hrmsEditableFields(props), true),
  }),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  old_pass: password(t1('current_password')),
  pass: password(t1('new_password')),
  pass_retype: password(t1('password_again')),
  avatar: {
    type: 'hidden',
  },
  oavatar: {
    type: 'hidden',
  },
  ga_enabled: ga_enabled(),
});

const editTeacherInfo = (formid, values, props) => ({
  intro: intro(),
  lintro: lintro(),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  counter__mark_fee: counter__mark_fee(),
  guide_video: guide_video(),
  settings__home: settings__home(),
});

const editProfile = (formid, values, props) => ({
  name: name({
    readOnly:
      readOnlyField('name', values, hrmsEditableFields(props), true) ||
      isSIS(props),
  }),
  code: code({
    readOnly: readOnlyField('code', values, hrmsEditableFields(props), true),
  }),
  position: positionText({
    readOnly: readOnlyField(
      'position',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  address: address({
    readOnly: readOnlyField('address', values, hrmsEditableFields(props), true),
  }),
  phone: phone({
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  birthday: birthday({
    readOnly:
      readOnlyField('birthday', values, hrmsEditableFields(props), true) ||
      isSIS(props),
  }),
  settings__language: settings__language(),
  mail: mail({
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  avatar: {
    type: 'hidden',
  },
  oavatar: {
    type: 'hidden',
  },
  ethnicity: ethnicity({
    fullWidth: true,
    readOnly: readOnlyField(
      'ethnicity',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  birthplace: birthplace({
    fullWidth: true,
    readOnly: readOnlyField(
      'ethnicity',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
});

const editSetting = (formid, params) => ({
  settings__language: settings__language(),
  settings__session_reminder: settings__session_reminder(),
});
const editAcademicRankInfo = () => ({
  academic_rank: academic_rank({ fullWidth: true }),
  academic_degree: academic_degree({ fullWidth: true }),
});
const editAcademicInfo = (formid, values, props) => ({
  code: code({
    fullWidth: true,
    readOnly: readOnlyField('code', values, hrmsEditableFields(props), true),
  }),
  admission_code: admission_code({
    fullWidth: true,
    readOnly: readOnlyField(
      'admission_code',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  name: name({
    fullWidth: true,
    readOnly: readOnlyField('name', values, hrmsEditableFields(props), true),
    validate: [],
  }),
  phone: phone({
    fullWidth: true,
    readOnly: readOnlyField('phone', values, hrmsEditableFields(props), true),
  }),
  mail: mail({
    fullWidth: true,
    readOnly: readOnlyField('mail', values, hrmsEditableFields(props), true),
  }),
  sex: sex({
    fullWidth: true,
    inline: true,
    readOnly: readOnlyField('sex', values, hrmsEditableFields(props), true),
  }),
  address: address({
    fullWidth: true,
    readOnly: readOnlyField('address', values, hrmsEditableFields(props), true),
  }),
  ethnicity: ethnicity({
    fullWidth: true,
    readOnly: readOnlyField(
      'ethnicity',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  nationality: nationality({
    fullWidth: true,
    readOnly: readOnlyField(
      'nationality',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  parent__name: parent__name({
    fullWidth: true,
  }),
  parent__phone: parent__phone({
    fullWidth: true,
  }),
  parent__mail: parent__mail({
    fullWidth: true,
  }),
  department: department({
    fullWidth: true,
    readOnly: readOnlyField(
      'department',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  identification_card: identification_card({
    fullWidth: true,
  }),
  training: training({
    fullWidth: true,
  }),
  school__province: school__province(),
  school__district: school__district(values),
  school__id: school__id(values),
  school__grade: grade_of_student({
    readOnly: readOnlyField(
      'grade_of_student',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  school__grade_name: grade_name(),
  province: province({
    fullWidth: true,
  }),
  district: district(values),
  scholarship: scholarship({
    fullWidth: true,
  }),
  facebook_address: facebook_address({
    fullWidth: true,
  }),
  has_enough_records_or_not: has_enough_records_or_not({
    fullWidth: true,
  }),
  admission_documents,
  english_score_12: english_score_12({
    fullWidth: true,
  }),
  average_score_12: average_score_12({
    fullWidth: true,
  }),
  note: note({
    fullWidth: true,
  }),
  scan_attach_files: scan_attach_files({
    fullWidth: true,
  }),
  birthday: birthday({
    fullWidth: true,
  }),
  scan_avatar: {
    type: 'hidden',
  },
  ico: {
    type: 'select',
    options: 'async',
  },
  campus_iids: {
    type: 'select',
    floatingLabelText: t1('campus'),
    options: 'async',
    multiple: true,
    fullWidth: true,
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
  user_organizations: organizations({
    formid,
    readOnly: readOnlyField(
      'user_organizations',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  academic_categories: academicCategories(formid, {
    readOnly: readOnlyField(
      'academic_categories',
      values,
      hrmsEditableFields(props),
      true,
    ),
  }),
  positions: positions(
    formid,
    {
      readOnly: readOnlyField(
        'positions',
        values,
        hrmsEditableFields(props),
        true,
      ),
    },
    values.user_organizations,
    {
      notRequiredOrganization: 1,
    },
  ),
  lname: lname({
    readOnly: readOnlyField(
      'login_name',
      values,
      hrmsEditableFields(props),
      true,
    ),
    hintText: `${t1('login_name')} (*)`,
    floatingLabelText: `${t1('login_name')} (*)`,
    validate: [required(t1('login_name_cannot_be_empty'))],
  }),
});

const editGraduationFinalize = (formid, values) => ({
  graduated: graduated(),
});

const editAllowedToTest = (formid, values) => ({
  allowed_to_test: allowed_to_test(),
});

const editStudentTypes = {
  student_types: student_types(),
};

const changeExamShiftOfContest = (formid, values) => ({
  contest_code: {
    type: 'select',
    floatingLabelText: `${t1('contests')} (*)`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync:
      values && values.iid
        ? {
            key: `contests-by-${values && values.iid}`,
            value: {
              user_iid: values && values.iid,
            },
            transformData: (data) => {
              if (!Array.isArray(data) || !data.length) {
                return [];
              }

              return data.map((row) => ({
                value: row.code,
                label: row.name,
                primaryText: row.name,
              }));
            },
          }
        : null,
    fullWidth: true,
    validate: required(t1('contest_cant_be_empty')),
  },
  shift_exam: examShiftsSelectBox(values, true),
});

const schema = (formid, values, step, xpath, props) => {
  if (formid && formid.indexOf('update_contest') !== -1) {
    return changeExamShiftOfContest(formid, values);
  }

  switch (formid) {
    case 'new_teacher':
      return newTeacherByMail(formid, values, props);
    case 'new_staff':
      return newStaff(formid, values, props);
    case 'new_parent':
      return newParent(formid, values, props);
    case 'new_employee':
      return newStaff(formid, values, props);
    case 'new_account': //for now support for taphuan on viettel
      return newAccount(formid, values, props);
    case 'new_student':
      return newStudent(formid, values, props);
    case 'edit_user':
      return editUser(formid, values, props);
    case 'edit_user_change_pass':
      return editUser(formid, values, props);
    case 'edit_teacher_info':
      return editTeacherInfo(formid, values, props);
    case 'edit_avatar':
      return editUser(formid, values, props);
    case 'edit_staff':
      return newStaff(formid, values, props);
    case 'edit_parent':
      return newParent(formid, values, props);
    case 'edit_university_teacher':
      return universityTeacher(formid, values, props);
    case 'add_password':
      return newPassword(formid, values, props);
    case 'new_set_pass':
    case 'edit_set_pass':
      return newPassword(formid, values, props);
    case 'edit_change_ad_username':
      return changeLdapUsername(formid, values, props);
    case 'edit_assign_roles':
      return newRole(formid, values, props);
    case 'edit_profile':
      return editProfile(formid, values, props);
    case 'edit_setting':
      return editSetting(formid, values, props);
    case 'edit_academic_rank_info':
      return editAcademicRankInfo(formid, values, props);
    case 'edit_contact':
    case 'edit_academic_info':
    case 'edit_basic_information':
    case 'edit_admission_status':
    case 'edit_high_school_records':
    case 'edit_school_info':
      return editAcademicInfo(formid, values, props);
    case 'edit_graduation_finalize':
      return editGraduationFinalize(formid, values, props);
    case 'edit_allowed_to_test':
      return editAllowedToTest(formid, values, props);
    case 'edit_student_types':
      return editStudentTypes;
    default:
      return newStudent(formid, values, props);
  }
};

const getNewDefaultUIEnterprise = (values, themeConfig) => {
  const pass = getLodash(values, 'pass');

  const basicInfoFields = [
    'lname',
    'name',
    'mail',
    'phone',
    'pass',
    ...(pass ? ['pass_retype'] : []),
    'user_organizations',
  ];
  const otherInfoFields = [
    'birthday',
    'startdate',
    'user_organizations',
    'positions',
    'academic_categories',
  ];
  return [
    {
      id: 'basic_information',
      fields: basicInfoFields,
    },
  ];
};

const getNewDefaultUI = (values, themeConfig) => {
  if (themeConfig && themeConfig.type === 'enterprise') {
    return getNewDefaultUIEnterprise(values, themeConfig);
  }

  const pass = getLodash(values, 'pass');

  const basicInfoFields = [
    'code',
    'last_name',
    'first_name',
    'mail',
    'birthday',
    'startdate',
    'user_organizations',
    'positions',
    'pass',
    ...(pass ? ['pass_retype'] : []),
  ];

  return [
    {
      id: 'basic_information',
      fields: basicInfoFields,
    },
  ];
};

//For register on frontend side
const getNewAccountFields = (values, themeConfig) => {
  let fields = [
    'name',
    'birthday',
    'sex',
    'mail',
    'phone',
    'ethnicity',
    'province',
    'district',
    'address',
    'lname',
    'pass',
    'pass_retype',
    'user_organizations',
    'positions',
    'academic_rank',
    'academic_degree',
    'other_degrees',
    'check_policy',
  ];

  return fields;
};

const getEditFields = (themeConfig) => {
  return [
    'code',
    'name',
    'mail',
    'phone',
    'user_level',
    'address',
    'description',
    'positions',
  ];
};

const getProfileFields = (themeConfig) => {
  return [
    'name',
    // 'positions',
    'address',
    'phone',
    'birthday',
    'birthplace',
    'ethnicity',
    'mail',
    'settings__language',
  ];
};

/**
 * Field was config in hrms_editable_fields (/conf/user-account)
 *
 * @param field string
 * @param values array
 * @param filterFields array
 * @param keepField boolean
 * @returns boolean
 */
const readOnlyField = (field, values, filterFields, keepField) => {
  if (!Array.isArray(filterFields) || !filterFields) {
    return false;
  }

  if (values.hrms) {
    return keepField
      ? !filterFields.includes(field)
      : filterFields.includes(field);
  }

  return false;
};

const hrmsEditableFields = (props) =>
  getLodash(props.domainInfo, 'conf.hrms_editable_fields', []);

const ui = (step, values, themeConfig, xpath, formid, props) => {
  if (step === 'edit_setting') {
    return [
      // mode_step
      {
        fields:
          values && values.school_type === 'sis'
            ? ['settings__language', 'settings__session_reminder']
            : ['settings__language'],
      },
    ];
  } else if (step === 'edit_student_types') {
    return [
      {
        id: 'student_types',
        fields: ['student_types'],
      },
    ];
  }

  const highSchoolRecordsGroup = {
    id: 'high_school_records',
    title: t1('high_school_records'),
    subTitle: t1('information_about_student_records_in_high_school'),
    isBlock: 1,
    fields: [
      'school__province',
      getLodash(values, 'school__province') && 'school__district',
      getLodash(values, 'school__district') && 'school__id',
    ].filter(Boolean),
  };

  const schoolInfoGroup = {
    id: 'school_info',
    title: t1('school_info'),
    subTitle: t1('school_information_of_student'),
    isBlock: 1,
    fields: ['school__grade', 'school__grade_name'].filter(Boolean),
  };

  const admissionStatusGroup = {
    id: 'admission_status',
    title: t1('admission_status'),
    isBlock: 1,
    fields: [
      'scholarship',
      'has_enough_records_or_not', // Có đủ hồ sơ hay chưa
      'admission_documents',
    ],
  };

  const basicInformationGroup = {
    id: 'basic-information',
    isBlock: 1,
    title: t1('basic_information'),
    fields: [
      'lname',
      'name',
      'mail',
      'phone',
      'birthday',
      'sex',
      'user_organizations',
    ],
  };

  const contactGroup = {
    id: 'contact',
    title: t1('user_contact_information'),
    isBlock: 1,
    fields: ['address', 'province', 'district'],
  };

  const otherInformationGroup = {
    id: 'other_information',
    title: t1('other_information'),
    isBlock: 1,
    fields: ['user_organizations'],
  };

  const appendExtraUserInformation = (prop, value) => {
    if (isSIS(prop)) {
      return [];
    }
    if (value && value.external) {
      return !isEvn(prop)
        ? ['start_date', 'end_date', 'credit_syllabuses']
        : ['start_date', 'end_date'];
    }
    return !isEvn(prop) ? ['credit_syllabuses'] : [];
  };

  const getConfigs = (params) => {
    const position = params && params.external ? false : 'positions';

    return {
      new: getNewDefaultUI(params, themeConfig),
      new_student: getNewDefaultUI(params, themeConfig),
      new_account: [
        {
          id: 'id',
          fields: getNewAccountFields(params, themeConfig),
        },
      ],
      edit: [
        {
          fields: ['name', 'mail', 'lname'],
        },
      ],
      edit_change_pass: [
        {
          fields: ['old_pass', 'pass', 'pass_retype'],
        },
      ],
      edit_ga_enabled: [
        {
          fields: ['ga_enabled'],
        },
      ],
      edit_avatar: [
        {
          fields: ['avatar', 'oavatar'],
        },
      ],
      edit_teacher_info: [
        {
          fields: [
            'intro',
            'lintro',
            'phone',
            'counter__mark_fee',
            'guide_video',
            'settings__home',
          ],
        },
      ],
      edit_academic_rank_info: [
        {
          id: 'academic_rank',
          title: t1('academic_rank'),
          fields: ['academic_rank', 'academic_degree'],
          isBlock: 1,
        },
      ],
      edit_admission_status: [admissionStatusGroup],
      edit_basic_information: [basicInformationGroup],
      edit_contact: [contactGroup],
      edit_high_school_records: [highSchoolRecordsGroup],
      edit_school_info: [schoolInfoGroup],
      edit_academic_info: [
        basicInformationGroup,
        schoolInfoGroup,
        admissionStatusGroup,
        contactGroup,
        otherInformationGroup,
      ],
      edit_change_support_note: [
        {
          fields: ['support_note'],
        },
      ],
      edit_students: [
        {
          fields: getEditFields(themeConfig),
        },
      ],
      edit_update_contest: [
        {
          fields: ['contest_code', 'shift_exam'],
        },
      ],
      new_staff: [
        // mode_step
        {
          id: 'basic',
          title: t1('basic_information'),
          fields: ['code', 'name', 'mail', 'phone', 'external'],
        },
        {
          id: 'basic2',
          title: t1('other_information'),
          fields: [
            'user_organizations',
            position,
            'startdate',
            'address',
            ...appendExtraUserInformation(props, params), // 'start_date', 'end_date', 'credit_syllabuses'
            'description',
            'have_certificate',
          ].filter(Boolean),
        },
      ],
      edit_staff: [
        // mode_step
        {
          id: 'left',
          title: t1('basic_information'),
          fields: [
            'code',
            'lname',
            'name',
            'mail',
            props && props.roleUser === 'teacher' ? 'external' : false,
          ].filter(Boolean),
        },
        {
          id: 'right',
          title: t1('job_position'),
          fields: [
            'user_organizations',
            position,
            'startdate',
            'have_certificate',
          ].filter(Boolean),
        },
        {
          id: 'row',
          title: t1('other_information'),
          fields: ['phone', 'address', 'description'].filter(Boolean),
        },
      ],
      new_parent: [
        // mode_step
        {
          id: 'basic',
          title: t1('basic_information'),
          fields: ['code', 'lname', 'name', 'mail', 'phone', 'pass'],
        },
        {
          id: 'information_of_children',
          title: t1('information_of_children'),
          fields: [
            'children_of_parent',
            'relationship_of_parent',
            'description',
          ].filter(Boolean),
          isBlock: 1,
        },
      ],
      edit_parent: [
        // mode_step
        {
          id: 'left',
          title: t1('parent_information'),
          fields: ['code', 'lname', 'name', 'mail', 'phone'].filter(Boolean),
          isBlock: 1,
        },
        {
          id: 'right',
          title: t1('information_of_children'),
          fields: ['children_of_parent', 'relationship_of_parent'].filter(
            Boolean,
          ),
          isBlock: 1,
        },
        {
          id: 'row',
          title: t1('description'),
          fields: ['description'].filter(Boolean),
          isBlock: 1,
        },
      ],
      edit_university_teacher: [
        {
          title: t1('staff_info'),
          fields: [
            'code',
            'name',
            'mail',
            'phone',
            // 'teaching_hours',
            // 'specialize_hours',
            // 'is_full_time_teacher',
            'description',
          ],
        },
      ],
      edit_profile: [
        // mode_step
        {
          // title: t1('update_account'),
          fields: getProfileFields(themeConfig),
        },
      ],
      new_teacher: [
        {
          fields: ['emails', 'pass', 'insert_new'],
        },
      ],
      add_password: [
        {
          fields: ['pass'],
        },
      ],
      new_set_pass: [
        {
          // title: t1('set_password'),
          fields: ['pass'],
        },
      ],
      edit_set_pass: [
        {
          // title: t1('set_password'),
          fields: ['pass'],
        },
      ],
      edit_change_ad_username: [
        {
          title: t1('change_ad_username'),
          fields: ['ad_username'],
        },
      ],
      edit_assign_roles: [
        {
          title: t1('roles_or_role_groups'),
          fields: ['roles'],
        },
      ],
      edit_graduation_finalize: [
        {
          title: t1("set_student's_pass/fail_status"),
          subTitle: t1(
            'be_careful,_you_will_not_be_able_to_edit_this_after_set',
          ),
          fields: ['graduated'],
        },
      ],
      edit_allowed_to_test: [
        {
          title: t1('can_student_take_the_final_test?'),
          subTitle: t1(
            "be_careful,_you_will_not_be_able_to_edit_this_student's_scores_after_set_this_status",
          ),
          fields: ['allowed_to_test'],
        },
      ],
    };
  };

  const configs = getConfigs(values);

  return configs[step] || [];
};

const layout = (step, values, themeConfig, xpath, formid, props) => {
  if (step === 'new_account') {
    return { component: RegisterFormLayoutFreestyle, freestyle: 1 };
  }

  return {
    new: '',
    edit_staff: commonFormLayouts.TWO_COLS_AND_ROW,
  };
};

const schemaEditCompletionScore = {
  p_original: {
    type: 'text',
    step: 10,
    /* min: 0,
    max: 100,
    validate: [
      required(t1('value_is_required')),
      inRange(0, 100, t1('value_must_be_between_%s_and_%s', [0, 100])),
    ], */
    floatingLabelText: t1('score'),
    floatingLabelFixed: true,
    fullWidth: true,
  },
  pf: {
    type: Toggle,
    style: { maxWidth: 300 },
    classWrapper: 'col-md-6',
    dataSet: {
      off: 0,
      on: 1,
    },
    twoSide: true,
    label: t1('passed'),
    offLabel: t1('failed'),
    onLabel: t1('passed'),
  },
  credit_transfert: {
    type: Toggle,
    style: { maxWidth: 300 },
    classWrapper: 'col-md-6',
    twoSide: true,
    label: t1('credit_transfert'),
    offLabel: t1('no'),
    onLabel: t1('yes'),
  },
  note: {
    type: RTE,
    floatingLabelText: t1('note'),
    defaultValue: '',
    fullWidth: true,
  },
  attachments: {
    type: Attachments,
    floatingLabelText: t1('attachments'),
    allowDownload: true,
    multiple: true,
    fullWidth: true,
  },
  rubric_scores: {
    type: 'array',
    schema: rubric_scores,
    floatingLabelText: t1('edit_rubric_scores'),
  },
};

const validate = (values) => {
  if (!values.pass_retype)
    return {
      pass_retype: t1('password_retyping_is_required'),
    };
  if (values.pass !== values.pass_retype) {
    return {
      pass_retype: t1('the_password_not_match'),
    };
  }
  return undefined;
};

const finalProcessBeforeSubmit = (fullData = {}) =>
  Object.assign({}, fullData, {
    user_organizations: fullData.user_organizations || [],
    code: fullData.lname,
    name: fullData.name || fullData.lname,
  });

export default { schema, ui, layout, validate, finalProcessBeforeSubmit };
