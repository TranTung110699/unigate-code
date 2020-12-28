import React from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { t1 } from 'translate';
import Search from './search';
import { Link } from 'react-router-dom';
import Button from 'components/common/primary-button';
import { getUrl } from 'routes/links/common';

function Order() {
  return (
    <div>
      <SubTopMenuContext
        lastBreadcrumbName={t1('sales_order')}
        button={
          <Link to={getUrl('sales-order/create')}>
            <Button icon="plus">{t1('create_order')}</Button>
          </Link>
        }
      />
      <Search />
    </div>
  );
}

export default Order;
