import { t1 } from 'translate/index';
import { convertBooleanValueToInt } from 'common/normalizers/index';

const high_school_diploma = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('high_school_diploma'),
};

const original_admission_notice = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('original_admission_notice'),
};

const copy_of_notarized_birth_certificate = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('copy_of_notarized_birth_certificate'),
};

const high_school_diploma_certificate_temporary = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('high_school_diploma_certificate_temporary'),
};

const a_health_certificate_issued = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('a_health_certificate_issued'),
};

const a_copy_of_the_military_service_registration_certificate = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('a_copy_of_the_military_service_registration_certificate'),
};

const is_prioritized_or_beneficiaries = {
  type: 'checkbox',
  defaultValue: '',
  normalize: convertBooleanValueToInt,
  label: t1('is_prioritized_or_beneficiaries'),
};

const schema = (formid, values, step, xpath) => {
  return {
    high_school_diploma,
    original_admission_notice,
    copy_of_notarized_birth_certificate,
    high_school_diploma_certificate_temporary,
    a_health_certificate_issued,
    a_copy_of_the_military_service_registration_certificate,
    is_prioritized_or_beneficiaries,
  };
};

const ui = (step, values) => {
  return [
    {
      title: t1('admission_documents'),
      fields: [
        'high_school_diploma',
        'original_admission_notice',
        'copy_of_notarized_birth_certificate',
        'high_school_diploma_certificate_temporary',
        'a_health_certificate_issued',
        'a_copy_of_the_military_service_registration_certificate',
        'is_prioritized_or_beneficiaries',
      ],
      id: 'g2',
    },
  ];
};

const x = {
  schema,
  ui,
  // layout,
};

export default x;
