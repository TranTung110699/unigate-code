import Store from 'store';
import { constants } from 'configs/constants';
import get from 'lodash.get';
import { t1 } from 'translate';
import { inRange, required } from 'common/validators';

const getAvailableCurrencies = () => {
  const state = Store.getState();
  const availableCurrencies = state.domainInfo.conf.available_currencies || [];

  const currencyFilters = ['%'].concat(availableCurrencies);
  const currencyOptions = constants.benefitCurrencies;

  const currencies =
    currencyFilters &&
    currencyFilters.map((item) =>
      currencyOptions.find((currency) => currency.value === item),
    );

  return currencies || [];
};

const schema = (formid, values, step, xpath) => {
  const currency = get(values, `${xpath}.currency`);
  const val = get(values, xpath);
  const inRangeValidateAmount = currency === '%' ? inRange(0, 100) : inRange(0);
  const currencies = getAvailableCurrencies();
  return {
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      errorText: '',
      classWrapper: 'col-md-4',
      fullWidth: true,
      // validate: required(),
    },
    amount: {
      type: 'number',
      hintText: t1('enter_amount'),
      floatingLabelText: t1('amount'),
      fullWidth: true,
      classWrapper: 'col-md-4',
      min: 0,
      validate: [
        // required(),
        inRangeValidateAmount,
      ],
    },
    currency: {
      type: 'select',
      fullWidth: true,
      populateValue: true,
      readOnly: currencies.length === 1,
      classWrapper: 'col-md-4',
      floatingLabelText: t1('currency'),
      floatingLabelFixed: true,
      options: currencies,
      validate: val && val.amount ? [required()] : [],
    },
  };
};

const ui = () => [
  {
    id: 'default',
    fields: ['name', 'amount', 'currency'],
  },
];
const layout = {};

export default { schema, ui, layout };
