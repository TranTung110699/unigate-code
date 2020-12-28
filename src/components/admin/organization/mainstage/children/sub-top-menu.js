import React from 'react';
// import ButtonNew from './ButtonNew';
import { t1 } from 'translate';
import { taphuanSubTypes } from '../../../../../configs/constants';

const childrenTopMenuSchema = ({ sub_type }, baseUrl) => {
  return [
    {
      // button: <ButtonNew node={node} />,
      id: 'organization_new_children',
      type: 'modal',
      href: '?new',
      floatRight: true,
      icon: 'plus',
      label:
        window.isTaphuan && Object.values(taphuanSubTypes).includes(sub_type)
          ? 'Tổ bộ môn'
          : t1('add_new_organization'),
      primary: true,
    },
  ];
};

export default childrenTopMenuSchema;
