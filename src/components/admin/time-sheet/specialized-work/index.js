import React from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from './menu/teacher-menus';
import Search from './search';
import { getSearchFormId } from './common';

const SpecializedWorkTimeSheetManagement = () => {
  const searchFormId = getSearchFormId();

  return (
    <React.Fragment>
      <SubTopMenuContext
        node={{
          searchFormId,
        }}
        schema={topMenuSchema({ searchFormId })}
      />
      <Search formid={searchFormId} />
    </React.Fragment>
  );
};

export default SpecializedWorkTimeSheetManagement;
