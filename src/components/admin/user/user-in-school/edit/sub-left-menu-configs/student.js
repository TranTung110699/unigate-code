import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { layouts, schoolTypes } from 'configs/constants';
import getMenuReport from './report';

const getStudentMenuItems = ({
  node,
  mode,
  schoolType,
  layout,
  domainInfo,
}) => {
  if (layout === layouts.UMS && schoolType === schoolTypes.SIS) {
    return [
      {
        id: 'student_manager',
        title: t1('student_manager'),
        open: true,
        subMenu: [
          {
            id: 'majors',
            url: getUrl('node_edit', { ...node, ntype: mode, step: 'majors' }),
            title: t1('majors'),
            icon: {
              position: 'left',
              type: 'radar-chart',
            },
          },
        ],
      },
    ];
  }

  // LMS
  let ret = [
    {
      id: 'learning-progress',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'learning-progress',
      }),
      title: t1('learning_progress'),
      icon: {
        position: 'left',
        type: 'play-circle',
      },
    },
    {
      id: 'contests',
      url: getUrl('node_edit', { ...node, ntype: mode, step: 'contests' }),
      title: t1('tests_and_exams'),
      icon: {
        position: 'left',
        type: 'check-square',
      },
    },
  ];

  return ret;

  // const adminAvailableMenus = lodashGet(
  //   domainInfo,
  //   'conf.student_available_admin_menus',
  // );
  //
  // return getCourseMenus(adminAvailableMenus, node, mode);
};

export default getStudentMenuItems;
