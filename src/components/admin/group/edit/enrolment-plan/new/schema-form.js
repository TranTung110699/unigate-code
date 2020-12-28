import { t1 } from 'translate';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    program: {
      type: 'select',
      options: 'async',
      label: t1('choose_a_program'),
      paramsasync: {
        __url__: `/k12/api/get-program-for-group?group=${values.group}`,
      },
    },
    semester: {
      type: 'select',
      label: t1('current_semester'),
      options: 'async',
      paramsasync: {
        __url__: `/k12/api/get-current-semesters`,
      },
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['program', 'semester'],
    },
  ];
};

export default { schema, ui };
