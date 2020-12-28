import Store from 'store';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import { change } from 'redux-form';
import { feesTemplateTypes, feesTypeApplied, UiLibs } from 'configs/constants';
import { formulasOfFee } from 'components/admin/financial/mainstage/common/elements';
import DatePicker from 'schema-form/elements/date-picker';

const getClassFieldTemplateType = (val) =>
  val === feesTypeApplied.TUITION_FEE ? 'col-sm-12' : 'display-none';

const handleOnChangeFeesTypeApplied = (formid, values, xpath, value) => {
  let templateType = null;
  if (value === feesTypeApplied.OTHER_FEES) {
    templateType = feesTemplateTypes.OTHER_FEES;
  } else if (value === feesTypeApplied.EXAMINATION_FEES) {
    templateType = feesTemplateTypes.EXAMINATION_FEES;
  }
  Store.dispatch(
    change(formid, `${xpath}.fee_template__template_type`, templateType),
  );
};

const schema = (formid, values, step, xpath) => ({
  fees_type_applied: {
    type: 'radio',
    inline: true,
    fullWidth: true,
    classWrapper: 'col-sm-12',
    floatingLabelText: t1('fees_type_applied'),
    floatingLabelFixed: true,
    options: [
      {
        primaryText: t1('all'),
        label: t1('all'),
        value: '',
      },
    ].concat(
      Object.values(feesTypeApplied)
        .filter((map) => map !== feesTypeApplied.DEPOSIT_TO_ACCOUNT)
        .map((val) => ({
          primaryText: t1(val),
          label: t1(val),
          value: val,
        })),
    ),
    onChange: (event, value) =>
      handleOnChangeFeesTypeApplied(formid, values, xpath, value),
  },
  fee_template__template_type: formulasOfFee({
    classWrapper: getClassFieldTemplateType(
      getLodash(values, `${xpath}.fees_type_applied`),
    ),
  }),
  start_date: {
    type: DatePicker,
    getStartDate: true,
    uiLib: UiLibs.ANT,
    classWrapper: 'col-sm-4',
    floatingLabelText: t1('start_date_of_paid '),
    fullWidth: true,
  },
  end_date: {
    type: DatePicker,
    getEndDate: true,
    uiLib: UiLibs.ANT,
    classWrapper: 'col-sm-4',
    floatingLabelText: t1('deadline_to_paid'),
    fullWidth: true,
  },
  deadline: {
    type: DatePicker,
    getEndDate: true,
    uiLib: UiLibs.ANT,
    classWrapper: 'col-sm-4',
    floatingLabelText: t1('new_deadline_to_paid'),
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'fees_type_applied',
      'fee_template__template_type',
      'start_date',
      'end_date',
      'deadline',
    ],
  },
];

export default { schema, ui };
