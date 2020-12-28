import get from 'lodash.get';
import { t1 } from 'translate';
import FeeLayoutFreestyle from './fee-layout-freesstyle';

const schema = (formid, values, step, xpath) => {
  const applicableBenefits = get(values, `${xpath}.applicable_benefits`);
  const targetItem = get(values, `${xpath}.target_item`);
  const id = get(values, `${xpath}.id`);
  return {
    name: {
      type: 'text',
    },
    id: {
      type: 'text',
    },
    applied_benefit_iids: {
      type: 'multiCheckbox',
      floatingLabelText: t1('applied benefits'),
      options:
        Array.isArray(applicableBenefits) &&
        applicableBenefits.map((map) => ({
          value: map.iid,
          label: map.name,
          primaryText: map.name,
        })),
      defaultValue:
        Array.isArray(applicableBenefits) &&
        applicableBenefits.map((map) => map && map.iid),
    },
    credit_transfert: {
      fullWidth: true,
      type: 'multiCheckbox',
      hiddenWhenOptionEmpty: true,
      floatingLabelText: t1('apply_credit_transfert'),
      options: 'async',
      paramsasync: {
        __url__: '/syllabus/api/get-credit-transferts',
        key: `credit_transfert-${id}`,
        valueKey: 'iid',
        value: {
          userIid: values && values.student_iid,
          target_item: targetItem,
        },
      },
    },
  };
};

const ui = () => [
  {
    id: 'default',
    fields: ['id', 'name', 'applied_benefit_iids', 'credit_transfert'],
  },
];

const layout = { component: FeeLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
