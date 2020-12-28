import React from 'react';
import EditUserContainer from 'components/admin/user/user-in-school/edit';

export default {
  componentId: 'EditUserContainer',
  path: '/admin/:type(user|teacher|student|parent)/:iid:slash(|/*)',
  component: EditUserContainer,
};
