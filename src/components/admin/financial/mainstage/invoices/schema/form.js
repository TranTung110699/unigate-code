import { constants } from 'configs/constants';
import { t1 } from 'translate';
import { change } from 'redux-form';
import get from 'lodash.get';
import Store from 'store';
import apiUrls from 'api-endpoints';
import { required } from 'common/validators';
import layoutNewDepositFreeStyle from './layout-new-deposit-free-style';
import RTE from 'schema-form/elements/richtext';

function getAvailableCurrencies() {
  const state = Store.getState();
  const availableCurrencies = state.domainInfo.conf.available_currencies || [];
  const currencyOptions = constants.feeCurrencies;
  const currencies =
    availableCurrencies &&
    availableCurrencies.map((item) =>
      currencyOptions.find((currency) => currency.value === item),
    );
  return currencies || [];
}

const handleChangeFormValueByField = (formid, field, value) =>
  Store.dispatch(change(formid, field, value));

const schema = (formid, values) => {
  const currencies = getAvailableCurrencies();
  const isThereOnlyOneTypeOfCurrency = !currencies || currencies.length <= 1;

  const studentIid = get(values, 'student.iid');

  return {
    student: {
      type: 'text',
    },
    user_major_iid: {
      type: 'select',
      options: 'async',
      floatingLabelText: t1('choose_major'),
      fullWidth: true,
      populateValue: true,
      paramsasync: {
        key: `major_for_${studentIid}`,
        __url__: apiUrls.user_major_search,
        value: {
          user_iid: studentIid,
          status: ['studying'],
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }

          return data.map((row) => {
            const name = get(row, 'majorObject.name') || row.major;
            const traingMode = row.training_mode;
            const traingLevel = row.training_level;

            const label = `${name} - (${traingMode}, ${traingLevel})`;

            return {
              value: row.iid,
              label,
              primaryText: label,
            };
          });
        },
      },
    },
    fee_template: {
      // With invoice with type is deposit, fee_to_pay is finance templates has category with code is deposit_to_account
      type: 'select',
      name: 'type',
      fullWidth: true,
      hiddenWhenOptionEmpty: true,
      floatingLabelText: t1('choose_defined_fee'),
      floatingLabelFixed: true,
      options: 'async',
    },
    benefits_semester: {
      type: 'hidden',
      name: 'benefits_semester',
    },
    amount: {
      type: 'number',
      hintText: t1('enter_amount'),
      floatingLabelText: t1('amount'),
      defaultValue: 0,
      styleWrapper: { paddingLeft: 0, zIndex: 10000 },
      fullWidth: true,
      classWrapper: 'col-md-6',
      validate: [required(t1('amount_cannot_be_empty'))],
    },
    currency: {
      type: isThereOnlyOneTypeOfCurrency ? 'text' : 'select',
      name: 'currency',
      fullWidth: true,
      readOnly: isThereOnlyOneTypeOfCurrency,
      styleWrapper: { paddingRight: 0, zIndex: 10000 },
      classWrapper: 'col-md-6',
      floatingLabelText: t1('currency'),
      floatingLabelFixed: true,
      options: currencies,
      defaultValue: currencies && currencies[0] && currencies[0].value,
      validate: [required(t1('currency_cannot_be_empty'))],
    },
    wallet_type_iid: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('wallet_type'),
      floatingLabelFixed: true,
      options: 'async',
      populateValue: true,
      paramsasync: {
        __url__: apiUrls.wallet_type_search,
        value: {
          user_iid: studentIid,
          status: ['studying'],
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }

          return data.map((row) => ({
            value: row.iid,
            label: row.name,
            primaryText: row.name,
          }));
        },
      },
      validate: [required(t1('wallet_type_type_cannot_be_empty'))],
    },
    note: {
      type: RTE,
      floatingLabelText: t1('note'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
  };
};

const getDepositFields = (step, values) => {
  const fields = [
    'student',
    'user_major_iid',
    'fee_template',
    'benefits_semester',
    'wallet_type_iid',
    'amount',
    'currency',
    'note',
  ];

  let fieldsFilter = [];
  if (!values || !values.student) {
    fieldsFilter.push('user_major_iid');
  }

  if (values && values.fee_template) {
    fieldsFilter = fieldsFilter.concat(['amount', 'currency']);
  } else {
    fieldsFilter.push('benefits_semester');
  }

  return fields.filter((field) => !fieldsFilter.includes(field));
};

const ui = (step, values) => [
  {
    id: 'new_deposit',
    fields: getDepositFields(step, values),
  },
];

const layout = (step, values) => ({
  component: layoutNewDepositFreeStyle,
  freestyle: 1,
  optionsProperties: {
    handleChangeFormValueByField,
  },
});

export const schemaRequestToCancel = {
  schema: (formid, values, step) => ({
    note: {
      type: RTE,
      classWrapper: step === 'new_canceled' ? 'display-none' : null,
      floatingLabelText: t1('note'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
  }),
  ui: (step, values) => {
    if (step === 'new_canceled') {
      return [
        {
          id: 'default',
          title: t1('are_you_sure_you_want_to_cancel'),
          fields: ['note'],
        },
      ];
    }

    return [
      {
        id: 'default',
        fields: ['note'],
      },
    ];
  },
};

export default { schema, ui, layout };
