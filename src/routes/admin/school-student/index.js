// import Admin from 'components/admin/';
import React from 'react';
import { getUrl } from 'routes/links/common';

import SchoolUserLayout from 'components/admin/user/user-in-school';

export default {
  componentId: 'SchoolUserLayout',
  path: getUrl('school/users'),
  component: SchoolUserLayout,
  exact: true,
};
