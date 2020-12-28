import React from 'react';
import { getUrl } from 'routes/links/common';
import { t2 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const blog = () => [
  // {
  //   id: 'list_blog',
  //   href: getUrl('blog'),
  //   label: t2('blog'),
  // },
  {
    component: <ButtonNew />,
    href: getUrl('blog-category'),
    id: 'new_blog',
    type: 'modal',
    label: t2('new_blog_category'),
    floatRight: true,
    icon: 'plus',
  },
];

export default blog;
