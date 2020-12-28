import { t1 } from 'translate';
import get from 'lodash.get';
import { required } from 'common/validators';
import { constants, invoiceTypes } from 'configs/constants';
import feesSchema from './feesSchema';
import othersBenefit from './othersBenefit';
import LayoutFreestyle from './create-invoice-layout-freestyle';
import apiUrls from 'api-endpoints';
import LayoutFreestyleAutomaticallyPaidList from './automatically-paid-list-layout-freestyle';
import { calculateBenefit } from '../../../utils/index';
import getUser from 'common/auth';
import Attachments from 'schema-form/elements/attachments';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values) => {
  const maximumSelectBenefits =
    values.fee_template && values.fee_template.number_of_applicable_benefits;
  const fee = values && values.fee;

  const amountBenefits =
    fee &&
    fee.applicable_benefits &&
    fee.applicable_benefits.map((benefit) => ({
      iid: benefit.iid,
      amount: calculateBenefit(fee.fee_template, benefit, fee.amount),
    }));

  amountBenefits.sort((o1, o2) => o2.amount - o1.amount);

  const total = (!amountBenefits
  ? 0
  : amountBenefits.length < maximumSelectBenefits)
    ? amountBenefits.length
    : maximumSelectBenefits;
  const defaultValues = [];
  for (let index = 0; index < total; index += 1) {
    defaultValues.push(amountBenefits[index].iid);
  }

  return {
    applicable_benefits: {
      type: 'multiCheckbox',
      fullWidth: true,
      floatingLabelText: t1(
        'maximum_select_benefits = %d',
        maximumSelectBenefits,
      ),
      floatingLabelFixed: true,
      maximum: maximumSelectBenefits,
      options: values.benefitOptions,
      defaultValue: defaultValues,
    },
  };
};

const schemaCreateForUser = (formid, values) => {
  return {
    fees: {
      type: 'array',
      schema: feesSchema,
      hiddenAddButton: true,
      hiddenRemoveButton: true,
      hiddenLabel: true,
      classWrapper: 'col-md-12',
    },
    student_iid: {
      type: 'text',
    },
    others_benefit: {
      type: 'section',
      schema: {
        schema: () => ({
          benefits: {
            type: 'array',
            schema: othersBenefit,
            hiddenAddButton: true,
            hiddenRemoveButton: true,
            defaultValue: [{}],
            hiddenLabel: true,
            classWrapper: 'col-md-12',
          },
          attachments: {
            type: Attachments,
            label: t1('attachments'),
            allowDownload: true,
            limit: 1,
            multiple: false,
            fullWidth: true,
            classWrapper: 'col-md-12',
          },
          note: {
            type: 'text',
            floatingLabelText: t1('note'),
            defaultValue: '',
            multiLine: true,
            fullWidth: true,
            classWrapper: 'col-md-12',
          },
        }),
        ui: () => [
          {
            id: 'default',
            fields: ['benefits', 'attachments', 'note'],
          },
        ],
      },
    },
    type: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('invoice_type'),
      floatingLabelFixed: true,
      options: constants.invoiceTypesOptions(),
      validate: [required(t1('invoice_type_cannot_be_empty'))],
      classWrapper: 'col-md-12',
    },
    wallet_type_iid: {
      type: 'select',
      name: 'type',
      fullWidth: true,
      floatingLabelText: t1('wallet_type'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: apiUrls.wallet_type_search,
        value: {
          user_iid: values && values.student_iid,
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
      validate: [required(t1('wallet_type_cannot_be_empty'))],
      classWrapper: 'col-md-12',
    },
    note: {
      type: RTE,
      floatingLabelText: t1('note'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
      classWrapper: 'col-md-12',
    },
    payer__name: {
      type: 'text',
      hintText: t1('enter_payer_name'),
      floatingLabelText: t1('payer_name'),
      validate: [required(t1('payer_name_cannot_be_empty'))],
      fullWidth: true,
      classWrapper: 'col-md-6',
    },
    payer__phone: {
      type: 'text',
      hintText: t1('enter_payer_phone'),
      floatingLabelText: t1('payer_phone'),
      validate: [required(t1('payer_name_cannot_be_empty'))],
      fullWidth: true,
      classWrapper: 'col-md-6',
    },
    campus: {
      type: 'select',
      floatingLabelText: t1('campus'),
      options: 'async',
      fullWidth: true,
      defaultValue: get(getUser(), 'campus_iids.[0]'),
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
  };
};

const ui = {
  new_applicable_benefits: [
    {
      id: 'benefit',
      fields: ['applicable_benefits'],
    },
  ],
};

const layout = {
  new: '',
};

export const schemaCreateInvoiceByAutomaticallyPaidList = {
  schema: schemaCreateForUser,
  ui: () => {
    return [
      {
        id: 'default',
        fields: ['others_benefit'],
      },
    ];
  },
  layout: {
    component: LayoutFreestyleAutomaticallyPaidList,
    freestyle: 1,
  },
};

export const schemaCreateInvoiceByFee = (user, hiddenFields = {}) => ({
  schema: schemaCreateForUser,
  ui: (step, value) => {
    const fields = [
      'campus',
      'fees',
      'type',
      'student_iid',
      'others_benefit',
      'wallet_type_iid',
      'payer__name',
      'payer__phone',
      'note',
    ];
    const filterFields = Object.keys(hiddenFields) || [];
    if (value && value.type === invoiceTypes.AUTOMATICALLY_PAYMENT_BY_WALLET) {
      filterFields.concat([
        'wallet_type_iid',
        'payer__name',
        'payer__phone',
        'campus',
        'note',
      ]);
    } else if (!value || value.type !== invoiceTypes.PAYMENT_BY_WALLET) {
      filterFields.push('wallet_type_iid');
    }

    return [
      {
        id: 'default',
        fields: fields.filter((field) => !filterFields.includes(field)),
      },
    ];
  },
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
    optionsProperties: {
      user,
      cashier: getUser(),
    },
  },
});

export default { schema, ui, layout };
