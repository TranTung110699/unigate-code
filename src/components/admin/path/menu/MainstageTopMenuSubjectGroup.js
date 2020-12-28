import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonCreate from '../new/subject-group/ButtonNew';

const subjectGroup = () => [
  {
    component: <ButtonCreate />,
    href: getUrl('subjectgroup'),
    id: 'new_subjectgroup',
    label: t1('new_subject_group'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default subjectGroup;
