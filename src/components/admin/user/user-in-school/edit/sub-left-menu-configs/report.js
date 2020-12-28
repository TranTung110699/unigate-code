import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { layouts, schoolTypes } from 'configs/constants';
import getCourseMenus, {
  filterMenuByAvailableMenu,
} from 'components/front-end/dashboard/show-by-tab/left-menu/configs-v2';

const getMenuReport = ({ node, mode, conf, schoolType, layout }) => {
  const subMenu = [
    {
      id: 'report-attendance',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'report-attendance',
      }),
      title: t1('report_attendance'),
      icon: {
        position: 'left',
        type: 'safety',
      },
    },
    {
      id: 'report-feedback',
      url: getUrl('node_edit', {
        ...node,
        ntype: mode,
        step: 'feedback',
      }),
      title: t1('feedback'),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
    },
  ];

  return {
    id: 'report',
    title: t1('report'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
    subMenu,
  };
};

export default getMenuReport;
