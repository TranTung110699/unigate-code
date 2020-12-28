import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { menuItems } from '../menu/sub-left-menu-configs';

import Search from './search';

const Layout = (props) => {
  const { mode } = props;

  const content = <Search />;

  if (mode === 'frontend') {
    return content;
  }

  return (
    <div>
      <SubLeftMenuContext schema={menuItems(props)} />
      <Card title={t2('organization_progress')}>{content}</Card>
    </div>
  );
};

export default Layout;
