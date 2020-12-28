import React from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { t1 } from 'translate';
import Form from './Form';
import { getUrl } from 'routes/links/common';
import Button from 'components/common/primary-button';
import { Link } from 'react-router-dom';

function Order() {
  return (
    <div>
      <SubTopMenuContext
        lastBreadcrumbName={t1('sales_order')}
        button={
          <Link to={getUrl('sales-order')}>
            <Button>{t1('list_order')}</Button>
          </Link>
        }
      />
      <Form />
    </div>
  );
}

export default Order;
