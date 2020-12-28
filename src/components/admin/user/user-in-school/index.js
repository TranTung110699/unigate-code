import React from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchLayout from './Layout';
import { buttonNew } from '../menu/school/MainstageTopMenu';
import { t1 } from 'translate';

class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={buttonNew}
          lastBreadcrumbName={t1('users')}
          description={t1('users_description')}
        />
        <SearchLayout notShowCheckbox />
      </div>
    );
  }
}

export default Layout;
