import { t1 } from 'translate';
import {
  groupElement,
  trainingModeElement,
  gradeElement,
} from 'common/utils/form';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    training_mode: trainingModeElement(),
    grade: gradeElement(domainInfo),
    group_iids: groupElement(domainInfo, true),
    program: {
      type: 'select',
      options: 'async',
      label: t1('choose_a_program'),
      paramsasync: {
        __url__: `/k12/training-plan/get-programs-for-grade`,
        value: {
          grade: values.grade,
          training_mode: values.training_mode,
        },
        key: `program-${values.grade}-${values.training_mode}`,
      },
    },
    moduleIids: {
      type: 'select',
      options: 'async',
      label: t1('choose_a_program'),
      multiple: true,
      paramsasync: {
        __url__: `/k12/training-plan/get-program-modules`,
        value: {
          // training_mode: values.training_mode,
          program: values.program,
        },
        key: `moduleIids-${values.program}`,
      },
    },
    compulsory: {
      type: 'checkbox',
      label: t1('compulsory'),
      defaultValue: 1,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: [
        'training_mode',
        'grade',
        'group_iids',
        'program',
        'moduleIids',
        'compulsory',
      ],
    },
  ];
};

export default { schema, ui };
