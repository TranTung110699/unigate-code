import Store from 'store';
import { change } from 'redux-form';
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import {
  feeStatusFilterOptions,
  feesTemplateTypes,
  feesTypeApplied,
} from 'configs/constants';
import { formulasOfFee } from 'components/admin/financial/mainstage/common/elements';

import { required } from 'common/validators';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import DatePicker from 'schema-form/elements/date-picker';

const defaultStartDate = new Date().getTime() / 1000 - 2592000 * 2; // 20 days before today
const defaultEndDate = new Date().getTime() / 1000 + 2592000; // 10 days before today

const getClassFieldTemplateType = (val) =>
  val === feesTypeApplied.TUITION_FEE ? null : 'display-none';

const handleOnChangeFeesTypeApplied = (formid, values, event, value) => {
  let templateType = null;
  if (value === feesTypeApplied.OTHER_FEES) {
    templateType = feesTemplateTypes.OTHER_FEES;
  } else if (value === feesTypeApplied.EXAMINATION_FEES) {
    templateType = feesTemplateTypes.EXAMINATION_FEES;
  }
  Store.dispatch(change(formid, 'fee_template__template_type', templateType));
};

const getSchema = (formid, values, step, xpath, props) => ({
  start_date: {
    type: DatePicker,
    floatingLabelText: t1('start_date'),
    getStartDate: true,
    fullWidth: true,
    maxDate: values.end_date ? new Date(values.end_date * 1000) : undefined,
    defaultValue: defaultStartDate,
    validate: [required(t1('start_date_cannot_be_empty'))],
  },
  end_date: {
    type: DatePicker,
    floatingLabelText: t1('end_date'),
    getEndDate: true,
    fullWidth: true,
    minDate: values.start_date ? new Date(values.start_date * 1000) : undefined,
    defaultValue: defaultEndDate,
    validate: [required(t1('end_date_cannot_be_empty'))],
  },
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
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
  text: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: `${t1('name')}/ ${t1('email')}`,
    hintText: t1('input_query'),
  },
  financial_status: {
    type: 'radio',
    fullWidth: true,
    floatingLabelText: t1('financial_status'),
    hintText: t1('financial_status'),
    label: t1('financial_status'),
    options: feeStatusFilterOptions(),
    inline: true,
  },
  fee_collecting_phase: {
    type: 'select',
    fullWidth: true,
    hiddenWhenOptionEmpty: true,
    floatingLabelText: t1('fee_collecting_phase'),
    options: 'async',
    errorText: '',
    multiple: true,
    paramsasync: {
      __url__: '/fcp/api/get-fee-collection-phase-options',
      key: `fco-from-${values.start_date}-to-${values.end_date}`,
      value: {
        start_date: values.start_date,
        end_date: values.end_date,
      },
    },
  },
  target_item__iid: {
    type: 'select',
    fullWidth: true,
    options: 'async',
    paramsasync: {
      __url__: '/fee/api/get-target-items-by-fee-template-type',
    },
    multiple: true,
    floatingLabelText: t1('target_item'),
  },
  fees_type_applied: {
    type: 'radio',
    inline: true,
    fullWidth: true,
    floatingLabelText: t1('fees_type_applied'),
    floatingLabelFixed: true,
    options: [
      {
        primaryText: t1('all'),
        label: t1('all'),
        value: '',
      },
    ]
      .concat(
        Object.values(feesTypeApplied).map(
          (val) =>
            val !== feesTypeApplied.DEPOSIT_TO_ACCOUNT && {
              primaryText: t1(val),
              label: t1(val),
              value: val,
            },
        ),
      )
      .filter(Boolean),
    onChange: (event, value) =>
      handleOnChangeFeesTypeApplied(formid, values, event, value),
  },
  fee_template__template_type: formulasOfFee({
    classWrapper: getClassFieldTemplateType(values && values.fees_type_applied),
  }),
});

const ui = ({ hiddenFields }) => {
  const fieldsFilter = (hiddenFields && Object.keys(hiddenFields)) || [];
  const fields = [
    'start_date',
    'end_date',
    'major',
    'text',
    'financial_status',
    'fee_collecting_phase',
    'target_item__iid',
    'fees_type_applied',
    'fee_template__template_type',
  ];

  return [
    {
      id: 'default',
      fields: fields.filter((field) => !fieldsFilter.includes(field)),
    },
  ];
};

const schema = ({ hiddenFields }) => ({
  schema: getSchema,
  ui: () => ui({ hiddenFields }),
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
});
export default schema;
