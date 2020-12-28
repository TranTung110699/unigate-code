import React from 'react';
import { createSelector } from 'reselect';
import { getUrl } from 'routes/links/common';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';
import NewProvinceDistrictButton from '../pd/new/NewProvinceDistrictButton';
import NewSchoolButton from '../school/new/NewSchoolButton';

const pds = createSelector(
  (state, props) => props.step,
  (state) => getThemeConfig(state),
  (step, themeConfig) => {
    const menu = [
      {
        id: 'list_province_and_district',
        href: getUrl('search_provinces_or_districts'),
        label: `${t1('province')} ${t1('and')} ${t1('district')}`,
        icon: 'map',
      },
    ];

    if (get(themeConfig, 'type') === schoolTypes.SIS) {
      menu.push({
        id: 'list_school',
        href: getUrl('search_schools'),
        label: t1('school'),
        icon: 'building',
      });
    }

    if (step === 'province') {
      menu.push({
        component: <NewProvinceDistrictButton />,
        href: getUrl('search_provinces_or_districts'),
        id: 'new_province_district',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      });
    } else if (step === 'schoolviet') {
      menu.push({
        component: <NewSchoolButton />,
        href: getUrl('search_schools'),
        id: 'new_school',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      });
    }
    return menu;
  },
);

export default pds;
