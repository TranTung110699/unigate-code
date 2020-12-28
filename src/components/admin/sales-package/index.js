import React from 'react';
import Search from './search';
import SubTopMenuContext from '../../../common/context/menu/SubMenuTop';
import NewButton from './new/NewButton';
import { t1 } from 'translate';

function Package() {
  return (
    <div>
      <SubTopMenuContext
        button={<NewButton />}
        lastBreadcrumbName={t1('sales_package')}
      />
      <Search />
    </div>
  );
}

export default Package;
