import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const examRound = (contest) => [
  {
    component: <ButtonNew />,
    href: getUrl('exam-round'),
    id: 'new_exam_round',
    type: 'modal',
    label: t1('new_exam_round'),
    floatRight: true,
    icon: 'plus',
  },
];

export default examRound;
