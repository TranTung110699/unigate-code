import React from 'react';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import NewPassdefButton from 'components/admin/passdef/new/NewPassdefButton';
import NewSkillButton from '../skill/new/NewSkillButton';

const skill = (value, props) => [
  {
    id: 'skills',
    href: getUrl('skill'),
    label: t1('skills'),
  },
  {
    id: 'passdef',
    href: getUrl('passdef'),
    label: t1('skill_passing_definition'),
  },
  props.mode === 'passdef'
    ? {
        component: <NewPassdefButton />,
        href: getUrl('passdef'),
        id: 'new_skill_passing_definition',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      }
    : {
        component: <NewSkillButton />,
        href: getUrl('skills'),
        id: 'new_skill',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
];

export default skill;
