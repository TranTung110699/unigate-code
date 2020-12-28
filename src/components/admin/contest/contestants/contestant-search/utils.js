import React from 'react';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import { t1 } from 'translate';

export const confirmDialogText = (item, title) => (
  <React.Fragment>
    {title}
    <div className="m-t-20">
      <li>
        {t1('code')}: <b>{item.code}</b>
      </li>
      <li>
        {t1('name')}: <b>{item.name}</b>
      </li>
      <li>
        {t1('mail')}: <b>{item.mail}</b>
      </li>
      {item.user_organizations && item.user_organizations.length ? (
        <li>
          {t1('organization')}:{' '}
          <OrganizationsOrPhongBan item={item} attr={'user_organizations'} />
        </li>
      ) : (
        '-'
      )}
    </div>
  </React.Fragment>
);
