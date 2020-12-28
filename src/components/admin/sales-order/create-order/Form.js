import React from 'react';
import FormNewInvite from '../../invite/new/FormNewInvite';
import { t1 } from 'translate';
import { withRouter } from 'react-router';
import { getUrl } from 'routes/links/common';

function Form({ history }) {
  return (
    <div>
      <h2 className="text-white m-b-0">
        <b>{t1('create_order')}</b>
      </h2>
      <FormNewInvite
        alternativeApi={'/sales/order/create-batch'}
        mode="edit"
        searchFormId="sales_order_search"
        inviteSuccessFull={() => {
          history.push(getUrl('sales-order'));
        }}
        simpleMode
        showPackage
      />
    </div>
  );
}

export default withRouter(Form);
