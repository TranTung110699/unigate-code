import lodashGet from 'lodash.get';
import { createSelector } from 'reselect';
import { getPathname } from 'common/selectors/router';

const dashboardMenuConfigsSelector = (state) =>
  lodashGet(state, 'domainInfo.school.student_dashboard_menus');

const dashboardAction = (state) => {
  const pathname = getPathname(state);
  if (pathname) {
    const tmp = pathname.split('/');
    if (tmp.length === 3) return tmp[2];
  }

  return '';
};

export const leftMenuSelector = createSelector(
  dashboardMenuConfigsSelector,
  dashboardAction,
  (dashboardMenuConfigs, dashboardAction) => {
    return {
      dashboardMenuConfigs,
      dashboardAction,
    };
  },
);
