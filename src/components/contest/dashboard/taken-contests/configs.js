import { t1 } from 'translate';

export const configTableHeader = () => [
  {
    id: 'th-contest-name',
    cssClass: 'th-contest-name',
    label: t1('contest_name'),
    width: '20%',
  },
  {
    id: 'th-round',
    cssClass: 'th-round',
    label: t1('round_name'),
    width: '20%',
  },
  {
    id: 'th-exam-shift-date',
    cssClass: 'th-exam-shift-date',
    label: t1('exam_shift_date'),
    width: '20%',
  },
  {
    id: 'th-submitted-time',
    cssClass: 'th-submitted-time',
    label: t1('finished_time'),
    width: '15%',
  },
  {
    id: 'th-spent-time',
    cssClass: 'th-spent-time',
    label: t1('spent_time'),
    width: '10%',
  },
  {
    id: 'th-order-taken',
    cssClass: 'th-time-taken',
    label: t1('exam_order'),
    width: '5%',
  },
  {
    id: 'th-score',
    cssClass: 'th-score',
    label: t1('score'),
    width: '5%',
  },
  {
    id: 'th-action',
    cssClass: 'th-action',
    label: t1('preview'),
    width: '5%',
  },
];
