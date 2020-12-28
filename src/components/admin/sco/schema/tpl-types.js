import { t4 } from 'translate';

export const templateTypes = {
  TYPE_STANDARD: 'standard',
  TYPE_SONG: 'song',
  TYPE_NEWS: 'news',
  // TYPE_SPREAD: 'spread',
  TYPE_SCORM: 'scorm',
  TYPE_GROUP_ASSIGNMENT: 'group_assignment',
  TYPE_EXAM: 'exam',
};

export const templateOptions = () => [
  {
    value: templateTypes.TYPE_STANDARD,
    label: t4('standard_sco'), // change text "standard" to "standard_sco" to help translate more make sense
  },
  {
    value: templateTypes.TYPE_SONG,
    label: t4('song'),
  },
  {
    value: templateTypes.TYPE_NEWS,
    label: t4('news'),
  },
  // {
  //   value: templateTypes.TYPE_SPREAD,
  //   label: 'spread',
  // },
  {
    value: templateTypes.TYPE_SCORM,
    label: t4('scorm'),
  },
  {
    value: templateTypes.TYPE_GROUP_ASSIGNMENT,
    label: t4('group_assignment'),
  },
  {
    value: templateTypes.TYPE_EXAM,
    label: t4('exam'),
  },
];
