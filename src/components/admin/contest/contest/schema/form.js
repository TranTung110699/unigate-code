import React from 'react';
import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { normalizeDateTime, slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import { organizations } from 'components/admin/organization/schema/elements';
import receivers from './receivers';
import ExamMethodGuide from './exam-method-guide';
import DatePicker from 'schema-form/elements/date-picker';
import Toggle from 'schema-form/elements/toggle';
import RTE from 'schema-form/elements/richtext';

const defaultStartDate = Math.round(new Date().getTime() / 1000);
const defaultEndDate = defaultStartDate + 60 * 60 * 24 * 7; // 1 weeks

const schema = (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
  themeConfig,
) => {
  return {
    name: {
      type: 'text',
      hintText: t1('enter_contest_name'),
      floatingLabelText: t1('contest_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    year: {
      type: 'select',
      floatingLabelText: t1('choose_year'),
      floatingLabelFixed: true,
      options: 'async',
      validate: [required(t1('year_cannot_be_empty'))],
      fullWidth: true,
    },
    code: {
      type: 'text',
      hintText: t1('enter_contest_code'),
      floatingLabelText: t1('contest_code'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1('code_cannot_be_empty'))],
      normalize: slugifier,
      readOnly: ['edit_contest'].includes(step),
    },
    require_otp: {
      type: Toggle,
      label: {
        on: t1('require_otp'),
        off: t1('no_otp_required'),
      },
      labelPosition: 'right',
    },
    is_public: {
      type: Toggle,
      label: {
        on: t1('public_contest'),
        off: t1('private_contest'),
      },
      labelPosition: 'right',
    },
    start_time: {
      type: DatePicker,
      getStartDate: true,
      defaultValue: defaultStartDate,
      validate: [
        required(t1('start_time_cannot_be_empty')),
        dateLessThan(values.end_time, t1('start_time_must_be_before_end_time')),
      ],
      hintText: t1('start_time'),
      floatingLabelText: t1('enter_contest_start_time'),
      fullWidth: true,
    },
    end_time: {
      type: DatePicker,
      getEndDate: true,
      defaultValue: defaultEndDate,
      validate: [
        required(t1('end_time_cannot_be_empty')),
        dateGreaterThan(
          values.start_time,
          t1('end_time_must_be_after_start_time'),
        ),
      ],
      hintText: t1('end_time'),
      floatingLabelText: t1('enter_contest_end_time'),
      fullWidth: true,
    },
    description: {
      type: RTE,
      selectorId: 'description_rte',
      hintText: t1('contest_description'),
      floatingLabelText: t1('contest_description'),
      defaultValue: '',
      errorText: '',
    },
    // required_one_time_password: {
    //   type: 'switch',
    //   label: {
    //     on: t1('required_one_time_password'),
    //     off: t1('not_required_one_time_password'),
    //   },
    //   dataSet: {
    //     on: true,
    //     off: false,
    //   },
    //   labelPosition: 'right',
    // },
    contestant_applicable_grades: {
      type: 'text',
      hintText: t1('enter_contestant_applicable_grades'),
      floatingLabelText: t1('contestant_applicable_grades'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    contestant_min_birthday: {
      type: DatePicker,
      name: 'contestant_min_birthday',
      hintText: t1('contestant_min_birthday'),
      floatingLabelText: t1('contestant_min_birthday'),
      container: 'inline',
      placeholder: '',
      format: (value) => value && new Date(Date.parse(value)),
      normalize: normalizeDateTime,
      fullWidth: true,
      autoOk: true,
    },
    contestant_max_birthday: {
      type: DatePicker,
      name: 'contestant_max_birthday',
      hintText: t1('contestant_max_birthday'),
      floatingLabelText: t1('contestant_max_birthday'),
      container: 'inline',
      placeholder: '',
      format: (value) => value && new Date(Date.parse(value)),
      normalize: normalizeDateTime,
      fullWidth: true,
      autoOk: true,
    },
    register_end_time: {
      type: DatePicker,
      name: 'register_end_time',
      hintText: t1('register_end_time'),
      floatingLabelText: t1('register_end_time'),
      container: 'inline',
      placeholder: '',
      format: (value) => value && new Date(Date.parse(value)),
      normalize: normalizeDateTime,
      fullWidth: true,
      autoOk: true,
    },
    edit_end_time: {
      type: DatePicker,
      name: 'edit_end_time',
      hintText: t1('edit_end_time'),
      floatingLabelText: t1('edit_end_time'),
      container: 'inline',
      placeholder: '',
      format: (value) => value && new Date(Date.parse(value)),
      normalize: normalizeDateTime,
      fullWidth: true,
      autoOk: true,
    },
    number_of_remarking_teachers: {
      type: 'text',
      hintText: t1('enter_number_of_remarking_teachers'),
      floatingLabelText: t1('number_of_remarking_teachers'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    remark_receivers_info: {
      type: 'array',
      schema: receivers,
      floatingLabelText: t1('remark_receivers_information_example'),
    },
    // number_round: {
    //   type: 'number',
    //   defaultValue: 1,
    //   hintText: t1('number_of_rounds'),
    //   floatingLabelText: t1('number_of_rounds'),
    //   placeholder: '',
    //   validate: [
    //     inRange(
    //       1,
    //       10,
    //       t1('number_of_rounds_cannot_be_negative_or_greater_than_10'),
    //     ),
    //   ],
    // },
    exam_method: {
      type: 'select',
      floatingLabelText: `${t1('exam_mode')} (*)`,
      floatingLabelFixed: true,
      options: 'async',
      defaultValue: values.exam_method,
      validate: [required(t1('exam_mode_cannot_be_empty'))],
      fullWidth: true,
      guide: {
        title: t1('help_on_exam_modes'),
        content: <ExamMethodGuide />,
      },
    },
    organizations: organizations({
      formid,
      multiple: false,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: required(t1('organization_can_not_empty')),
    }),
    accessible_in_sub_organizations: {
      type: 'checkbox',
      label: t1('accessible_in_sub_organizations'),
    },
  };
};

const ui = (step, values) => {
  const newFields = [
    'name',
    'code',
    'organizations',
    'accessible_in_sub_organizations',
    // 'start_time',
    // 'end_time',
    // 'number_round',
  ];

  const securityGroup = {
    id: 'security',
    title: t1('security_settings'),
    fields: [
      'is_public',
      'require_otp' /* , 'register_end_time', 'edit_end_time' */,
    ],
  };

  const configs = {
    new: [
      {
        id: 'default',
        title: t1('general_information'),
        // fields: [...newFields, ...genFields, ...numberRoundFields],
        fields: newFields,
      },
      {
        id: 'timeframe',
        title: t1('contest_timeframe'),
        fields: ['start_time', 'end_time'],
      },
      securityGroup,
    ],
    edit_contest: [
      {
        id: 'default',
        title: t1('general_information'),
        fields: [
          'name',
          'code',
          'description',
          'organizations',
          'accessible_in_sub_organizations',
        ],
      },
      {
        id: 'timeframe',
        title: t1('contest_timeframe'),
        fields: ['start_time', 'end_time'],
      },
      securityGroup,
    ],
  };

  return configs[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
