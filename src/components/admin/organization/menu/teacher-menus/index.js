import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';
import { createSelector } from 'reselect';
import ButtonNew from '../../new/ButtonNew';

const department = createSelector(
  getCategoryStructureLevelNameSelector,
  (getCategoryStructureLevelName) => {
    const organizationLevelName = getCategoryStructureLevelName(
      'organization',
      0,
    );

    return [
      // {
      //   id: 'organization_name',
      //   href: getUrl('organization'),
      //   label: t1('search_%s', [t(organizationLevelName)]),
      // },
      {
        id: 'import_organization',
        href: getUrl('organization', { action: 'import' }),
        label: t1('import'),
      },
      {
        button: <ButtonNew />,
        href: getUrl('organization'),
        id: 'new_organization',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default department;
