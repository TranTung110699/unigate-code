import React from 'react';
import Icon from 'antd/lib/icon';
import { t1, t3 } from 'translate';

export default [
  {
    title: (
      <span>
        {t3('Syllabus')} <Icon style={{ fontSize: '10px' }} type="down" />
      </span>
    ),
    url: 'admin/cms',
    subMenu: [
      {
        title: t1('News'),
        url: 'admin/cms/news',
      },
      {
        title: t1('Categories'),
        url: 'admin/cms/category',
      },
    ],
  },
];
