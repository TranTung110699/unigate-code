import React from 'react';
import SearchForm from './search/Layout';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/user_major/menu/MainstageTopMenu';
import { t1 } from 'translate';

const userMajor = () => {
  return (
    <div>
      <SubTopMenuContext
        schema={topMenuSchema}
        lastBreadcrumbName={t1('user_major')}
        description={t1('user_major_description')}
      />
      ,
      <SearchForm showExport sendSMS />
    </div>
  );
};

export default userMajor;
