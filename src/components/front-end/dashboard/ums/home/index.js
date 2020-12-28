import React from 'react';
import { t1 } from 'translate';
import Schedule from 'components/timetable/views/index';
import './stylesheet.scss';
import Assignment from '../../assignments';
import Event from '../../ums/event';
// import Examination from '../../ums/examinations';
import examinationIcon from './resources/ic-examination.png';
import eventIcon from './resources/ic-event.png';
import scheduleIcon from './resources/ic-schedule.png';
import Survey from '../../survey/list';
import renderWidget from './Widget';

export const cssClass = 'ums-dashboard-home';

const widgets = [
  {
    key: 'event',
    icon: eventIcon,
    content: <Event />,
    title: t1('event'),
    className: 'event',
  },
  {
    key: 'schedule',
    icon: scheduleIcon,
    content: (
      <Schedule this_user_only={true} shortView={true} place={'frontend'} />
    ),
    title: t1('schedule'),
    className: 'event schedule',
  },
  {
    key: 'assignment',
    icon: eventIcon,
    content: <Assignment />,
    title: t1('assignment'),
    className: 'assignment',
  },
  // {
  //   key: 'examination',
  //   icon: examinationIcon,
  //   content: Examination,
  //   title: t1('examination'),
  //   className: 'examination',
  // },
  {
    key: 'suvey',
    icon: examinationIcon,
    content: <Survey />,
    title: t1('feedback'),
    className: 'feedback',
  },
];

const Layout = () => (
  <div className="ums-dashboard-home-wrapper">
    <div className={`${cssClass} flex-container-wrap row`}>
      {widgets.map((widget) => renderWidget(widget))}
    </div>
  </div>
);

export default Layout;
