import { inRange, required } from 'common/validators';
import { change } from 'redux-form';
import {
  categoryRelationTypes,
  constants,
  depositToAccountType,
  feesTemplateTypes,
  feesTypeApplied,
  targetItems,
} from 'configs/constants';
import { t1 } from 'translate';
import Store from 'store';
import apiUrls from 'api-endpoints';
import { convertBooleanValueToInt } from 'common/normalizers';
import { formulasOfFee } from 'components/admin/financial/mainstage/common/elements';
import CommonSelection from 'components/common/elements/common-selection';
import isEqual from 'lodash.isequal';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

import SemesterFee from './semester-fee';
import RepeatingSubjectDiscount from './RepeatingSubjectDiscount';
import TreeSelect from 'schema-form/elements/tree-select';

const isBenefit = (formid) => ['new_benefit', 'edit_benefit'].includes(formid);

function getAvailableCurrencies(formid, values) {
  const state = Store.getState();
  const availableCurrencies = state.domainInfo.conf.available_currencies || [];

  const currencyFilters =
    !isBenefit(formid) ||
    (values && values.benefit_type === 'discount_for_credit_transfert')
      ? availableCurrencies
      : ['%'].concat(availableCurrencies);

  const currencyOptions = isBenefit(formid)
    ? constants.benefitCurrencies
    : constants.feeCurrencies;

  const currencies =
    currencyFilters &&
    currencyFilters.map((item) =>
      currencyOptions.find((currency) => currency.value === item),
    );

  return currencies || [];
}

const handleOnChangeTargetItem = (formid, values, event, value) => {
  let recurringType = false;
  if (
    value === targetItems.ANOTHER_FEE_TARGET_ITEM_DYNAMIC_FEE ||
    value === targetItems.ANOTHER_FEE_TARGET_ITEM_INSURANCE
  ) {
    recurringType = 'once';
  }
  if (!recurringType) {
    return;
  }
  Store.dispatch(change(formid, 'recurring_type', recurringType));
};

const handleOnChangeFeesTypeApplied = (formid, values, event, value) => {
  let templateType = null;
  let recurringType = 'once';
  if (value === feesTypeApplied.OTHER_FEES) {
    if (
      [
        targetItems.ANOTHER_FEE_TARGET_ITEM_DYNAMIC_FEE,
        targetItems.ANOTHER_FEE_TARGET_ITEM_INSURANCE,
      ].includes(values.target_item)
    ) {
      recurringType = 'once';
    } else {
      recurringType = 'recurring';
    }

    templateType = feesTemplateTypes.OTHER_FEES;
  } else if (value === feesTypeApplied.EXAMINATION_FEES) {
    templateType = feesTemplateTypes.EXAMINATION_FEES;
  } else if (value === feesTypeApplied.DEPOSIT_TO_ACCOUNT) {
    templateType = feesTypeApplied.DEPOSIT_TO_ACCOUNT;
  }
  Store.dispatch(change(formid, 'template_type', templateType));
  Store.dispatch(
    change(
      formid,
      'exam_resit_nth',
      value === feesTemplateTypes.EXAMINATION_FEES ? 1 : null,
    ),
  );

  Store.dispatch(change(formid, 'target_payers', null));
  Store.dispatch(change(formid, 'recurring_type', recurringType));
};

const currencyClass = (values) => {
  if (
    values &&
    values.deposit_to_account_type ===
      depositToAccountType.TUITION_FEE_BY_SEMESTER
  ) {
    return 'col-md-12';
  }
  return values.template_type === 'fee_by_credit' ? 'col-md-4' : 'col-md-6';
};

const schema = (formid, values) => {
  const currencies = getAvailableCurrencies(formid, values);
  const isThereOnlyOneTypeOfCurrency = !currencies || currencies.length <= 1;
  const chooseSingleCategory = values && values.classification !== 'fee';

  return {
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      multiLine: true,
      fullWidth: true,
      validate: required(),
    },
    fees_type_applied: {
      type: 'radio',
      fullWidth: true,
      inline: true,
      floatingLabelText: t1('type'),
      floatingLabelFixed: true,
      options: Object.values(feesTypeApplied).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
      validate: required(),
      onChange: (event, value) =>
        handleOnChangeFeesTypeApplied(formid, values, event, value),
    },
    deposit_to_account_type: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('deposit_to_account_type'),
      floatingLabelFixed: true,
      options: Object.values(depositToAccountType).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
      validate: required(),
    },
    template_type: formulasOfFee({
      classWrapper:
        values && values.fees_type_applied === feesTypeApplied.TUITION_FEE
          ? ''
          : 'display-none',
      validate: required(),
      onChange: (event, value) => {
        Store.dispatch(
          change(
            formid,
            'exam_resit_nth',
            value === 'fee_for_resiting_final_exam' ? 1 : null,
          ),
        );
        Store.dispatch(change(formid, 'target_payers', null));
      },
    }),
    target_item: {
      type: 'select',
      options: 'async',
      floatingLabelText: t1('target_item'),
      paramsasync: {
        __url__: '/finance-template/api/get-target-item-options',
        key: `target-items-by-${values && values.template_type}`,
        value: {
          template_type: values && values.template_type,
        },
      },
      fullWidth: true,
      onChange: (event, value) =>
        handleOnChangeTargetItem(formid, values, event, value),
    },
    benefit_type: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('use_for'),
      floatingLabelFixed: true,
      options: constants.benefitTypes(),
      defaultValue: constants.benefitTypes()[0].value,
      validate: required(),
    },
    amount: {
      type: 'number',
      hintText: t1('enter_amount'),
      floatingLabelText: t1('amount'),
      defaultValue: 0,
      styleWrapper: { paddingLeft: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-6',
      min: 0,
      validate: [required(), inRange(0)],
    },
    amount_for_practice_credit: {
      type: 'number',
      hintText: t1('enter_amount'),
      floatingLabelText: t1('amount_for_practice_credit'),
      defaultValue: 0,
      styleWrapper: { paddingLeft: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-4',
      min: 0,
      validate: [required(), inRange(0)],
    },
    amount_for_theory_credit: {
      type: 'number',
      hintText: t1('enter_amount'),
      floatingLabelText: t1('amount_for_theory_credit'),
      defaultValue: 0,
      styleWrapper: { paddingLeft: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-4',
      min: 0,
      validate: [required(), inRange(0)],
    },
    currency: {
      type: 'select',
      name: 'currency',
      fullWidth: true,
      populateValue: true,
      readOnly: isThereOnlyOneTypeOfCurrency,
      styleWrapper: { paddingRight: 0, zIndex: 10000 },
      classWrapper: currencyClass(values),
      floatingLabelText: t1('currency'),
      floatingLabelFixed: true,
      options: currencies,
      defaultValue: currencies && currencies[0] && currencies[0].value,
      validate: required(),
    },
    recurring_type: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('recurring_type'),
      classWrapper:
        values && values.template_type === feesTemplateTypes.OTHER_FEES
          ? ''
          : 'display-none',
      floatingLabelFixed: true,
      options: constants.feeRecurringTypes(),
      defaultValue: constants.feeRecurringTypes()[0].value,
    },
    recurring_period: {
      type: 'number',
      hintText: t1('enter_recurring_period'),
      floatingLabelText: t1('recurring_period'),
      defaultValue: 0,
      styleWrapper: { paddingLeft: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-6',
      validate: required(),
    },
    recurring_unit: {
      type: 'select',
      name: 'recurring_unit',
      styleWrapper: { paddingRight: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-6',
      floatingLabelText: t1('recurring_unit'),
      floatingLabelFixed: true,
      options: constants.feeRecurringUnits(),
    },
    category: {
      type: TreeSelect,
      nameElement: 'category',
      componentElementEditor: CommonSelection,
      optionsProperties: {
        style: {
          maxHeight: '135px',
          overflowY: 'auto',
        },
      },
      fullWidth: true,
      floatingLabelText: t1('categories'),
      hintText: t1('category'),
      onChange: (e, val) => {
        if (val !== null && !isEqual(val, values && values.category)) {
          Store.dispatch(change(formid, 'applicable_benefits', null));
        }
      },
      treeProps: {
        multiSelectable: chooseSingleCategory,
        checkParentEqualCheckAllChildren: false,
      },
      params: {
        view: 'tree',
        depth: -1,
        // sub_type: isBenefitForm ? null : 0,
      },
      baseUrl: apiUrls.fee_category_search,
      noFetchDataResultText: t1(
        'you_cannot_assign_category_to_this_finance_template_because_there_are_no_category_to_select.',
      ),
      keyState: `${formid}_category_iids`,
      mapResultToTreeData: {
        key: 'iid',
        title: (item) =>
          `${item.name} ${
            item.is_mandatory === 1 ? `(${t1('mandatory')})` : ''
          } ${item.sub_type === 1 ? `(${t1('deposit_account_only')})` : ''}`,
        value: 'iid',
      },
      mapTreeDataToText: (item) =>
        `${item.name} ${
          item.is_mandatory === 1 ? `(${t1('mandatory')})` : ''
        } ${item.sub_type === 1 ? `(${t1('deposit_account_only')})` : ''}`,
    },
    target_payers: {
      nameElement: 'target_payers',
      type: InputAutoComplete,
      baseUrl: apiUrls.get_finance_template_possible_target_payers,
      params: {
        type: values.template_type,
        values:
          values &&
          values.target_payers &&
          values.target_payers.map(
            (targetPayer) => targetPayer && targetPayer.type,
          ),
      },
      floatingLabelText: t1('target_payers'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: 'name',
      },
    },
    applicable_benefits: {
      nameElement: 'applicable_benefits',
      type: InputAutoComplete,
      baseUrl: apiUrls.get_benefits,
      params: {
        applicable_categories: values.category,
        items_per_page: -1,
      },
      floatingLabelText: t1('benefits'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'value',
        transformData: (res) =>
          res.map((data) => ({
            name: data.name,
            value: data,
          })),
      },
    },
    number_of_applicable_benefits: {
      type: 'number',
      hintText: t1('enter_number'),
      floatingLabelText: t1(
        'number_of_benefits_which_can_be_used_at_the_same_time',
      ),
      defaultValue: '0',
      fullWidth: true,
      min: 0,
      validate: [required()],
    },
    student_types_for_benefit: {
      nameElement: 'student_types_for_benefit',
      type: InputAutoComplete,
      baseUrl: apiUrls.get_user_group_categories,
      floatingLabelText: t1('user_group_categories'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: 'name',
      },
      params: {
        type: [
          categoryRelationTypes.STUDENT_TYPE,
          categoryRelationTypes.SCHOLARSHIP_CATEGORY,
          categoryRelationTypes.INSURANCE_CATEGORY,
        ],
      },
      limit: 1,
    },
    is_mandatory: {
      type: 'checkbox',
      label: t1('is_mandatory'),
      fullWidth: true,
      defaultValue: 1,
      normalize: convertBooleanValueToInt,
    },
    is_revenue: {
      type: 'checkbox',
      label: t1('is_revenue'),
      fullWidth: true,
      defaultValue: 1,
      normalize: convertBooleanValueToInt,
    },
    exam_resit_nth: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('resit_time'),
      options: [...Array(values.maxNumberOfExamResit || 1).keys()].map((n) => ({
        value: n + 1,
        primaryText: `${t1('exam_resit_nth_%s', [n + 1])}`,
      })),
    },
    repeating_subject_discount_percent: {
      type: 'section',
      schema: RepeatingSubjectDiscount,
    },
    semester_fee: {
      type: 'array',
      schema: SemesterFee,
    },
    // semester: {
    //   nameElement: 'targets',
    //   type: 'inputAutoComplete',
    //   baseUrl: '/semester/search?ntype=semester&status=approved',
    //   params: (values && values.items && values.items.length === 1 && values.items[0].type === 'classgroup') ? values.items[0] : {},
    //   floatingLabelText: t1('choose_semesters'),
    //   fullWidth: true,
    //   dataSourceConfig: {
    //     text: 'key',
    //     value: 'data',
    //     transformData: 'name_display',
    //   },
    // },
    target_discounts: {
      nameElement: 'target_discounts',
      type: InputAutoComplete,
      baseUrl: apiUrls.get_target_discounts,
      floatingLabelText: t1('target_discounts'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: 'name',
      },
    },
  };
};

const isDepositToAccount = (step, values) => {
  if (
    values &&
    values.fees_type_applied === feesTypeApplied.DEPOSIT_TO_ACCOUNT &&
    values.deposit_to_account_type ===
      depositToAccountType.TUITION_FEE_BY_SEMESTER
  ) {
    return true;
  }
  if (
    step !== 'new' &&
    values.deposit_to_account_type ===
      depositToAccountType.TUITION_FEE_BY_SEMESTER
  ) {
    return true;
  }
  return false;
};

const getDefaultUI = (step, values) => {
  let fields = step === 'new' ? ['name', 'fees_type_applied'] : ['name'];

  if (
    values &&
    values.fees_type_applied === feesTypeApplied.DEPOSIT_TO_ACCOUNT
  ) {
    fields = fields.concat(['deposit_to_account_type']);
  }

  if (isDepositToAccount(step, values)) {
    fields = fields.concat(['currency', 'semester_fee']);
  }

  if (step === 'new') {
    fields = fields.concat(['template_type']);
  }

  if (
    [
      feesTemplateTypes.TUITION_FEE_BY_SUBJECT,
      feesTemplateTypes.TUITION_FEE_BY_CREDIT,
      feesTemplateTypes.EXAMINATION_FEES,
      feesTemplateTypes.OTHER_FEES,
    ].includes(values && values.template_type)
  ) {
    fields = fields.concat(['target_item']);
  }

  if (
    !values ||
    (!isDepositToAccount(step, values) &&
      values.deposit_to_account_type !== depositToAccountType.FREEDOM_FEE)
  ) {
    fields = fields.concat(['category']);
  }

  if (
    values &&
    values.template_type === feesTemplateTypes.EXAMINATION_FEES &&
    values.maxNumberOfExamResit > 1
  ) {
    fields = fields.concat(['exam_resit_nth']);
  }
  if (values.template_type === feesTemplateTypes.TUITION_FEE_BY_CREDIT) {
    fields = fields.concat([
      'amount_for_practice_credit',
      'amount_for_theory_credit',
      'currency',
    ]);
  } else if (
    !values ||
    values.deposit_to_account_type !==
      depositToAccountType.TUITION_FEE_BY_SEMESTER
  ) {
    fields = fields.concat(['amount', 'currency']);
  }

  if (
    ![
      feesTemplateTypes.TUITION_FEE_BY_SEMESTER,
      feesTemplateTypes.OTHER_FEES,
    ].includes(values.template_type)
  ) {
    fields = fields.concat(['recurring_type']);
  }

  if (
    fields.includes('recurring_type') &&
    values.recurring_type === 'recurring'
  ) {
    fields = fields.concat(['recurring_period', 'recurring_unit']);
  }

  if (
    values &&
    values.template_type &&
    ![
      feesTemplateTypes.TUITION_FEE_BY_SEMESTER,
      feesTemplateTypes.OTHER_FEES,
    ].includes(values.template_type) &&
    !isDepositToAccount(step, values) &&
    values.fees_type_applied !== feesTypeApplied.DEPOSIT_TO_ACCOUNT
  ) {
    fields = fields.concat(['target_payers']);
  }

  fields = fields.concat(['applicable_benefits']);

  if (
    (!values || !isDepositToAccount(step, values)) &&
    values.deposit_to_account_type !== depositToAccountType.FREEDOM_FEE
  ) {
    fields = fields.concat([
      'number_of_applicable_benefits',
      'is_mandatory',
      'is_revenue',
    ]);
  }

  return fields;
};

const getExtraFieldsForBenefitType = (step, values) => {
  if (values.benefit_type === 'discount_for_student_type') {
    return ['student_types_for_benefit', 'category', 'amount', 'currency'];
  }
  if (values.benefit_type === 'discount_for_repeating_subject') {
    return ['repeating_subject_discount_percent', 'category'];
  }
  if (values.benefit_type === 'discount_for_credit_transfert') {
    return ['target_discounts', 'amount', 'currency'];
  }
  return ['category', 'amount', 'currency'];
};

const getBenefitUI = (step, values) => [
  'name',
  'benefit_type',
  ...getExtraFieldsForBenefitType(step, values),
];

const ui = (step, values) => {
  const configs = {
    new: [
      {
        id: 'default',
        fields: getDefaultUI(step, values),
      },
    ],
    edit: [
      {
        id: 'default',
        fields: getDefaultUI(step, values),
      },
    ],
    new_benefit: [
      {
        id: 'benefit',
        fields: getBenefitUI(step, values),
      },
    ],
    edit_benefit: [
      {
        id: 'benefit',
        fields: getBenefitUI(step, values),
      },
    ],
  };
  return configs[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
