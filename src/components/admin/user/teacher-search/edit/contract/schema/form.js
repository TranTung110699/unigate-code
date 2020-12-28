import { t1, t3 } from 'translate';
import getLodash from 'lodash.get';
import { dateGreaterThan, required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { constants } from 'configs/constants';
import LayoutFreeStyle from './layout-free-style';
import contractTimeSchema from './contractTimeForm';
import { getDefaultSpecializeToTeachingHoursConversionRateInContractGivenDomainInfo } from 'common/conf';
import DatePicker from 'schema-form/elements/date-picker';
import Attachments from 'schema-form/elements/attachments';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  name: {
    type: 'text',
    hintText: t1('enter_name_of_contract'),
    floatingLabelText: t1('contract_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  code: {
    type: 'text',
    hintText: t1('enter_code_of_contract'),
    floatingLabelText: t1('contract_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1('code_cannot_be_empty'))],
  },
  hourly_rate: {
    type: 'number',
    min: 0,
    hintText: t1('hourly_pay_rate'),
    floatingLabelText: `${t1('hourly_pay_rate')} (${t3(
      'currency_unit_value',
    )})`,
    defaultValue: 0,
    fullWidth: true,
  },
  overtime_hourly_rate: {
    type: 'number',
    hintText: t1('overtime_hourly_rate'),
    floatingLabelText: `${t1('overtime_hourly_rate')} (${t3(
      'currency_unit_value',
    )})`,
    defaultValue: 0,
    fullWidth: true,
  },
  weekend_hourly_rate: {
    type: 'number',
    min: 0,
    hintText: t1('weekend_hourly_rate'),
    floatingLabelText: `${t1('weekend_hourly_rate')} (${t3(
      'currency_unit_value',
    )})`,
    defaultValue: 0,
    fullWidth: true,
  },
  start_date: {
    type: DatePicker,
    floatingLabelText: t1('contract_start_date'),
    fullWidth: true,
  },
  end_date: {
    type: DatePicker,
    floatingLabelText: t1('contract_end_date'),
    fullWidth: true,
    validate: [
      dateGreaterThan(
        values.start_date,
        t1('end_time_must_be_after_start_time'),
      ),
    ],
  },
  time_frame__date_from: {
    type: DatePicker,
    floatingLabelText: t1('date_from'),
    fullWidth: true,
    validate: [required(t1('date_from_cannot_be_empty'))],
  },
  time_frame__date_to: {
    type: DatePicker,
    floatingLabelText: t1('date_to'),
    fullWidth: true,
    validate: [required(t1('date_to_cannot_be_empty'))],
  },
  credit_syllabuses: {
    nameElement: 'credit_syllabuses',
    type: InputAutoComplete,
    baseUrl: '/syllabus/api/get-approved-list?type=credit',
    floatingLabelText: t1('choose_subject_teacher_can_teach'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'name',
      value: 'value',
      transformData: (res) =>
        res.map((syllabus) => {
          const name = `${syllabus.code} - ${syllabus.name}`;
          return {
            name,
            value: { ...syllabus, name },
          };
        }),
    },
    validate: [required(t1('syllabus_cannot_be_empty'))],
  },
  status: {
    type: 'select',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    options: constants.StatusOptions(),
    fullWidth: true,
  },
  type: {
    type: 'radio',
    inline: true,
    floatingLabelText: t1('type'),
    floatingLabelFixed: true,
    options: constants.ContractTypesOptions(),
    defaultValue: 'lecturer',
    fullWidth: true,
  },
  is_full_time_teacher: {
    type: 'checkbox',
    defaultValue: 1,
    label: t1('is_fulltime_staff?'),
    fullWidth: true,
  },
  contract_times: {
    type: 'array',
    defaultValue: [{}],
    floatingLabelText: t1('contract_times'),
    schema: contractTimeSchema,
    validate: [required(t1('contract_times_cannot_be_empty'))],
    fullWidth: true,
  },
  is_teaching_out_of_hours: {
    type: 'checkbox',
    label: t1('is_teaching_out_of_hours?'),
    fullWidth: true,
  },
  conversion_rate: {
    type: 'number',
    floatingLabelText: t1(
      'the_rate_of_conversion_of_professional_hours_to_teaching_time',
    ),
    hintText: t1('example:_2'),
    fullWidth: true,
    defaultValue: 0,
  },
  attachments: {
    type: Attachments,
    floatingLabelText: t1('contract_file'),
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
  specialize_hours_to_complete: {
    type: 'number',
    floatingLabelText: t1('specialize_hours_to_complete'),
    hintText: t1('example:_2000'),
    fullWidth: true,
    defaultValue: 0,
  },
  teaching_hours_to_complete: {
    type: 'number',
    floatingLabelText: t1('teaching_hours_to_complete'),
    hintText: t1('example:_2000'),
    fullWidth: true,
    defaultValue: 0,
  },
  specialize_to_teaching_hours_conversion_rate: {
    type: 'number',
    floatingLabelText: t1(
      'the_rate_of_conversion_from_specialize_hours_to_teaching_hours',
    ),
    hintText: t1('example:_1.5'),
    fullWidth: true,
    defaultValue:
      getDefaultSpecializeToTeachingHoursConversionRateInContractGivenDomainInfo(
        domainInfo,
      ) || 1,
  },
});

const ui = (step, values) => {
  const generalInformationFields = [
    ...(getLodash(values, 'is_simple_contract') ? [] : ['name', 'code']),
    ...(getLodash(values, 'external') ? [] : ['start_date', 'end_date']),
  ];

  const academicInformationFields = [
    ...(values &&
    values.is_simple_contract &&
    values.is_simple_contract === true
      ? []
      : ['type']),
    'is_full_time_teacher',
    !getLodash(values, 'is_full_time_teacher') && 'contract_times',
    'credit_syllabuses',
  ].filter(Boolean);

  const workingHoursFields = getLodash(values, 'is_simple_contract')
    ? []
    : [
        'specialize_hours_to_complete',
        'teaching_hours_to_complete',
        'specialize_to_teaching_hours_conversion_rate',
      ];

  const salaryInformationFields = getLodash(values, 'is_simple_contract')
    ? []
    : [
        'hourly_rate',
        'overtime_hourly_rate',
        'weekend_hourly_rate',
        'conversion_rate',
      ];

  const otherInformationFields = getLodash(values, 'is_simple_contract')
    ? []
    : ['attachments', 'note'];

  return [
    {
      id: 'id',
      fields: generalInformationFields.concat(
        academicInformationFields,
        workingHoursFields,
        salaryInformationFields,
        otherInformationFields,
      ),
    },
  ];
};

const layout = { component: LayoutFreeStyle, freestyle: 1 };

const finalProcessBeforeSubmit = (fullData = {}) => {
  const { contract_times } = fullData;
  if (!contract_times || !Array.isArray(contract_times)) {
    return fullData;
  }

  return {
    ...fullData,
    contract_times: contract_times.filter(
      (time) =>
        time &&
        time.start_time &&
        time.end_time &&
        Array.isArray(time.days_of_week) &&
        time.days_of_week.length,
    ),
  };
};

export default { schema, ui, layout, finalProcessBeforeSubmit };
