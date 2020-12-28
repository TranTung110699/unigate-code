import { t1 } from 'translate';

export const templateTypes = {
  TYPE_DEFAULT: '',
  TYPE_DICTATION: 'dictation',
  TYPE_ROLEPLAY: 'roleplay',
  TYPE_EXAM: 'exam',
  TYPE_APPLIED: 'applied',
};

export const templateOptions = () => [
  {
    value: templateTypes.TYPE_DEFAULT,
    label: t1('normal_exercise'),
  },
  {
    value: templateTypes.TYPE_DICTATION,
    label: t1('dictation_exercise'),
  },
  {
    value: templateTypes.TYPE_ROLEPLAY,
    label: t1('roleplay_exercise'),
  },
  {
    value: templateTypes.TYPE_EXAM,
    label: t1('exam_exercise'),
  },
  {
    value: templateTypes.TYPE_APPLIED,
    label: t1('applied_exercise'),
  },
];
