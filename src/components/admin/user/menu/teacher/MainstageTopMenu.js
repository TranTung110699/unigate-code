import React from 'react';
import AddByEmails from './AddByEmails';
import AddOneTeacher from './AddOneTeacher';
import MakeUsersTeacher from './MakeUsersTeacher';

const menuItems = () => [
  {
    component: <AddByEmails />,
    id: 'add_teacher',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
  {
    component: <AddOneTeacher />,
    id: 'add_teacher2',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
  {
    component: <MakeUsersTeacher />,
    id: 'add_teacher3',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menuItems;
