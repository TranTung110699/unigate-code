import { t1 } from 'translate';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    program: {
      type: 'select',
      options: 'async',
      label: t1('choose_a_program'),
      paramsasync: {
        __url__: `/k12/semester/get-program-for-grade?grade=${
          values.grade
        }&training_mode=${values.training_mode}`,
      },
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['program'],
    },
  ];
};

export default { schema, ui };
